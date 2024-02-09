import express from "express";
import { uploadProduct } from "../controllers/admin.js";
import {upload} from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter
  .route("/upload-product")
  .post( upload.fields([
    { name:'image',    maxCount:1 }, 
    { name:"texture" , maxCount:1 }
  ]), uploadProduct);

export default adminRouter;
