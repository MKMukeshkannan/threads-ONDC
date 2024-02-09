import express from "express";
import { suggestion } from "../controllers/user.js";
import {upload } from "../middleware/multer.js"
const userRouter = express.Router();

userRouter.route("/voice").post(upload.single('audio'), suggestion);

export default userRouter;
