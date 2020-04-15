import * as mongoose from "mongoose";
import IUser from "../interfaces/IUser";

export interface ITestModel extends mongoose.Model<IUser> {
  // here we decalre statics

  findByUsername(username: string): Promise<IUser>;
}

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByUsername = async function (username: string) {
  const user: IUser = await this.findOne({
    username,
  });

  return user;
};

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);

export default userModel;
