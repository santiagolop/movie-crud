import { getModelForClass, prop } from "@typegoose/typegoose";
import { MongoBase } from "./mongo-base";

export class Actor extends MongoBase {
  @prop()
  name!: string;

  @prop()
  birthDate?: string;

  @prop()
  country?: string;

  @prop()
  height?: number;

  @prop()
  gender?: string;
}

export const ActorModel = getModelForClass(Actor);
export type ActorData = Omit<Actor, keyof MongoBase>;
