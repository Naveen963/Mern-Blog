import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const validateData = (data) => {
  return data.every((c) => {
    if (!c || c === "") return false;
    return true;
  });
};

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!validateData([username, password, email])) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    next(err);
  }
};
