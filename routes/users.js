import express from 'express'
import userController from '../controllers/users.js'
import userMiddleware from "../middleware/registerUser.js";

const router = express.Router()
router.get("/users", userController.getAllUsers);
router.post("/register", userMiddleware.registerUser, userController.RegUser);

export default router

