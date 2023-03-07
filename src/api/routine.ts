import { Equipment, Muscle } from "@model/types";
import { routineService } from "@service/routine";
import { Router } from "express";

export const routineRouter = Router();

routineRouter.post("/", async (req, res) => {
  const data = await routineService.createRoutine(req.body);
  res.send(data);
});

routineRouter.get("/", (req, res) => {
  const { title, equipment, muscles, workoutsQuantity, exercisesQuantity } =
    req.query;
  const data = routineService.searchRoutines({
    userId: req.userId,
    title: title as string,
    equipment: equipment as Equipment[],
    muscles: muscles as Muscle[],
    workoutsQuantity: workoutsQuantity as string,
    exercisesQuantity: exercisesQuantity as string,
  });
  res.send(data);
});

routineRouter.get("/user", (req, res) => {
  const data = routineService.getUserRoutines(req.userId);
  res.send(data);
});

routineRouter.get("/:id", async (req, res) => {
  const data = await routineService.getRoutineById(req.params.id);
  res.send(data);
});
