import { UserData, UserModel } from "@model/user";

class UserService {
  public async getUserById(id: string) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject();
  }

  public async getUsersByName(name: string, userId: string) {
    const users = await UserModel.find({
      name: { $regex: name, $options: "i" },
      _id: { $ne: userId },
    });
    return users.map((user) => user.toObject());
  }

  public async updateUserById(userId: string, data: Partial<UserData>) {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject();
  }

  public async handleSaveRoutine(
    userId: string,
    routineId: string
  ): Promise<boolean> {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const savedRoutines = user.savedRoutinesIds?.includes(routineId)
      ? user.savedRoutinesIds.filter((id) => id !== routineId)
      : [...(user.savedRoutinesIds || []), routineId];

    await UserModel.updateOne(
      { _id: userId },
      {
        savedRoutinesIds: savedRoutines,
      }
    );

    return true;
  }
}

export const userService = new UserService();
