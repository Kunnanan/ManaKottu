import mongoose from "mongoose"

const schema = new mongoose.Schema({
 title:String,
 description:String,
 price:Number,
 stock:Number,
 image:String,
 seller:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }
},{timestamps:true})

export default mongoose.model("Product",schema)