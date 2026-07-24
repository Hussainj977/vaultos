const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VaultOS AI Backend is running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Temporary response
    // Real gpt-oss-20b connection will be added next
    const reply = `VaultOS AI received: ${message}`;

    res.json({
      reply,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "AI server error",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `VaultOS AI Backend running on port ${PORT}`
  );
});