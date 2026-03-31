import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://kira:sai123pol@cluster0.gz3d5o3.mongodb.net/?appName=Cluster0",
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
