import Cart from "../models/Cart.js"
import Order from "../models/Order.js"
import Product from "../models/Product.js"

export const checkout = async(req,res)=>{
 try{

  const cart = await Cart.findOne({user:req.user.id})

  if(!cart || cart.items.length===0)
   return res.status(400).json("Cart empty")

  let total = 0
  let orderItems = []

  for(const item of cart.items){

   const product = await Product.findById(item.product)

   if(!product)
    return res.status(404).json("Product missing")

   if(product.stock < item.quantity)
    return res.status(400).json(`${product.title} out of stock`)

   product.stock -= item.quantity
   await product.save()

   total += product.price * item.quantity

   orderItems.push({
    product:product._id,
    quantity:item.quantity,
    price:product.price
   })
  }

  const order = await Order.create({
   user:req.user.id,
   items:orderItems,
   total
  })

  cart.items = []
  await cart.save()

  res.json(order)

 }catch(err){
  res.status(500).json(err.message)
 }
}