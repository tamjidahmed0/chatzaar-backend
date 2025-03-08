import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();


mongoose.set("strictQuery", true);
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.connect(URI);

    return true;
  } catch (error) {
    console.log("not connected to database", error);
    return false;
  }
};

export default connectDB;