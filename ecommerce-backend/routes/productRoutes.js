import express from "express"
import {
 createProduct,
 getProducts,
 getSingle,
 updateProduct,
 deleteProduct
} from "../controllers/productController.js"

import {protect} from "../middleware/auth.js"

const router = express.Router()

router.get("/",getProducts)
router.get("/:id",getSingle)

router.post("/",protect,createProduct)
router.put("/:id",protect,updateProduct)
router.delete("/:id",protect,deleteProduct)

export default router