// routes/quiz.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  email: { type: String, required: true },
  trainingId: { type: Number, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);

// POST /api/quiz/result
router.post("/result", async (req, res) => {
  const { email, trainingId, score } = req.body;
  if (!email || !trainingId || score === undefined) {
    return res.status(400).json({ message: "Brakuje wymaganych danych." });
  }

  try {
    const result = new QuizResult({ email, trainingId, score });
    await result.save();
    res.status(201).json({ message: "Wynik zapisany" });
  } catch (err) {
    console.error("Błąd zapisu quizu:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

module.exports = router;
