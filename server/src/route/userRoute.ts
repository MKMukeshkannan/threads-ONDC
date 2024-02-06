import express from "express";
import { suggestion } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.route("/voice").post(suggestion);

export default userRouter;
