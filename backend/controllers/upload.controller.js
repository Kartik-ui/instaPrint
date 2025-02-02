import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadFile = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) throw new ApiError(400, "No file uploaded");

  const result = await uploadOnCloudinary(file.path);

  const uniqueId = uuidv4();
  const secureCode = Math.floor(100000 + Math.random() * 900000);

  const fileData = {
    fileUrl: result.secure_url,
    code: secureCode,
    createdAt: new Date(),
    accessed: false,
  };

  await db.collection("printFiles").doc(uniqueId).set(fileData);

  return res
    .status(201)
    .json(new ApiResponse(201, fileData, "File uploaded successfully"));
});

const verifySecureCode = asyncHandler(async (req, res) => {
  const { uniqueId, secureCode } = req.body;

  const docRef = await db.collection("printFiles").doc(uniqueId);
  const doc = await docRef.get();

  if (!doc.exists) throw new ApiError(404, "Invalid link");

  const data = doc.data();

  if (data.code !== secureCode) throw new ApiError(400, "Invalid secure code");

  if (data.accessed)
    throw new ApiError(400, "Secure code has already been used");

  await docRef.update({ accessed: true });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Secure code verified successfully"));
});

export { uploadFile, verifySecureCode };
