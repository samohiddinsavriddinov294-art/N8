import express from "express";
import cors from "cors";
import fs from "fs";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));

app.get("/users", (req, res) => {
  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  let result = users.map((user) => {
    return {
      userId: user.userId,
      username: user.username,
      profileImg: user.profileImg,
    };
  });

  res.json({ status: 200, data: result });
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let file = req.files.file;

  console.log(username, password, file.name);

  let fileName = Date.now() + "-" + file.name;
  file.mv("./uploads/" + fileName);

  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  let newUser = {
    userId: users.length ? users.at(-1).userId + 1 : 1,
    username: username,
    password: password,
    profileImg: "http://localhost:4000/uploads/" + fileName,
  };
  users.push(newUser);

  fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 4));

  res.json({ status: 200 });
});

app.get("/files", (req, res) => {
  let files = fs.readFileSync("./db/files.json", "utf-8");
  files = JSON.parse(files);

  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  let result = files.map((file) => {
    let user = users.find((user) => user.userId == file.userId);

    return {
      ...file,
      user: {
        userId: user.userId,
        username: user.username,
        profileImg: user.profileImg,
      },
    };
  });

  res.json({ status: 200, data: result });
});

app.get("/files/user/:id", (req, res) => {
  let id = req.params.id;

  let files = fs.readFileSync("./db/files.json", "utf-8");
  files = JSON.parse(files);

  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  files = files.filter((file) => file.userId == id);

  let result = files.map((file) => {
    let user = users.find((user) => user.userId == file.userId);

    return {
      ...file,
      user: {
        userId: user.userId,
        username: user.username,
        profileImg: user.profileImg,
      },
    };
  });

  res.json({ status: 200, data: result });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  let user = users.find(
    (user) => user.username == username && user.password == password,
  );

  if (!user) {
    return res.json({ status: 400, message: "Username yoki parol xato" });
  }

  res.json({
    status: 200,
    data: { profileImg: user.profileImg },
    token: String(user.userId),
  });
});

app.delete("/files/:fileId/:userId", (req, res) => {
  let fileId = req.params.fileId;
  let userId = req.params.userId;

  let files = fs.readFileSync("./db/files.json", "utf-8");
  files = JSON.parse(files);

  let users = fs.readFileSync("./db/users.json", "utf-8");
  users = JSON.parse(users);

  let file = files.find((file) => file.fileId == fileId);
  let user = users.find((user) => user.userId == userId);

  if (!file) {
    return res.json({ status: 404, message: "File topilmadi" });
  }

  if (!user) {
    return res.json({ status: 404, message: "User topilmadi" });
  }

  if (file.userId != userId) {
    return res.json({ status: 403, message: "Bu fayl sizga tegishlie emas" });
  }

  files = files.filter((file) => file.fileId != fileId);

  fs.writeFileSync("./db/files.json", JSON.stringify(files, null, 4));

  res.json({ status: 200, message: "File succesfully deleted" });
});

app.listen(4000, () => {
  console.log("Server 4000 portda ishlayapti");
});
