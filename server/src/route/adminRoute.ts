import express from "express";
import multer from "multer"
import { uploadProduct } from "../controllers/admin.js";

const adminRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminRouter
  .route("/upload-product")
  .post( upload.fields([
    { name:'image',    maxCount:1 }, 
    { name:"texture" , maxCount:1 }
  ]), uploadProduct);

export default adminRouter;
