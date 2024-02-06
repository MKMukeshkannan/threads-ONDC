import express from "express";
import multer from "multer";
import { uploadProduct } from "../controllers/admin.js";

const adminRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminRouter
  .route("/upload-product")
  .post(upload.single("image"), uploadProduct);

export default adminRouter;
