import { DirectorModel } from "@model/director";
import { Episode, TvShowModel } from "@model/tv-show";

class TvShowService {
  public async getEpisode({
    name,
    seasonNumber,
    episodeNumber,
  }: {
    name: string;
    seasonNumber: number;
    episodeNumber: number;
  }): Promise<Episode> {
    const tvShow = await TvShowModel.findOne({
      name: { $regex: name, $options: "i" },
    }).lean();

    const episode = tvShow?.seasons
      .find((season) => season.number === seasonNumber)
      ?.episodes.find((episode) => episode.number === episodeNumber);

    if (!episode) {
      throw new Error("Episode not found");
    }

    const director = await DirectorModel.findById(episode.directorId).lean();

    if (!director) {
      throw new Error("Director not found");
    }

    return {
      number: episode.number,
      title: episode.title,
      minutes: episode.minutes,
      description: episode.description,
      rating: episode.rating,
      releaseDate: episode.releaseDate,
      directorId: episode.directorId,
      director: { name: director.name },
    };
  }
}

export const tvShowService = new TvShowService();
