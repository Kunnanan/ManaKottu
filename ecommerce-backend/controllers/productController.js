import Product from "../models/Product.js"
import Review from "../models/Review.js"

export const createProduct = async(req,res)=>{
 try{
  const product = await Product.create({
   ...req.body,
   seller:req.user.id
  })
  res.json(product)
 }catch(err){
  res.status(500).json(err.message)
 }
}

export const getProducts = async(req,res)=>{
 const products = await Product.find()
  .populate("seller","name email")

 res.json(products)
}

export const getSingle = async(req,res)=>{
 try{
  const product = await Product.findById(req.params.id)
   .populate("seller","name email")

  if(!product)
   return res.status(404).json("Product not found")

  const reviewsCount = await Review.countDocuments({
   product:product._id
  })

  const avgRating = await Review.aggregate([
   {$match:{product:product._id}},
   {$group:{_id:null,avg:{$avg:"$rating"}}}
  ])

  res.json({
   ...product.toObject(),
   reviewsCount,
   rating: avgRating[0]?.avg || 0
  })

 }catch(err){
  res.status(500).json(err.message)
 }
}

export const updateProduct = async(req,res)=>{
 const product = await Product.findById(req.params.id)

 if(!product)
  return res.status(404).json("Product not found")

 if(product.seller.toString()!==req.user.id)
  return res.status(403).json("Not your product")

 Object.assign(product,req.body)
 await product.save()

 res.json(product)
}

export const deleteProduct = async(req,res)=>{
 const product = await Product.findById(req.params.id)

 if(!product)
  return res.status(404).json("Product not found")

 if(product.seller.toString()!==req.user.id)
  return res.status(403).json("Not your product")

 await product.deleteOne()
 res.json("Deleted")
}