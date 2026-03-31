import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDqweqe23123wewSDadccshbf2");

// Choose model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Simple route
app.get("/", (req, res) => {
  res.send("Gemini API is running 🚀");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({
      reply: response.text(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
