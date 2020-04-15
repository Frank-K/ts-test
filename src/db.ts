import mongoose from "mongoose";

const connectDb = () => {
  return mongoose.connect(process.env.DB_URI, { poolSize: 10 });
};

export default connectDb;
