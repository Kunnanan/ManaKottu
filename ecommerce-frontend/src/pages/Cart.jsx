import { useEffect,useState } from "react"
import API from "../api/api"
import "./cart.css"
import toast from "react-hot-toast"

export default function Cart(){
useEffect(()=>{
 document.title = "Cart | ManaKottu"
},[])
 const [cart,setCart]=useState(null)
 const [loading,setLoading]=useState(true)

 /* LOAD CART */
 const loadCart=()=>{
  API.get("/cart")
   .then(res=>{
    setCart(res.data)
    setLoading(false)
   })
   .catch(()=>{
    toast.error("Failed to load cart")
    setLoading(false)
   })
 }

 useEffect(()=>{
  loadCart()
 },[])



 /* UPDATE QUANTITY */
 const updateQty=async(id,change)=>{
  try{
   await API.post("/cart",{
    productId:id,
    qty:change
   })

   loadCart()
  }catch{
   toast.error("Update failed")
  }
 }



 /* REMOVE ITEM */
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

  const items = cart.items.filter(i=>i.product).map(item=>({
   product:item.product._id,
   quantity:item.quantity
  }))

  const res = await API.post("/orders/create",{items})

  toast.success("Order created 🎉 Redirecting to payment...")

  const orderId = res.data._id

  setTimeout(()=>{
   window.location.href = `/orders/${orderId}`
  },1200)

 }catch(err){
  toast.error(err.response?.data || "Checkout failed")
 }
}

 /* LOADING */
 if(loading)
  return <h2 style={{textAlign:"center"}}>Loading cart...</h2>



 /* EMPTY */
 if(!cart || cart.items.length===0)
  return <h2 style={{textAlign:"center"}}>Your cart is empty 🛒</h2>



 /* TOTAL */
 const total = cart.items.filter(i=>i.product).reduce(
  (acc,i)=>acc+i.product.price*i.quantity,
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
      />



      {/* INFO */}
      <div className="cart-info">

       <h3>{item.product.title}</h3>
       <p className="price">₹{item.product.price}</p>



       {/* QTY */}
       <div className="qty">

        <button
         onClick={()=>updateQty(item.product._id,-1)}
        >
         −
        </button>

        <span>{item.quantity}</span>

        <button
         onClick={()=>updateQty(item.product._id,1)}
        >
         +
        </button>

       </div>

      </div>



      {/* RIGHT SIDE */}
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
 disabled={loading}
>
 {loading ? "Processing..." : "Proceed To Checkout"}
</button>
    

   </div>

  </div>
 )
}