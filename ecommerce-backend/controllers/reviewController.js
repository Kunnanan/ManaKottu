import Review from "../models/Review.js"
import Product from "../models/Product.js"



/* ADD REVIEW */
export const addReview = async(req,res)=>{
 try{
  const {productId,rating,comment}=req.body

  const product = await Product.findById(productId)
  if(!product)
   return res.status(404).json("Product not found")

  const review = await Review.create({
   user:req.user.id,
   product:productId,
   rating:Number(rating),
   comment
  })

  const stats = await Review.aggregate([
   {$match:{product:product._id}},
   {$group:{_id:null,avg:{$avg:"$rating"}}}
  ])

  product.rating = stats[0].avg.toFixed(1)
  await product.save()

  res.json(review)

 }catch(err){
  if(err.code===11000)
   return res.status(400).json("Already reviewed")

  res.status(500).json(err.message)
 }

  
}



/* GET REVIEWS */
export const getReviews = async(req,res)=>{
 try{

  const reviews = await Review.find({
   product:req.params.id
  }).populate("user","name")

  res.json(reviews)

 }catch(err){
  res.status(500).json(err.message)
 }
}