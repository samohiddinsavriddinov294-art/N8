import osFile from "../utils/file-system.js";
import { extname, join } from "path";
import fs from 'fs'

const createFile = (req, res) => {
  const { title } = req.body;
  const { file } = req.files;

  let filename = Date.now() + extname(file.name);
  const files = osFile.read("files");

  const newFile = {
    id: files.length ? files.at(-1).id + 1 : 1,
    title,
    file: filename,
    size: file.size / 1024,
    userId: req.user.id,
    created_at: new Date().toLocaleString(),
  };

  files.push(newFile);

  osFile.write("files", files);
  file.mv(join(process.cwd(), "src", "uploads", filename), (err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.status(201).json({
    tatus: 201,
    message: "File added",
  });
};

const getFiles = (req, res) => {
  const files = osFile.read("files");
  const users = osFile.read("users");

  const result = files.map((file) => {
    const user = users.find((user) => user.id == file.userId);

    if (!user) {
      return {
        ...file,
        user: null,
      };
    }

    return {
      ...file,
      user: {
        id: user.id,
        username: user.username,
        profile_img: user.profile_img,
      },
    };
  });

  return res.status(200).json({
    status: 200,
    data: result,
  });
};

const deleteFile = (req, res) => {
  const fileId = Number(req.params.id);
  const userId = req.user.id;

  const files = osFile.read("files");

  const file = files.find((file) => file.id == fileId);

  if (!file) {
    return res.status(404).json({
      status: 404,
      message: "File topilmadi",
    });
  }

  if (file.userId != userId) {
    return res.status(403).json({
      status: 403,
      message: "Bu fayl sizga tegishli emas",
    });
  }

  const updatedFiles = files.filter((file) => file.id != fileId);

  osFile.write("files", updatedFiles);

  fs.unlink(join(process.cwd(), "src", "uploads", file.file), (err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.status(200).json({
    status: 200,
    message: "File successfully deleted",
  });
};

export default {
  createFile,
  getFiles,
  deleteFile,
};
