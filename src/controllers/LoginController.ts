import express from "express";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import userModel from "../models/User";

// Return true if user is a valid UserInformation interface
const validateUser = (user: IUser) => {
  if (user.password === undefined || user.password == null) {
    return false;
  }

  if (user.username === undefined || user.username == null) {
    return false;
  }

  return true;
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
