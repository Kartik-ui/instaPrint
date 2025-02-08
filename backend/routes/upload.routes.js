import express from "express";
import {
  uploadFile,
  verifySecureCode,
} from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { apiLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/upload", apiLimiter, upload.single("file"), uploadFile);
router.post("/validate", apiLimiter, verifySecureCode);
export default router;
