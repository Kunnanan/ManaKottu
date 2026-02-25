import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api/api"
import "./order.css"
import toast from "react-hot-toast"

export default function OrderDetails() {
useEffect(()=>{
 document.title = "Order Details | ManaKottu"
},[])
 const { id } = useParams()
 const [order, setOrder] = useState(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  API.get(`/orders/${id}`)
   .then(res => {
    setOrder(res.data)
    setLoading(false)
   })
   .catch(err => {
    console.log(err)
    setLoading(false)
   })
 }, [id])


 if (loading) return <h2 className="center">Loading order...</h2>
 if (!order) return <h2 className="center">Order not found</h2>


 const cancelOrder = async () => {
  try {
   await API.put(`/orders/cancel/${order._id}`)
   toast.success("Order cancelled")

   const res = await API.get(`/orders/${order._id}`)
   setOrder(res.data)

  } catch (err) {
   toast.success(err.response?.data || "Cancel failed")
  }
 }


 const payNow = async()=>{

  const res = await API.post(`/payments/${order._id}`)

  const options = {
   key: import.meta.env.VITE_RAZORPAY_KEY,
   amount: res.data.amount,
   currency: res.data.currency,
   order_id: res.data.id,

   handler: async(response)=>{

    await API.post("/payments/verify",{
     razorpay_order_id: response.razorpay_order_id,
     razorpay_payment_id: response.razorpay_payment_id,
     razorpay_signature: response.razorpay_signature,
     orderId: order._id
    })

    window.location.href = `/payment-success/${order._id}`
   }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
 }


 return (
  <div className="order-page">

   <div className="order-card">

    <div className="order-header">

     <div>
      <h2>Order #{order._id.slice(-6)}</h2>
      <p className={`status ${order.status}`}>
       {order.status.toUpperCase()}
      </p>
     </div>

     <div className="order-total">
      ₹{order.total}
     </div>

    </div>


    <div className="order-items">

     {order.items.map(item => (
      <div key={item._id} className="order-item">

       <img
        src={item.product.image}
        className="order-img"
       />

       <div className="order-info">
        <h4>{item.product.title}</h4>
        <p>₹{item.product.price}</p>
        <p>Qty: {item.quantity}</p>
       </div>

       <div className="item-subtotal">
        ₹{item.product.price * item.quantity}
       </div>

      </div>
     ))}

    </div>


    {order.status === "pending" && (
     <div className="order-actions">
      <button onClick={cancelOrder} className="cancel-btn">
       Cancel Order
      </button>

      <button onClick={payNow} className="pay-btn">
       Pay Now
      </button>
     </div>
    )}

   </div>

  </div>
 )
}