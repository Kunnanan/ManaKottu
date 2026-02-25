import Cart from "../models/Cart.js"

export const addToCart = async(req,res)=>{
 try{

  const {productId,qty}=req.body

  let cart = await Cart.findOne({user:req.user.id})

  if(!cart){
   cart = await Cart.create({
    user:req.user.id,
    items:[{product:productId,quantity:qty}]
   })
  }else{

   const item = cart.items.find(
    i=>i.product.toString()===productId
   )

   if(item){
    item.quantity+=qty
   }else{
    cart.items.push({product:productId,quantity:qty})
   }

   await cart.save()
  }

  res.json(cart)

 }catch(err){
  res.status(500).json(err.message)
 }
}

export const getCart = async(req,res)=>{
 const cart = await Cart.findOne({user:req.user.id})
 .populate("items.product")

 res.json(cart || {items:[]})
}

export const removeItem = async(req,res)=>{
 const {productId} = req.body

 const cart = await Cart.findOne({user:req.user.id})

 cart.items = cart.items.filter(
  i=>i.product.toString()!==productId
 )

 await cart.save()
 res.json(cart)
}

export const updateQty = async(req,res)=>{
 const {productId,quantity} = req.body

 const cart = await Cart.findOne({user:req.user.id})

 const item = cart.items.find(
  i=>i.product.toString()===productId
 )

 if(!item) return res.status(404).json("Item not in cart")

 item.quantity = quantity
 await cart.save()

 res.json(cart)
}