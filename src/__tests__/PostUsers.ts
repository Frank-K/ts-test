import request from "supertest";
import app from "../app";
import db from "../db";
import userModel from "../models/User";

beforeAll(async () => {
  await db.connectDb();

  try {
    await userModel.insertMany([{ username: "frank123", password: "123" }]);
  } catch (e) {
    // Douplicate key error can be ignored.
  }
});

afterAll(async () => {
  await db.disconnectDb();
});

describe("Tests for the /users route", () => {
  test("Valid credentials", async () => {
    const res = await request(app).post("/users").send({
      username: "new_user",
      password: "new_password",
    });
    expect(res.statusCode).toEqual(201);
  });

  test("Existing username in the database", async () => {
    const res = await request(app).post("/users").send({
      username: "frank123",
      password: "new_password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Existing username with different case", async () => {
    const res = await request(app).post("/users").send({
      username: "FRANK123",
      password: "new_password",
    });
    expect(res.statusCode).toEqual(201);
  });

  test("Empty string username", async () => {
    const res = await request(app).post("/users").send({
      username: "",
      password: "new_password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Null username", async () => {
    const res = await request(app).post("/users").send({
      username: null,
      password: "new_password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Missing username", async () => {
    const res = await request(app).post("/users").send({
      password: "new_password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Empty string password", async () => {
    const res = await request(app).post("/users").send({
      username: "new_user",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Null password", async () => {
    const res = await request(app).post("/users").send({
      username: "new_user",
      password: null,
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Missing password", async () => {
    const res = await request(app).post("/users").send({
      username: "new_user",
    });
    expect(res.statusCode).toEqual(400);
  });
});
