import { useState } from "react"
import API from "../api/api"
import toast from "react-hot-toast"
import "./auth.css"

export default function Register(){

 const [show,setShow]=useState(false)
 const [showConfirm,setShowConfirm]=useState(false)
 const [success,setSuccess]=useState(false)

 const [form,setForm]=useState({
  name:"",
  email:"",
  password:""
 })

 const [confirm,setConfirm]=useState("")


 /* PASSWORD STRENGTH */
 const score = ()=>{
  let s=0
  const p=form.password
  if(p.length>=6) s++
  if(/[A-Z]/.test(p)) s++
  if(/[0-9]/.test(p)) s++
  if(/[^A-Za-z0-9]/.test(p)) s++
  return s
 }

 const strength = score()

 const strengthColor=["#ff4d4f","#ff4d4f","#faad14","#52c41a","#237804"]
 const strengthText=["Weak","Weak","Medium","Strong","Very Strong"]


 /* VALIDATION */
 const isValid =
  form.name &&
  form.email &&
  form.password.length>=6 &&
  form.password.trim()===confirm.trim()



 /* REGISTER */
 const register = async e=>{
  e.preventDefault()

  if(!isValid)
   return toast.error("Fix form errors")

  try{
   await API.post("/auth/register",form)

   setSuccess(true)

   setTimeout(()=>{
    window.location.href="/login"
   },1800)

  }catch(err){
   toast.error(err.response?.data || "Registration failed")
  }
 }


 return(
  <div className="auth-page">

   <form className="auth-card" onSubmit={register}>

    <h2>Create Account</h2>
    <p className="subtitle">Join ManaKottu</p>


    {/* NAME */}
    <div className="float-group">
     <input
      placeholder=" "
      value={form.name}
      onChange={e=>setForm({...form,name:e.target.value})}
      required
     />
     <label>Name</label>
    </div>


    {/* EMAIL */}
    <div className="float-group">
     <input
      type="email"
      placeholder=" "
      value={form.email}
      onChange={e=>setForm({...form,email:e.target.value})}
      required
     />
     <label>Email</label>
    </div>


    {/* PASSWORD */}
    <div className="float-group password">

     <input
      type={show?"text":"password"}
      placeholder=" "
      value={form.password}
      onChange={e=>setForm({...form,password:e.target.value})}
      required
     />

     <label>Password</label>

     <span className="eye" onClick={()=>setShow(!show)}>
      {show?"🙈":"👁"}
     </span>

    </div>


    {/* STRENGTH BAR */}
    {form.password && (
     <div style={{marginBottom:15}}>

      <div style={{
       height:6,
       borderRadius:10,
       background:"#eee",
       overflow:"hidden"
      }}>
       <div style={{
        width:`${strength*25}%`,
        height:"100%",
        background:strengthColor[strength],
        transition:"0.3s"
       }}/>
      </div>

      <p style={{
       marginTop:5,
       fontSize:12,
       color:strengthColor[strength]
      }}>
       {strengthText[strength]}
      </p>

     </div>
    )}



    {/* CONFIRM PASSWORD */}
    <div className="float-group password">

     <input
      type={showConfirm?"text":"password"}
      placeholder=" "
      value={confirm}
      onChange={e=>setConfirm(e.target.value)}
      required
     />

     <label>Confirm Password</label>

     <span className="eye" onClick={()=>setShowConfirm(!showConfirm)}>
      {showConfirm?"🙈":"👁"}
     </span>

    </div>


    {/* MATCH STATUS */}
    {confirm && (
     <p style={{
      fontSize:12,
      marginBottom:10,
      color: form.password===confirm ? "#52c41a":"#ff4d4f"
     }}>
      {form.password===confirm ? "Passwords match ✓" : "Passwords do not match"}
     </p>
    )}



    <button
     className="auth-btn"
     disabled={!isValid}
     style={{
      opacity:isValid?1:0.5,
      cursor:isValid?"pointer":"not-allowed"
     }}
    >
     Register
    </button>

   </form>


   {/* SUCCESS FLOAT ANIMATION */}
   {success && (
    <div className="success-float">
     ✓ Account Created
    </div>
   )}

  </div>
 )
}