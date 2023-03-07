import { exerciseDBClient } from "@client/exercise-client";
import { ExerciseModel, ExerciseData, Exercise } from "@model/exercise";
import { Muscle, BodyPart } from "@model/types";
import { removeUndefinedValues } from "@utils/removeUndefinedValues";

class ExerciseService {
  public async populateExercises() {
    const exercises = await exerciseDBClient.getExercises();
    await ExerciseModel.deleteMany({});
    const mapped = exercises.map((e) => {
      return {
        name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
        bodyPart: e.bodyPart.charAt(0).toUpperCase() + e.bodyPart.slice(1),
        equipment: e.equipment.charAt(0).toUpperCase() + e.equipment.slice(1),
        muscle: e.target.charAt(0).toUpperCase() + e.target.slice(1),
        gifUrl: e.gifUrl,
      };
    });
    return ExerciseModel.insertMany(mapped);
  }

  public async getExerciseById(id: string): Promise<ExerciseData> {
    const exercise = await ExerciseModel.findOne({ _id: id });
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return exercise.toObject();
  }

  public async getExercises(query: {
    name?: string;
    muscle?: Muscle;
    bodyPart?: BodyPart;
  }): Promise<Exercise[]> {
    query = removeUndefinedValues(query);
    const params: Record<string, { $regex: string; $options: "i" }> = {};
    for (const [key, value] of Object.entries(query)) {
      params[key] = {
        $regex: value,
        $options: "i",
      };
    }
    const exercises = await ExerciseModel.find({ ...params });
    return exercises.map((exercise) => exercise.toObject());
  }
}

export const exerciseService = new ExerciseService();
