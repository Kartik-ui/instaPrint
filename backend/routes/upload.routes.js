import express from "express";
import {
  getPrints,
  uploadFile,
  validateLink,
  verifySecureCode,
} from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { apiLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/upload", apiLimiter, upload.single("file"), uploadFile);
router.post("/validate-code", apiLimiter, verifySecureCode);
router.get("/validate-link/:uniqueLink", apiLimiter, validateLink);
router.get("/get-prints/:uniqueLink", apiLimiter, getPrints);
export default router;
