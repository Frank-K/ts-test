import request from "supertest";
import app from "../app";
import db from "../db";
import userModel from "../models/User";

beforeAll(async () => {
  await db.connectDb();

  try {
    await userModel.insertMany([{ username: "frank12333", password: "123" }]);
  } catch (e) {
    // Douplicate key error can be ignored.
  }
});

afterAll(async () => {
  await db.disconnectDb();
});

test("User in the database", async () => {
  const res = await request(app).post("/users/exist").send({
    username: "frank12333",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("exists");
  expect(res.body.exists).toBeTruthy();
});

test("User NOT in the database", async () => {
  const res = await request(app).post("/users/exist").send({
    username: "this user doesn't exist",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("exists");
  expect(res.body.exists).toBeFalsy();
});

test("Missing username in request body", async () => {
  const res = await request(app).post("/users/exist").send({});
  expect(res.statusCode).toEqual(400);
});

test("Username in request body is empty", async () => {
  const res = await request(app).post("/users/exist").send({
    username: "",
  });
  expect(res.statusCode).toEqual(400);
});

test("Username in request body is null", async () => {
  const res = await request(app).post("/users/exist").send({
    username: null,
  });
  expect(res.statusCode).toEqual(400);
});
