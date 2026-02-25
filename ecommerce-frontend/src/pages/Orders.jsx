import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/api"
import "./orders.css"

export default function Orders(){


useEffect(()=>{
 document.title = "My Orders | ManaKottu"
},[])
 const [orders,setOrders]=useState([])
 const [loading,setLoading]=useState(true)
 const nav = useNavigate()

 useEffect(()=>{
  API.get("/orders/mine")
   .then(res=>{
    setOrders(res.data)
    setLoading(false)
   })
   .catch(err=>{
    console.log(err)
    setLoading(false)
   })
 },[])

 if(loading) return <h2 className="center">Loading orders...</h2>

 if(orders.length===0)
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