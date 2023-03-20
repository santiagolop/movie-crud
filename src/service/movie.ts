import { MovieData, MovieModel } from "@model/movie";

class MovieService {
  public async getMovies({
    title,
    genre,
    sortByRating = false,
  }: {
    title?: string;
    genre?: string;
    sortByRating?: boolean;
  }): Promise<MovieData[]> {
    const query = {
      ...(title ? { title: { $regex: title, $options: "i" } } : {}),
      ...(genre ? { genre: { $regex: genre, $options: "i" } } : {}),
    };

    if (sortByRating) {
      return MovieModel.find({ ...query })
        .sort({ rating: -1 })
        .lean();
    }

    const movies = await MovieModel.find({ ...query }).lean();
    return Promise.all(movies.map((movie) => this.mapMovie(movie)));
  }

  public async createMovie(movieData: MovieData): Promise<MovieData> {
    const movie = await MovieModel.create(movieData);

    return this.mapMovie(movie);
  }

  private async mapMovie(movie: MovieData): Promise<MovieData> {
    return {
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      year: movie.year,
      rating: movie.rating,
      minutes: movie.minutes,
      directorId: movie.directorId,
      actorsId: movie.actorsId,
    };
  }
}

export const movieService = new MovieService();
