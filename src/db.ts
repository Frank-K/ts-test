import mongoose from "mongoose";

export const connectDb = () => {
  // Travis CI database for testing
  if (process.env.TRAVIS === "true") {
    return mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
    });
  }

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
