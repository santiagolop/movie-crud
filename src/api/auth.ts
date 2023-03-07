import { authService } from "@service/auth";
import { Request, Response, Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const token = await authService.signup(name, email, password);
  res.status(201).json({ access_token: token });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  res.status(201).json({ access_token: token });
});
