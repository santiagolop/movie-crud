import { authService } from "@service/auth";
import { Request, Response, Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.signup(email, password);
  res.status(201).json({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.login(email, password);
  res.status(201).json({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });
});

authRouter.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refresh(refreshToken);
  res
    .status(201)
    .json({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });
});
