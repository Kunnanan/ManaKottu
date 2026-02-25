import express from "express"
import {
 getMyOrders,
 getSingleOrder,
 cancelOrder,
 updateOrderStatus,
 createOrder
} from "../controllers/orderController.js"
import {getAllOrders} from "../controllers/orderController.js"

import {protect,authorize} from "../middleware/auth.js"

const router = express.Router()

router.get("/mine",protect,getMyOrders)
router.get("/all",protect,authorize("admin"),getAllOrders)
router.get("/:id",protect,getSingleOrder)
router.put("/cancel/:id",protect,cancelOrder)
router.post("/create",protect,createOrder)
router.put("/status/:id",protect,authorize("admin"),updateOrderStatus)

export default router