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

  @prop()
  firstName!: string;

  @prop()
  lastName!: string;

  @prop()
  role!: Role;

  @prop()
  avatarUrl?: string;

  @prop()
  bio?: string;

  @prop()
  location?: string;

  @prop()
  website?: string;

  @prop()
  facebook?: string;

  @prop()
  twitter?: string;

  @prop()
  instagram?: string;

  @prop()
  youtube?: string;

  @prop()
  tiktok?: string;

  @prop()
  savedRoutinesIds?: string[];
}

export const UserModel = getModelForClass(User);
export type UserData = Omit<User, keyof MongoBase>;
