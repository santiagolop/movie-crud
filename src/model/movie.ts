import { getModelForClass, prop } from "@typegoose/typegoose";
import { ActorData } from "./actor";
import { DirectorData } from "./director";
import { MongoBase } from "./mongo-base";

export class Movie extends MongoBase {
  @prop()
  title!: string;

  @prop()
  description?: string;

  @prop()
  genre!: string;

  @prop()
  year!: number;

  @prop()
  directorId!: string;

  @prop()
  actorsId!: string[];

  @prop()
  director?: DirectorData;

  @prop()
  actors?: ActorData[];

  @prop()
  rating!: number;

  @prop()
  minutes!: number;
}

export const MovieModel = getModelForClass(Movie);
export type MovieData = Omit<Movie, keyof MongoBase>;
