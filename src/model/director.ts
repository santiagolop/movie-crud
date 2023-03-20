import { getModelForClass, prop } from "@typegoose/typegoose";
import { MongoBase } from "./mongo-base";

export class Director extends MongoBase {
  @prop()
  name!: string;

  @prop()
  birthDate?: string;

  @prop()
  country?: string;

  @prop()
  description?: string;
}

export const DirectorModel = getModelForClass(Director);
export type DirectorData = Omit<Director, keyof MongoBase>;
