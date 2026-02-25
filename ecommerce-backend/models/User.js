import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
 name:String,
 email:{type:String,unique:true},
 password:String,
 role:{type:String,default:"customer"},

 seller:{
  type:Boolean,
  default:false
 },
 storeName:String,
 storeDescription:String

},{timestamps:true})

export default mongoose.model("User",userSchema)