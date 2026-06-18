import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GeminiService } from "./src/services/geminiService.server";
import { EmailService } from "./src/services/emailService.server";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing with size limits
  app.use(express.json({ limit: "10mb" }));

  // API Route for generateCurriculum
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

  // API Route for generateChapterDetails
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

  // API Route for askAi
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

  // API Route for generateScienceNews
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

  // API Route for sending verification emails
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
