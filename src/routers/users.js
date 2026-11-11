import express from "express";
import userController from "../controllers/users.js";

const router = express.Router();

router
  .post("/api/register", userController.register)
  .post("/api/login", userController.login)
  .get('/api/users', userController.getUsers)


export default router;
 