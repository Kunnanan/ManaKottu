import razorpay from "../config/razorpay.js"
import Order from "../models/Order.js"
import crypto from "crypto"
import { sendEmail } from "../utils/sendEmail.js"



/* ===============================
   CREATE RAZORPAY ORDER
================================ */
export const createPayment = async (req, res) => {
 try {

  const order = await Order.findById(req.params.id)

  if (!order)
   return res.status(404).json("Order not found")

  if (order.user.toString() !== req.user.id)
   return res.status(403).json("Not allowed")

  if (order.status === "paid")
   return res.status(400).json("Order already paid")


  const options = {
   amount: order.total * 100,
   currency: "INR",
   receipt: order._id.toString()
  }

  const payment = await razorpay.orders.create(options)

  res.json(payment)

 } catch (err) {
  console.log("CREATE PAYMENT ERROR:", err)
  res.status(500).json(err.message)
 }
}



/* ===============================
   VERIFY PAYMENT
================================ */
export const verifyPayment = async (req, res) => {
 try {

  const {
   razorpay_order_id,
   razorpay_payment_id,
   razorpay_signature,
   orderId
  } = req.body


  /* ---------- signature verify ---------- */

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expected = crypto
   .createHmac("sha256", process.env.RAZORPAY_SECRET)
   .update(body)
   .digest("hex")

  if (expected !== razorpay_signature)
   return res.status(400).json("Invalid payment signature")



  /* ---------- order validation ---------- */

  const order = await Order.findById(orderId)

  if (!order)
   return res.status(404).json("Order not found")

  if (order.user.toString() !== req.user.id)
   return res.status(403).json("Not allowed")

  if (order.status === "paid")
   return res.status(400).json("Already paid")



  /* ---------- mark paid ---------- */

  order.status = "paid"
  await order.save()



  /* ---------- populate for email ---------- */

  await order.populate("items.product", "title price")
  await order.populate("user", "email name")



  /* ---------- email template ---------- */

  const htmlTemplate = `
<div style="font-family:Arial;background:#f6f6f6;padding:30px">

 <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">

  <div style="padding:20px;border-bottom:1px solid #eee">
   <h2 style="margin:0;color:#111">YourStore</h2>
  </div>

  <div style="padding:25px">

   <h2 style="color:#c45500;margin-top:0">
    Hello ${order.user.name || "Customer"},
   </h2>

   <p style="font-size:16px;color:#333">
    Thank you for shopping with us. We’ll notify you when your order ships.
   </p>

   <h3 style="color:#c45500">Order Details</h3>

   <p><b>Order ID:</b> ${order._id}</p>
   <p><b>Total:</b> ₹${order.total}</p>

   <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>

   <table width="100%" style="border-collapse:collapse">
    <thead>
     <tr style="background:#fafafa">
      <th align="left">Item</th>
      <th align="center">Qty</th>
      <th align="right">Price</th>
     </tr>
    </thead>

    <tbody>
     ${
       order.items.map(item => `
        <tr>
         <td>${item.product.title}</td>
         <td align="center">${item.quantity}</td>
         <td align="right">₹${item.product.price}</td>
        </tr>
       `).join("")
     }
    </tbody>
   </table>

   <div style="text-align:center;margin:30px 0">
    <a href="http://localhost:5173/orders/${order._id}"
       style="background:#ffd814;padding:14px 25px;text-decoration:none;color:#111;font-weight:bold;border-radius:6px;display:inline-block;">
        View Order
    </a>
   </div>

   <p style="color:#555">We hope to see you again soon.</p>

  </div>

  <div style="background:#111;color:#fff;text-align:center;padding:15px;font-size:12px">
   © ${new Date().getFullYear()} YourStore Inc.
  </div>

 </div>
</div>
`



  /* ---------- send email ---------- */

  await sendEmail(
   order.user.email,
   "Order Confirmation",
   htmlTemplate
  )



  res.json("Payment verified successfully")

 } catch (err) {
  console.log("VERIFY ERROR:", err)
  res.status(500).json(err.message)
 }
}