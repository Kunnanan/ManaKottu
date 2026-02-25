import { useEffect,useState } from "react"
import API from "../api/api"
import "./cart.css"
import toast from "react-hot-toast"

export default function Cart(){

 useEffect(()=>{
  document.title="Cart | ManaKottu"
 },[])

 const [cart,setCart]=useState({items:[]})
 const [loading,setLoading]=useState(true)

 /* LOAD CART */
 const loadCart=async()=>{
  try{
   const res=await API.get("/cart")

   const safeItems=(res.data?.items || []).filter(i=>i?.product)

   setCart({items:safeItems})
  }catch{
   toast.error("Failed to load cart")
   setCart({items:[]})
  }finally{
   setLoading(false)
  }
 }

 useEffect(()=>{
  loadCart()
 },[])

 /* UPDATE QTY */
 const updateQty=async(id,change)=>{
  try{
   await API.post("/cart/",{
    productId:id,
    quantity:change
   })
   loadCart()
  }catch{
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
 const checkout=async()=>{
  if(!cart.items.length)
   return toast.error("Cart empty")

  try{

   const items=cart.items.map(i=>({
    product:i.product._id,
    quantity:i.quantity
   }))

   const res=await API.post("/orders/create",{items})

   toast.success("Order created 🎉 Redirecting...")

   setTimeout(()=>{
    window.location.href=`/orders/${res.data._id}`
   },1200)

  }catch(err){
   toast.error(err.response?.data || "Checkout failed")
  }
 }

 /* LOADING */
 if(loading)
  return <h2 style={{textAlign:"center"}}>Loading cart...</h2>

 /* EMPTY */
 if(!cart.items.length)
  return <h2 style={{textAlign:"center"}}>Your cart is empty 🛒</h2>

 /* TOTAL */
 const total=cart.items.reduce(
  (acc,i)=>acc+(i.product?.price||0)*i.quantity,
  0
 )

 return(
  <div className="cart-page">

   <h2 className="cart-title">Shopping Cart</h2>

   <div className="cart-container">

    {cart.items.map(item=>(
     <div className="cart-card" key={item.product._id}>

      <img
       src={item.product.image || "https://via.placeholder.com/200"}
       className="cart-img"
      />

      <div className="cart-info">
       <h3>{item.product.title}</h3>
       <p className="price">₹{item.product.price}</p>

       <div className="qty">
{/* 
        <button
         onClick={()=>updateQty(item.product._id,-1)}
        >−</button>

        <span>{item.quantity}</span>

        <button
         onClick={()=>updateQty(item.product._id,1)}
        >+</button> */}

       </div>
      </div>

      <div className="cart-right">

       <p className="subtotal">
        ₹{(item.product.price||0)*item.quantity}
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