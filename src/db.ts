import mongoose from "mongoose";

export const connectDb = () => {
  let URI = null;

  if (process.env.TRAVIS === "true") {
    // Travis CI database for testing
    URI = "mongodb://localhost:27017/myapp";
  } else {
    URI = process.env.DB_URI;
  }

  return mongoose.connect(URI, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

export const disconnectDb = () => {
  return mongoose.disconnect();
};

export default { connectDb, disconnectDb };
