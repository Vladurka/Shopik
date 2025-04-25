import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
