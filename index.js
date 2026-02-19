const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/dbConfig");
const contactRouter = require("./routes/contactRoutes");
const careerRouter = require("./routes/careerRoutes");
const otpRouter = require("./routes/otpRoutes");
const eBookRouter = require("./routes/eBookRoutes");

const PORT = process?.env?.PORT;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [process?.env?.FRONT_END_URL, process?.env?.SECONDARY_DOMAIN],
    credentials: true,
  })
);
app.use(fileUpload());
app.use(express.json());

// Simple AI-powered chatbot endpoint using Vercel AI SDK
// Expects: { messages: [{ role: "user" | "assistant", content: string }] }
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ error: "messages array is required in request body" });
    }

    // Build a simple prompt from the conversation history
    const prompt = messages
      .map((m) => `${m.role || "user"}: ${m.content || ""}`)
      .join("\n");

    // Dynamically import ESM-only AI SDK in CommonJS environment.
    // Uses Vercel AI Gateway via AI_GATEWAY_API_KEY and a model string.
    const { generateText } = await import("ai");

    const { text } = await generateText({
      model: "openai/gpt-4.1-mini",
      prompt,
    });

    return res.json({
      reply: text,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({
      error: "Failed to generate chatbot response. Please try again.",
    });
  }
});

app.use("/contact", contactRouter);
app.use("/career", careerRouter);
app.use("/otp", otpRouter);
app.use("/eBook", eBookRouter);

app.listen(PORT, () => {
  console.log(`PORT IS LISTEN ON ${PORT}`);
});
