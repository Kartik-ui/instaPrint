import express from "express";
import {
  uploadFile,
  verifySecureCode,
} from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/validate", verifySecureCode);
export default router;
