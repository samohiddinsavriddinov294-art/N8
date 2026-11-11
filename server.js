import express from "express";
import fs from "fs";
import path from "path";
import { registerUser } from "./middleware/registerUser.js";
import {foundUserID} from "./middleware/registerUser.js"

const USERS_PATH = path.join(process.cwd(), "db", "users.json");
const ORDERS_PATH = path.join(process.cwd(), "db", "orders.json");
const FOODS_PATH = path.join(process.cwd(), "db", "foods.json");

function db(filePath, data) {
  if (data === undefined) {
    const text = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(text);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

const PORT = 7766;
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  const users = db(USERS_PATH);
  res.json({ data: users });
});

app.post("/register", registerUser, (req, res) => {
  const { username, telephone } = req.body;

  let users = db(USERS_PATH);
  let newUser = {
    userId: users.length ? users.at(-1).userId + 1 : 1,
    username: username,
    telephone: telephone,
  };
  users.push(newUser);
  db(USERS_PATH, users);

  res.json({ status: 200, message: "User successfully cretaed" });
});

app.post("/orders", (req, res) => {
  const { userId, foodId, count } = req.body;

  let users = db(USERS_PATH);
  let foods = db(FOODS_PATH);
  let orders = db(ORDERS_PATH);

  const user = users.find((user) => user.userId === userId);
  if (!user) {
    return res.status(404).json({ message: "Bunday mijoz yoki ovqat bizdan topilmadi" });
  }

  const food = foods.find((food) => food.foodId === foodId);
  if (!food) {
    return res.status(404).json({ message: "Ushbu mijoz yoki ovqat bizda mavjud emas" });
  }

  let newOrder = {
    orderId: orders.length ? orders.at(-1).orderId + 1 : 1,
    userId: userId,
    foods: food,
    count: count,
  };

  orders.push(newOrder);
  db(ORDERS_PATH, orders);

  res
    .status(201)
    .json({ message: "Order successfully created", data: newOrder });
});

app.get("/foods", (req, res) => {
  const foods = db(FOODS_PATH);
  res.json({ data: foods });
});

app.get("/orders/:userId",foundUserID, (req, res) => {
  const userId = Number(req.params.userId);

  const orders = db(ORDERS_PATH);

  const userOrders = orders.filter((order) => order.orderId === userId);

  res.json({ data: userOrders });
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
