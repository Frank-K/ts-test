import * as mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

export default IUser;
