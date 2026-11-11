import osfile from "../utils/file-system.js";
import { extname, join } from "path";
import argon from "argon2";
import JWT from "jsonwebtoken";
import { access } from "fs";

const register = async (req, res) => {
  const { username, password } = req.body;
  const { profile } = req.files;

  const filename = Date.now() + extname(profile.name);

  const users = osfile.read("users");
  let hashPass = await argon.hash(password);

  let existUser = users.find((user) => user.username == username);

  let allowFileType = ["jpg", "jpeg", "svg", "png"];

  if (allowFileType.includes(extname(profile.name))) {
    return res.status(415).json({
      status: 415,
      message: "Unsupported media type!",
    });
  }
  if (existUser) {
    return res.status(409).json({
      status: 409,
      message: "Please use another username",
    });
  }

  const newUser = {
    id: users.length ? users.at(-1).id + 1 : 1,
    username,
    password: hashPass,
    profile_img: filename,
  };

  users.push(newUser);

  osfile.write("users", users);

  profile.mv(join(process.cwd(), "src", "uploads", filename), (err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.status(201).json({
    status: 201,
    message: "User successfully register!",
    accessToken: JWT.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "45m" },
    ),
    refreshToken: JWT.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    ),
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const users = osfile.read("users");

  let existUSer = users.find((user) => user.username == username);

  if (!existUSer) {
    return res.status(404).json({
      status: 404,
      message: "Wrong password or username, try again!",
    });
  }

  if (!(await argon.verify(existUSer.password, password))) {
    return res.status(404).json({
      status: 404,
      message: "Wrong password or username, try again!",
    });
  }

  return res.status(201).json({
    status: 201,
    message: "User successfully login!",
    accessToken: JWT.sign(
      {
        id: existUSer.id,
        username: existUSer.username,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "45m" },
    ),
    refreshToken: JWT.sign(
      {
        id: existUSer.id,
        username: existUSer.username,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    ),
  });
};

const getUsers = (req, res) => {
  const users = osfile.read("users");

  const result = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      profile_img: user.profile_img,
    };
  });

  return res.status(200).json({
    status: 200,
    data: result,
  });
};

export default {
  register,
  login,
  getUsers
};
