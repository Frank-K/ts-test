import * as mongoose from "mongoose";
import IUser from "../interfaces/IUser";

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

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);

export default userModel;
