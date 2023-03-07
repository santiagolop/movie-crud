import { defaultClasses, pre, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@pre<MongoBase>("save", function (next) {
  this.set({ createdAt: new Date() });
  next();
})
@pre<MongoBase>(["updateOne", "findOneAndUpdate"], function (next) {
  this.set({ updatedAt: new Date() });
  next();
})
export class MongoBase
  extends defaultClasses.TimeStamps
  implements defaultClasses.Base
{
  _id!: Types.ObjectId;

  id!: string;

  @prop()
  deletedAt?: Date;
}
