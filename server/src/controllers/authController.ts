import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, password });

  if (await user.save()) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id as string),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id as string), ,
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
