import path from "path";
import fs from "fs";

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

const orders = (req, res) => {
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
}

const orderId = (req, res) => {
  const userId = Number(req.params.userId);

  const orders = db(ORDERS_PATH);

  const userOrders = orders.filter((order) => order.orderId === userId);

  res.json({ data: userOrders });
}

export default {
  orders,
  orderId
};
