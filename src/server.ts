import app from "./app";
import db from "./db";

db.connectDb().then(() => {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`Listening on ${process.env.PORT}!`);
  });
});
