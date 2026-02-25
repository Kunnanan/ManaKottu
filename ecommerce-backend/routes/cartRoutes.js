import express from "express"
import {
 getCart,
 addToCart,
 removeItem,
 updateQty
} from "../controllers/cartController.js"

import {protect} from "../middleware/auth.js"

const router = express.Router()

router.get("/",protect,getCart)
router.post("/",protect,addToCart)
router.post("/remove",protect,removeItem)
router.post("/update",protect,updateQty)
router.get("/test",(req,res)=>res.send("cart route works"))

export default router


