import express from "express";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import userModel from "../models/User";

// Return true if user is a valid UserInformation interface
const validateUser = (user: IUser) => {
  if (
    user.password === undefined ||
    user.password == null ||
    user.password.length === 0
  ) {
    return false;
  }

  if (
    user.username === undefined ||
    user.username == null ||
    user.username.length === 0
  ) {
    return false;
  }

  return true;
};

export const userExists = async (
  req: express.Request,
  res: express.Response
) => {
  const username: string = req.body.username;

  if (username === undefined || username === null || username.length === 0) {
    return res.status(400).json({ message: "Invalid username." }).send();
  }

  try {
    // Check if user already exists
    const existingUser: IUser = await userModel.findOne({
      username,
    });

    if (existingUser === null) {
      return res.status(200).json({ exists: false }).send();
    }

    return res.status(200).json({ exists: true }).send();
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "There was an error checking this user." });
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const user: IUser = req.body;

  if (!validateUser(user)) {
    return res
      .status(400)
      .json({ message: "Invalid user object sent to server." })
      .send();
  }

  try {
    // Check if user already exists
    const existingUser: IUser = await userModel.findOne({
      username: user.username,
    });

    if (existingUser !== null) {
      return res
        .status(400)
        .json({ message: "That username is already in use." })
        .send();
    }

    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    // Create the new user
    await userModel.create({
      username: user.username,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Created account." }).send();
  } catch (e) {
    // Error creating user
    console.log(e);
    return res
      .status(400)
      .json({ message: "There was an error creating your account." })
      .send();
  }
};
