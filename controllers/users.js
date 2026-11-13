import path from "path";
import fs from "fs";


const USERS_PATH = path.join(process.cwd(), "db", "users.json");
function db(filePath, data) {
  if (data === undefined) {
    const text = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(text);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

const getAllUsers = (req, res) => {
  const users = db(USERS_PATH);
  res.json({ data: users });
};

const RegUser = (req, res) => {
  const { username, telephone } = req.body;

  const users = db(USERS_PATH);

  let newUser = {
    userId: users.length ? users.at(-1).userId + 1 : 1,
    username: username,
    telephone: telephone,
  };

  users.push(newUser);
  db(USERS_PATH, users);

  res.status(201).json({
    status: 200,
    message: "User succesfully added",
  });
};

export default {
  getAllUsers,
  RegUser,
};
