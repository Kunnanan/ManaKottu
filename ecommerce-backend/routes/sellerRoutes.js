import express from "express"
import {
 becomeSeller,
 sellerProducts,
 sellerOrders,
 dashboardStats
} from "../controllers/sellerController.js"

import {protect} from "../middleware/auth.js"
import {sellerOnly} from "../middleware/sellerOnly.js"

const router = express.Router()

router.post("/register",protect,becomeSeller)

router.get("/products",protect,sellerOnly,sellerProducts)
router.get("/orders",protect,sellerOnly,sellerOrders)
router.get("/stats",protect,sellerOnly,dashboardStats)
export default router