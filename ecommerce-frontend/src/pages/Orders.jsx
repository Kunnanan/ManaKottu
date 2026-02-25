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

 const loadOrders=async()=>{
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
  return <h2 style={{textAlign:"center",marginTop:60}}>Loading orders...</h2>

 if(!orders || orders.length===0)
  return <h2 style={{textAlign:"center",marginTop:60}}>No orders yet 📦</h2>

 return(
  <div className="orders-page">

   <h2 className="orders-title">My Orders</h2>

   <div className="orders-container">

    {orders.map(order=>(
     <div
      key={order._id}
      className="order-card"
      onClick={()=>nav(`/orders/${order._id}`)}
     >

      <div className="order-top">
       <span className={`status ${order.status}`}>
        {order.status}
       </span>
       <span className="order-id">
        #{order._id.slice(-6)}
       </span>
      </div>

      <div className="order-items">
       {order.items.slice(0,2).map(item=>(
        <div key={item._id} className="mini-item">
         <img src={item.product.image} />
         <div>
          <p>{item.product.title}</p>
          <small>Qty: {item.quantity}</small>
         </div>
        </div>
       ))}

       {order.items.length > 2 && (
        <p className="more-items">
         +{order.items.length-2} more items
        </p>
       )}
      </div>

      <div className="order-bottom">
       <b>Total: ₹{order.total}</b>
      </div>

     </div>
    ))}

   </div>

  </div>
 )
}