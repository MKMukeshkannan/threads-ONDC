import express, { Request, Response } from "express";
import errorHandler from "./middleware/ErrorHandler.js";
import { corsOptions, PORT } from "./utils/config.js";
import cors from "cors";
import adminRouter from "./route/adminRoute.js";
import userRouter from "./route/userRoute.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
