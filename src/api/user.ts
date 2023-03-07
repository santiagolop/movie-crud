import { userService } from "@service/user";
import { Request, Response, Router } from "express";
import { authenticate } from "./middlewares/auth";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/me", async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.userId);
  res.send(user);
});

userRouter.put("/update", async (req: Request, res: Response) => {
  const {
    bio,
    location,
    avatarUrl,
    facebook,
    tiktok,
    twitter,
    youtube,
    instagram,
    website,
  } = req.body;
  const token = await userService.updateUserById(req.userId, {
    bio,
    location,
    avatarUrl,
    facebook,
    tiktok,
    twitter,
    youtube,
    instagram,
    website,
  });
  res.status(201).json({ access_token: token });
});

userRouter.get("/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  const user = await userService.getUsersByName(name, req.userId);
  res.send(user);
});

userRouter.put("/save-routine", async (req, res) => {
  const { routineId } = req.body;
  const data = await userService.handleSaveRoutine(req.userId, routineId);
  res.send(data);
});
