import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
 const {name,email,password}=req.body

 const exists = await User.findOne({email})
 if(exists) return res.status(400).json("User exists")

 const hash = await bcrypt.hash(password,10)

 const user = await User.create({
  name,email,password:hash
 })

 res.json(user)
}

export const login = async(req,res)=>{
 const {email,password}=req.body

 const user = await User.findOne({email})
 if(!user) return res.status(404).json("No user")

 const ok = await bcrypt.compare(password,user.password)
 if(!ok) return res.status(400).json("Wrong password")

const token = jwt.sign(
 {id:user._id,role:user.role},
 process.env.JWT_SECRET,
 {expiresIn:"7d"}
)


 res.json({token,user})
}
