import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Exercise } from "./exercise";
import { MongoBase } from "./mongo-base";
import { Equipment, BodyPart, Muscle } from "./types";

class WorkoutExercise {
  @prop()
  exercise!: Exercise;

  @prop()
  additionalInfo?: string;

  @prop()
  youtubeUrl?: string;

  @prop()
  sets!: number;

  @prop()
  reps!: number;
}

class Workout {
  @prop()
  exercises!: WorkoutExercise[];
}

@modelOptions({
  schemaOptions: { toObject: { virtuals: true }, toJSON: { virtuals: true } },
})
export class Routine extends MongoBase {
  @prop()
  title!: string;

  @prop()
  workouts!: Workout[];

  @prop()
  userId!: string;

  @prop()
  description!: string;

  @prop()
  duration!: string;

  @prop()
  exercisesQuantity!: string;

  @prop()
  equipment!: Equipment[];

  @prop()
  bodyPart!: BodyPart[];

  @prop()
  muscle!: Muscle[];
}

export const RoutineModel = getModelForClass(Routine);

export type RoutineData = Omit<Routine, keyof MongoBase>;
