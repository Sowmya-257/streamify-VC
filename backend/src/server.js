// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import chatRoutes from "./routes/chat.route.js";

// import { connectDB } from "./lib/db.js";

// const app = express();
// const PORT = process.env.PORT;

// const __dirname = path.resolve();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, // allow frontend to send cookies
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
//   });
// }



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   connectDB();
// });

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup for local + production
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://streamify-vc-cw63.onrender.com", // your Render frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
