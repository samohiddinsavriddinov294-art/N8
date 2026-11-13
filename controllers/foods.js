import path from "path";
import fs from "fs";


const USERS_PATH = path.join(process.cwd(), "db", "users.json");
const FOODS_PATH = path.join(process.cwd(), "db", "foods.json");

function db(filePath, data) {
  if (data === undefined) {
    const text = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(text);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

const foods = (req, res) => {
  const foods = db(FOODS_PATH);
  res.json({ data: foods });
}

export default {
  foods,
};