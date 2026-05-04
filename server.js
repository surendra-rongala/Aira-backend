import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.AIzaSyBRSTDacs5ORl7JvGEsM9Bxl_8XsF2JVLI;

app.post("/aira", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.body.message }] }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AIRA is thinking...";

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "AIRA is reconnecting..." });
  }
});

app.listen(3000, () => console.log("Server running"));
