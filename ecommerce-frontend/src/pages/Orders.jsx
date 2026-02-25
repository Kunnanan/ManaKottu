import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/api"
import "./orders.css"
import toast from "react-hot-toast"

export default function Orders(){

 useEffect(()=>{
  document.title = "My Orders | ManaKottu"
 },[])

 const [orders,setOrders]=useState([])
 const [loading,setLoading]=useState(true)
 const nav = useNavigate()



 /* LOAD ORDERS */
 const loadOrders = async()=>{
  try{
   const res = await API.get("/orders/mine")
   setOrders(res.data || [])
  }catch(err){
   console.log(err)
   toast.error("Failed to load orders")
  }finally{
   setLoading(false)
  }
 }

 useEffect(()=>{
  loadOrders()
 },[])



 /* LOADING STATE */
 if(loading)
  return <h2 className="center">Loading orders...</h2>



 /* EMPTY STATE */
 if(!orders || orders.length===0)
  return <h2 className="center">No orders yet 🛒</h2>



 return(
  <div className="orders-page">

   <h2 className="orders-title">My Orders</h2>



   <div className="orders-container">

    {orders.map(order=>{

     const items = order.items || []

     const totalItems = items.reduce(
      (acc,i)=> acc + (i?.quantity || 0),
      0
     )

     return(
      <div
       key={order._id}
       className="order-card"
       onClick={()=>nav(`/orders/${order._id}`)}
      >

       {/* TOP */}
       <div className="order-top">

        <div>
         <h4>Order #{order?._id?.slice(-6) || "000000"}</h4>

         <p className={`status ${order?.status || "pending"}`}>
          {(order?.status || "pending").toUpperCase()}
         </p>
        </div>

        <div className="order-total">
         ₹{order?.total || 0}
        </div>

       </div>



       {/* IMAGES */}
       <div className="order-preview">

        {items.slice(0,3).map((item,i)=>(
         <img
          key={i}
          src={item?.product?.image || "/placeholder.png"}
          className="preview-img"
          alt="product"
         />
        ))}

        {items.length>3 && (
         <div className="more-items">
          +{items.length-3}
         </div>
        )}

       </div>



       {/* BOTTOM */}
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