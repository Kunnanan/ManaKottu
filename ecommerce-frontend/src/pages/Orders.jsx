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
useEffect(()=>{
const loadOrders = async()=>{
try{
const res = await API.get("/orders/mine")
setOrders(res.data || [])
}catch{
toast.error("Failed to load orders")
}finally{
setLoading(false)
}
}

loadOrders()
},[])

/* LOADING */
if(loading)
return <h2 className="center">Loading orders...</h2>

/* EMPTY */
if(!orders || orders.length===0)
return <h2 className="center">No orders yet 🛒</h2>

return(

 <div className="orders-page">  <h2 className="orders-title">My Orders</h2>  <div className="orders-container">{orders.map(order=>{

const safeItems = order?.items || []

const totalItems = safeItems.reduce(
 (acc,i)=>acc+(i?.quantity || 0),
 0
)

return(
 <div
  key={order?._id}
  className="order-card"
  onClick={()=>nav(`/orders/${order?._id}`)}
 >

  {/* TOP */}
  <div className="order-top">

   <div>
    <h4>Order #{order?._id?.slice(-6) || "------"}</h4>

    <p className={`status ${order?.status || "pending"}`}>
     {(order?.status || "pending").toUpperCase()}
    </p>
   </div>

   <div className="order-total">
    ₹{order?.total || 0}
   </div>

  </div>



  {/* PREVIEW IMAGES */}
  <div className="order-preview">

   {safeItems.slice(0,3).map((item,i)=>(
    <img
     key={i}
     src={item?.product?.image || "/placeholder.png"}
     className="preview-img"
     alt="product"
    />
   ))}

   {safeItems.length>3 && (
    <div className="more-items">
     +{safeItems.length-3}
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

  </div> </div>
)
}