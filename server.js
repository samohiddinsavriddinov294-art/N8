import express from "express";
import fs from "fs";
import path from "path";
import userRouter from "./routes/users.js";
import foodRouter from "./routes/foods.js";
import ordersRouter from "./routes/orders.js";


import orders from "./controllers/orders.js";

const PORT = 7766;
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(foodRouter);
app.use(ordersRouter);

app.listen(PORT, () => {
  console.log("Server is running...");
});
