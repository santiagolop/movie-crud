import { getModelForClass, prop } from "@typegoose/typegoose";
import { MongoBase } from "./mongo-base";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export class User extends MongoBase {
  @prop()
  email!: string;

  @prop()
  password!: string;
}

export const UserModel = getModelForClass(User);
export type UserData = Omit<User, keyof MongoBase>;
