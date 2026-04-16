require("dotenv").config();
const express = require("express");
const cors = require("cors");

const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const contentPostsRouter = require("./routes/contentPosts");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/content-posts", contentPostsRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
