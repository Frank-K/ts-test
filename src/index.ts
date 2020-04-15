import express from "express";
import dotenv from "dotenv";
import * as loginController from "./controllers/LoginController";
import connectDb from "./db";

dotenv.config();
const port: number = 3000;
const app: express.Application = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("The sedulous hyena ate the antelope");
});

app.post("/users", loginController.createUser);
app.post("/users/exist", loginController.userExists);

connectDb().then(async () => {
  console.log("Connected to the database!");

  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`Listening on ${port}!`);
  });
});
