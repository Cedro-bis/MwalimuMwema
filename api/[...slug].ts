import express from "express";
import { GeminiService } from "../src/lib/geminiService.server.js";
import { EmailService } from "../src/lib/emailService.server.js";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/api/generateCurriculum", async (req, res) => {
  try {
    const { level, subject } = req.body;
    const data = await GeminiService.generateCurriculum(level, subject);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating curriculum on server:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post("/api/generateChapterDetails", async (req, res) => {
  try {
    const { level, subject, chapterTitle } = req.body;
    const data = await GeminiService.generateChapterDetails(level, subject, chapterTitle);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating chapter details on server:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post("/api/askAi", async (req, res) => {
  try {
    const { level, subject, chapterTitle, lessonContent, question } = req.body;
    const response = await GeminiService.askAi(level, subject, chapterTitle, lessonContent, question);
    res.json({ response });
  } catch (error: any) {
    console.error("Error asking AI on server:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post("/api/generateScienceNews", async (req, res) => {
  try {
    const { specificDomain } = req.body;
    const data = await GeminiService.generateScienceNews(specificDomain);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating science news on server:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post("/api/sendVerificationEmail", async (req, res) => {
  try {
    const { email, code, appUrl } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }
    const result = await EmailService.sendVerificationEmail(email, code, appUrl);
    res.json(result);
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

export default app;
