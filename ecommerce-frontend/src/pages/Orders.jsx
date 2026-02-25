import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/api"
import toast from "react-hot-toast"
import "./orders.css"

export default function Orders(){

 const [orders,setOrders]=useState([])
 const [loading,setLoading]=useState(true)
 const nav = useNavigate()

 useEffect(()=>{
  document.title="My Orders | ManaKottu"
  loadOrders()
 },[])

 const loadOrders = async()=>{
  try{
   const res = await API.get("/orders/mine")
   setOrders(res.data)
  }catch(err){
   toast.error(err.response?.data || "Failed to load orders")
  }finally{
   setLoading(false)
  }
 }

 if(loading)
  return <h2 className="center">Loading orders...</h2>

 if(!orders || orders.length===0)
  return <h2 className="center">No orders yet 🛒</h2>

 return(
  <div className="orders-page">

   <h2 className="orders-title">My Orders</h2>

   <div className="orders-container">

    {orders.map(order=>{

     const totalItems = order.items.reduce(
      (acc,i)=>acc+i.quantity,
      0
     )

     return(
      <div
       key={order._id}
       className="order-card"
       onClick={()=>nav(`/orders/${order._id}`)}
      >

       <div className="order-top">

        <div>
         <h4>Order #{order._id.slice(-6)}</h4>
         <p className={`status ${order.status}`}>
          {order.status.toUpperCase()}
         </p>
        </div>

        <div className="order-total">
         ₹{order.total}
        </div>

       </div>

       <div className="order-preview">

        {order.items.slice(0,3).map(item=>(
         <img
          key={item._id}
          src={item.product.image}
          className="preview-img"
          alt={item.product.title}
         />
        ))}

        {order.items.length>3 && (
         <div className="more-items">
          +{order.items.length-3}
         </div>
        )}

       </div>

       <div className="order-bottom">
        <p>{totalItems} items</p>
        <span className="view-link">View Details →</span>
       </div>

      </div>
     )
    })}

   </div>

  </div>
 )
}