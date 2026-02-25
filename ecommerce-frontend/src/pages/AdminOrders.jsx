import {useEffect,useState} from "react"
import API from "../api/api"

export default function AdminOrders(){

 const [orders,setOrders]=useState([])

 useEffect(()=>{
  loadOrders()
 },[])

 const loadOrders=()=>{
  API.get("/orders/all")
   .then(res=>setOrders(res.data))
   .catch(err=>console.log(err))
 }

 const updateStatus = async(id,status)=>{
  await API.put(`/orders/status/${id}`,{status})
  loadOrders()
 }

 return(
  <div style={{padding:20}}>
   <h2>Admin Orders</h2>

   {orders.map(order=>(
    <div key={order._id} style={{
     border:"1px solid black",
     marginBottom:20,
     padding:15
    }}>

     <p><b>User:</b> {order.user.email}</p>
     <p><b>Total:</b> ₹{order.total}</p>

     <select
      value={order.status}
      onChange={e=>updateStatus(order._id,e.target.value)}
     >
      <option>pending</option>
      <option>processing</option>
      <option>shipped</option>
      <option>delivered</option>
      <option>cancelled</option>
     </select>

     <h4>Items</h4>

     {order.items.map(item=>(
      <div key={item._id}>
       {item.product.title} — {item.quantity}
      </div>
     ))}

    </div>
   ))}
  </div>
 )
}