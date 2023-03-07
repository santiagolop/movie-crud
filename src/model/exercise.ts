import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { MongoBase } from "./mongo-base";
import { BodyPart, Equipment, Muscle } from "./types";

@modelOptions({
  schemaOptions: { toObject: { virtuals: true }, toJSON: { virtuals: true } },
})
export class Exercise extends MongoBase {
  @prop()
  name!: string;

  @prop()
  bodyPart!: BodyPart;

  @prop()
  equipment!: Equipment;

  @prop()
  gifUrl!: string;

  @prop()
  muscle!: Muscle;
}

export const ExerciseModel = getModelForClass(Exercise);

export type ExerciseData = Omit<Exercise, keyof MongoBase>;
