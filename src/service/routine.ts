import { RoutineData, RoutineModel } from "@model/routine";
import { Equipment, Muscle } from "@model/types";

class RoutineService {
  public async getUserRoutines(userId: string): Promise<RoutineData[]> {
    const routines = await RoutineModel.find({ userId });
    return routines.map((routine) => routine.toObject());
  }

  public async getRoutineById(id: string): Promise<RoutineData> {
    const routine = await RoutineModel.findOne({ _id: id });
    if (!routine) {
      throw new Error("Routine not found");
    }
    return routine.toObject();
  }

  public async createRoutine(data: RoutineData): Promise<RoutineData> {
    const routine = await RoutineModel.create(data);
    return routine.toObject();
  }

  public async searchRoutines({
    userId,
    title,
    equipment,
    muscles,
    workoutsQuantity,
    exercisesQuantity,
  }: {
    userId: string;
    title?: string;
    equipment?: Equipment[];
    muscles?: Muscle[];
    workoutsQuantity?: string;
    exercisesQuantity?: string;
  }): Promise<RoutineData[]> {
    const query = {
      userId: { $ne: userId },
      ...(title ? { $regex: title, $options: "i" } : {}),
      ...(equipment ? { equipment: { $in: equipment } } : {}),
      ...(muscles ? { muscles: { $in: muscles } } : {}),
      ...(workoutsQuantity ? { workouts: { $size: workoutsQuantity } } : {}),
      ...(exercisesQuantity ? { exercisesQuantity } : {}),
    };
    const routines = await RoutineModel.find({ ...query });
    return routines.map((routine) => routine.toObject());
  }
}

export const routineService = new RoutineService();
