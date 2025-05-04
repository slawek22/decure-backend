const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// KONFIGURACJA CORS – ZEZWÓL NA FRONTEND Z NETLIFY I LOKALHOST
const allowedOrigins = [
  "http://localhost:5173",                 // lokalny frontend
  "https://twoja-domena.netlify.app",     // zastąp własnym adresem Netlify
  "https://decure.pl"                     // jeśli masz własną domenę
];

app.use(
  cors({
    origin: function (origin, callback) {
      // pozwól na brak origin (np. curl lub postman) lub dozwolony origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);

// SPRAWDŹ, CZY MONGO_URI ISTNIEJE
if (!process.env.MONGO_URI) {
  console.error("Brak MONGO_URI w pliku .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
