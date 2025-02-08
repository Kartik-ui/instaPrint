import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/apiError.js";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5,
  handler: () => {
    throw new ApiError(
      429,
      "Too many requests from this IP, please try again in 15 minutes."
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});
