import Order from "../models/Order.js"
import Product from "../models/Product.js"

export const createOrder = async(req,res)=>{
 try{
  const items = req.body.items

  let total = 0

  for(const item of items){
   const product = await Product.findById(item.product)

   if(!product)
    return res.status(404).json("Product not found")

   if(product.stock < item.quantity)
    return res.status(400).json("Out of stock")

   total += product.price * item.quantity

   product.stock -= item.quantity
   await product.save()
  }

  const order = await Order.create({
   user:req.user.id,
   items,
   total
  })

  res.json(order)

 }catch(err){
  res.status(500).json(err.message)
 }
}

export const myOrders = async(req,res)=>{
 const orders = await Order.find({user:req.user.id})
 .populate("items.product","title price")

 res.json(orders)
}

export const updateStatus = async(req,res)=>{
 const order = await Order.findById(req.params.id)

 order.status = req.body.status
 await order.save()

 res.json(order)
}
export const getMyOrders = async(req,res)=>{
 const orders = await Order.find({user:req.user.id})
 .populate("items.product","title price image")

 res.json(orders)
}

export const getSingleOrder = async(req,res)=>{
 const order = await Order.findById(req.params.id)
 .populate("items.product","title price image")

 if(!order) return res.status(404).json("Order not found")

 if(order.user.toString()!==req.user.id)
  return res.status(403).json("Not allowed")

 res.json(order)
}

export const cancelOrder = async(req,res)=>{
 const order = await Order.findById(req.params.id)

 if(!order) return res.status(404).json("Order not found")

 if(order.user.toString()!==req.user.id)
  return res.status(403).json("Not allowed")

 if(order.status!=="pending")
  return res.status(400).json("Cannot cancel now")

 order.status="cancelled"
 await order.save()

 res.json("Order cancelled")
}

export const updateOrderStatus = async(req,res)=>{
 const order = await Order.findById(req.params.id)

 if(!order) return res.status(404).json("Order not found")

 order.status=req.body.status
 await order.save()

 res.json(order)
}
export const getAllOrders = async(req,res)=>{
 const orders = await Order.find()
  .populate("user","email")
  .populate("items.product","title price")

 res.json(orders)
}