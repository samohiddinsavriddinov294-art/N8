import express from "express";
import orderController from "../controllers/orders.js";
import orderMiddleware from "../middleware/registerUser.js";

const router = express.Router();

router.post("/orders", orderController.orders);
router.get(
  "/orders/:userId",
  orderMiddleware.foundUserID,
  orderController.orderId,
);

export default router;
