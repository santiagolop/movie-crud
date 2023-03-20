import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { authRouter } from "./auth";
import { connectToMongo } from "@utils/mongoose";
import { movieRouter } from "./movie";
import { tvShowRouter } from "./tv-show";

const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectToMongo();

app.use("/auth", authRouter);

app.use("/movie", movieRouter);

app.use("/tv-show", tvShowRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
