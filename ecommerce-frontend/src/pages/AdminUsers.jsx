import {useEffect,useState} from "react"
import API from "../api/api"

export default function AdminUsers(){

 const [users,setUsers]=useState([])

 useEffect(()=>{
  loadUsers()
 },[])

 const loadUsers=()=>{
  API.get("/admin/users")
   .then(res=>setUsers(res.data))
 }

 const changeRole = async(id,role)=>{
  await API.put(`/admin/users/${id}`,{role})
  loadUsers()
 }

 const deleteUser = async(id)=>{
  if(!window.confirm("Delete user?")) return

  await API.delete(`/admin/users/${id}`)
  loadUsers()
 }

 return(
  <div style={{padding:20}}>
   <h2>Manage Users</h2>

   {users.map(u=>(
    <div key={u._id} style={{
     border:"1px solid black",
     padding:15,
     marginBottom:15
    }}>

     <p><b>{u.email}</b></p>
     <p>Role: {u.role}</p>

     <select
      value={u.role}
      onChange={e=>changeRole(u._id,e.target.value)}
     >
      <option>customer</option>
      <option>seller</option>
      <option>admin</option>
     </select>

     <br/><br/>

     <button onClick={()=>deleteUser(u._id)}>
      Delete User
     </button>

    </div>
   ))}
  </div>
 )
}