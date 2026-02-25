import express from "express"
import { createPayment, verifyPayment } from "../controllers/paymentController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/verify", protect, verifyPayment)
router.post("/:id", protect, createPayment)

export default router