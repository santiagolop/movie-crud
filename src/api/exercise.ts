import { BodyPart, Muscle } from "@model/types";
import { exerciseService } from "@service/exercise";
import { Request, Response, Router } from "express";
import { authenticate } from "./middlewares/auth";

export const exerciseRouter = Router();

// exerciseRouter.use(authenticate);

exerciseRouter.get("/", async (req: Request, res: Response) => {
  const { name, muscle, bodyPart } = req.query;
  const data = await exerciseService.getExercises({
    name: name as string,
    muscle: muscle as Muscle,
    bodyPart: bodyPart as BodyPart,
  });
  res.send(data);
});
