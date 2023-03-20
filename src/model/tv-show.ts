import { getModelForClass, prop } from "@typegoose/typegoose";
import { ActorData } from "./actor";
import { DirectorData } from "./director";
import { MongoBase } from "./mongo-base";

export class Episode {
  @prop()
  number!: number;

  @prop()
  title!: string;

  @prop()
  minutes!: number;

  @prop()
  description!: string;

  @prop()
  rating!: number;

  @prop()
  releaseDate!: Date;

  @prop()
  directorId!: string;

  @prop()
  director?: DirectorData;
}

class Season {
  @prop()
  number!: number;

  @prop()
  episodes!: Episode[];
}

export class TvShow extends MongoBase {
  @prop()
  name!: string;

  @prop()
  description?: string;

  @prop()
  genre!: string;

  @prop()
  year!: number;

  @prop()
  actorsId!: string[];

  @prop()
  actors?: ActorData[];

  @prop()
  rating!: number;

  @prop()
  seasons!: Season[];
}

export const TvShowModel = getModelForClass(TvShow);
export type TvShowData = Omit<TvShow, keyof MongoBase>;
