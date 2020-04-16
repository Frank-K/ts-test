import express from "express";
import dotenv from "dotenv";
import * as loginController from "./controllers/LoginController";

dotenv.config();
const app: express.Application = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("The sedulous hyena ate the antelope");
});

app.post("/users", loginController.createUser);
app.post("/users/exist", loginController.userExists);

export default app;
