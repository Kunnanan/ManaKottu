import User from "../models/User.js"
import Product from "../models/Product.js"
import Order from "../models/Order.js"

export const becomeSeller = async (req,res)=>{
 const user = await User.findById(req.user.id)

 if(!user) return res.status(404).json("User not found")

 user.seller = true
 user.storeName = req.body.storeName
 user.storeDescription = req.body.storeDescription

 await user.save()

 res.json(user)
}
export const sellerProducts = async(req,res)=>{
 const products = await Product.find({seller:req.user.id})
 res.json(products)
}

export const sellerOrders = async(req,res)=>{
 const orders = await Order.find({
  "items.product":{
   $in: await Product.find({seller:req.user.id}).distinct("_id")
  }
 })

 res.json(orders)
}

export const dashboardStats = async(req,res)=>{
 const products = await Product.countDocuments({seller:req.user.id})

 const orders = await Order.find({
  "items.product":{
   $in: await Product.find({seller:req.user.id}).distinct("_id")
  }
 })

 let revenue=0
 orders.forEach(o=>revenue+=o.total)

 res.json({
  products,
  orders:orders.length,
  revenue
 })
}