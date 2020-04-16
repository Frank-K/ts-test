import mongoose from "mongoose";

export const connectDb = () => {
  return mongoose.connect(process.env.DB_URI, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnectDb = () => {
  return mongoose.disconnect();
};

export default { connectDb, disconnectDb };
