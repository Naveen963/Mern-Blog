import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateData([email, password])) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(400, "User not found"));
      return;
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(400, "Invalid password"));
      return;
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: passwordRef, ...userData } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userData);
  } catch (err) {
    next(err);
  }
};
