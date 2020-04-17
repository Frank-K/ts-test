import request from "supertest";
import app from "../app";
import db from "../db";
import userModel from "../models/User";

beforeAll(async () => {
  await db.connectDb();

  try {
    await userModel.insertMany([
      {
        username: "testuser",
        password:
          "$2b$10$jMYfxnhUXZ2EDJdIXtkCdecXyMujroQgdGGFK6Cv5hPVT5jpqCPx.",
      },
    ]);
  } catch (e) {
    // Douplicate key error can be ignored.
  }
});

afterAll(async () => {
  await db.disconnectDb();
});

describe("Tests for the /users/login route", () => {
  test("Valid credentials", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "test123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res).toHaveProperty("token");
  });

  test("Invalid username", async () => {
    const res = await request(app).post("/users/login").send({
      username: "this is not a valid username",
      password: "test123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Invalid password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "this is not a valid password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Invalid username and password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "this is not a valid username",
      password: "this is not a valid password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Username with wrong case", async () => {
    const res = await request(app).post("/users/login").send({
      username: "TESTUSER",
      password: "test123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Password with wrong case", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "TEST123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Empty string username", async () => {
    const res = await request(app).post("/users/login").send({
      username: "",
      password: "test123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Null username", async () => {
    const res = await request(app).post("/users/login").send({
      username: null,
      password: "test123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Missing username", async () => {
    const res = await request(app).post("/users/login").send({
      password: "test123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Empty string password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Null password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: null,
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Missing password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
    });
    expect(res.statusCode).toEqual(400);
  });
});
