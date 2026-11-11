import express from "express";
import fileController from "../controllers/files.js";
import {checkToken} from "../middleware/check-token.js";

const router = express.Router();

router.post("/api/files", checkToken, fileController.createFile);
router.get("/api/videos", fileController.getFiles);
router.delete("/api/files/:id", checkToken, fileController.deleteFile);

export default router;
