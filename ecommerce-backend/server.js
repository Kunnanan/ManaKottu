
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cartRoutes from "./routes/cartRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import sellerRoutes from "./routes/sellerRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import mongoose from "mongoose"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err))

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/seller",sellerRoutes)
app.use("/api/admin",adminRoutes)


app.get("/",(req,res)=>{
 res.send("API running")
})

app.listen(process.env.PORT,()=>{
 console.log("Server running")
})
