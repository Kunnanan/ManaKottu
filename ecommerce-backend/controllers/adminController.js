import User from "../models/User.js"
import Order from "../models/Order.js"
import Product from "../models/Product.js"

export const getDashboardStats = async(req,res)=>{
 try{

  const users = await User.countDocuments()
  const products = await Product.countDocuments()
  const orders = await Order.countDocuments()

  const pending = await Order.countDocuments({status:"pending"})
  const delivered = await Order.countDocuments({status:"delivered"})

  const revenueData = await Order.aggregate([
   {$match:{status:"paid"}},
   {$group:{_id:null,total:{$sum:"$total"}}}
  ])

  const revenue = revenueData[0]?.total || 0

  res.json({
   users,
   products,
   orders,
   pending,
   delivered,
   revenue
  })

 }catch(err){
  res.status(500).json(err.message)
 }
}



export const getAllUsers = async(req,res)=>{
 const users = await User.find().select("-password")
 res.json(users)
}

export const updateUserRole = async(req,res)=>{
 const user = await User.findById(req.params.id)

 if(!user) return res.status(404).json("User not found")

 user.role = req.body.role
 await user.save()

 res.json(user)
}

export const deleteUser = async(req,res)=>{
 const user = await User.findById(req.params.id)

 if(!user) return res.status(404).json("User not found")

 await user.deleteOne()

 res.json("User deleted")
}