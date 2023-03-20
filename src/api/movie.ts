import { movieService } from "@service/movie";
import { Request, Response, Router } from "express";
import { authenticate } from "./middlewares/auth";

export const movieRouter = Router();

interface MovieQuery {
  title?: string;
  sortByRating?: boolean;
  genre?: string;
}

movieRouter.use(authenticate);

movieRouter.get("/", async (req: Request, res: Response) => {
  const { title, sortByRating, genre }: MovieQuery = req.query;
  const movies = await movieService.getMovies({ title, sortByRating, genre });
  res.status(201).json({ data: movies });
});

movieRouter.post("/", async (req: Request, res: Response) => {
  const movie = await movieService.createMovie(req.body);
  res.status(201).json({ data: movie });
});
