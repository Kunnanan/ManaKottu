import express from "express"
import {getDashboardStats} from "../controllers/adminController.js"
import {protect,authorize} from "../middleware/auth.js"
import {getAllUsers,updateUserRole,deleteUser} from "../controllers/adminController.js"

const router = express.Router()

router.get("/stats",protect,authorize("admin"),getDashboardStats)
router.get("/users",protect,authorize("admin"),getAllUsers)
router.put("/users/:id",protect,authorize("admin"),updateUserRole)
router.delete("/users/:id",protect,authorize("admin"),deleteUser)

export default router