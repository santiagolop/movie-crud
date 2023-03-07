import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { exerciseRouter } from "./exercise";
import { routineRouter } from "./routine";
import { authRouter } from "./auth";
import { connectToMongo } from "@utils/mongoose";
import { userRouter } from "./user";

const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectToMongo();

app.use("/auth", authRouter);

app.use("/exercise", exerciseRouter);

app.use("/routine", routineRouter);

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT} 🚀`);
});
