import { useEffect,useState } from "react"
import API from "../api/api"
import "./cart.css"
import toast from "react-hot-toast"

export default function Cart(){

 const [cart,setCart]=useState(null)
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  document.title="Cart | ManaKottu"
  loadCart()
 },[])

 /* LOAD CART */
 const loadCart=async()=>{
  try{
   const res = await API.get("/cart")
   setCart(res.data)
  }catch(err){
   toast.error("Failed to load cart")
  }finally{
   setLoading(false)
  }
 }

 /* UPDATE QTY */
 const updateQty=async(id,change)=>{
  try{

   const item = cart.items.find(i=>i.product._id===id)
   if(!item) return

   const newQty = item.quantity + change

   if(newQty <= 0){
    return removeItem(id)
   }

   await API.post("/cart/update",{
    productId:id,
    quantity:newQty
   })

   loadCart()

  }catch(err){
   toast.error("Update failed")
  }
 }

 /* REMOVE */
 const removeItem=async(id)=>{
  try{
   await API.post("/cart/remove",{productId:id})
   toast.success("Item removed")
   loadCart()
  }catch{
   toast.error("Remove failed")
  }
 }

 /* CHECKOUT */
 const checkout = async()=>{
  if(!cart || cart.items.length===0)
   return toast.error("Cart empty")

  try{

   const items = cart.items.map(i=>({
    product:i.product._id,
    quantity:i.quantity
   }))

   const res = await API.post("/orders/create",{items})

   const orderId = res.data._id

   toast.success("Order created 🎉 Redirecting...")

   setTimeout(()=>{
    window.location.href=`/orders/${orderId}`
   },1200)

  }catch(err){
   toast.error(err.response?.data || "Checkout failed")
  }
 }

 /* LOADING */
 if(loading)
  return <h2 style={{textAlign:"center",marginTop:50}}>Loading cart...</h2>

 /* EMPTY */
 if(!cart || cart.items.length===0)
  return <h2 style={{textAlign:"center",marginTop:50}}>Your cart is empty 🛒</h2>

 /* TOTAL */
 const total = cart.items.reduce(
  (sum,i)=> sum + i.product.price*i.quantity,
  0
 )

 return(
  <div className="cart-page">

   <h2 className="cart-title">Shopping Cart</h2>

   <div className="cart-container">

    {cart.items.map(item=>(
     <div className="cart-card" key={item._id}>

      {/* IMAGE */}
      <img
       src={item.product.image}
       className="cart-img"
       alt={item.product.title}
      />

      {/* INFO */}
      <div className="cart-info">
       <h3>{item.product.title}</h3>
       <p className="price">₹{item.product.price}</p>

       <div className="qty">
        <button onClick={()=>updateQty(item.product._id,-1)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={()=>updateQty(item.product._id,1)}>+</button>
       </div>
      </div>

      {/* RIGHT */}
      <div className="cart-right">

       <p className="subtotal">
        ₹{item.product.price * item.quantity}
       </p>

       <button
        className="remove-btn"
        onClick={()=>removeItem(item.product._id)}
       >
        Remove
       </button>

      </div>

     </div>
    ))}

   </div>

   {/* SUMMARY */}
   <div className="cart-summary">

    <h3>Total: ₹{total}</h3>

    <button
     onClick={checkout}
     className="checkout-btn"
    >
     Proceed To Checkout
    </button>

   </div>

  </div>
 )
}