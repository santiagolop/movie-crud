import { tvShowService } from "@service/tv-show";
import { Request, Response, Router } from "express";
import { authenticate } from "./middlewares/auth";

export const tvShowRouter = Router();

interface TvShowQuery {
  name?: string;
  seasonNumber?: string;
  episodeNumber?: string;
}

tvShowRouter.use(authenticate);

tvShowRouter.get("/episode", async (req: Request, res: Response) => {
  const { name, seasonNumber, episodeNumber }: TvShowQuery = req.query;

  if (!name || !seasonNumber || !episodeNumber) {
    return res.status(400).json({ message: "Missing required query params" });
  }

  const episode = await tvShowService.getEpisode({
    name,
    seasonNumber: Number(seasonNumber),
    episodeNumber: Number(episodeNumber),
  });

  res.status(201).json({ data: episode });
});
