import { useState } from "react"
import API from "../api/api"
import "./login.css"
import toast from "react-hot-toast"

export default function Login(){

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [show,setShow]=useState(false)

 const submit = async e =>{
 e.preventDefault()

 try{
  const res = await API.post("/auth/login",{email,password})

  localStorage.setItem("token",res.data.token)
  localStorage.setItem("user", JSON.stringify(res.data.user))

  toast.success("Login successful 🎉")

  setTimeout(()=>{
   window.location.href="/"
  },1200)

 }catch(err){
  toast.error(err.response?.data || "Invalid credentials")
 }
}

 return(
  <div className="login-page">

   <form className="login-card" onSubmit={submit}>

    <h2>Welcome Back</h2>
    <p className="subtitle">Login to your account</p>

    {/* EMAIL */}
    <div className="float-group">
 <input
  type="email"
  required
  value={email}
  onChange={e=>setEmail(e.target.value)}
 />
 <label>Email Address</label>
</div>

<div className="float-group password">

 <input
  type={show ? "text":"password"}
  required
  value={password}
  onChange={e=>setPassword(e.target.value)}
 />

 <label>Password</label>

 <span className="eye" onClick={()=>setShow(!show)}>
  {show ? "🙈":"👁"}
 </span>

</div>

    

    <button className="login-btn">Login</button>

    <p className="signup">
     Don't have account? <a href="/register">Register</a>
    </p>

   </form>

  </div>
 )
}