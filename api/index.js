import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => console.log("server started on port 3000!"));
