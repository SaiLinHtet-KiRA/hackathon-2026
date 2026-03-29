import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
