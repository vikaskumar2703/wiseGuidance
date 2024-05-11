import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import authRoutes from "./routes/authRoute.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import menteeRoutes from "./routes/menteeRoutes.js";
import cors from "cors";
dotenv.config();

//rest object
const app = express();

// parsing JSON (middleware) - takes Json as input from request body and returns a promise that returns a JS object ; WHy JSON ? because data is transfered over the web in this format

app.use(cors());
app.use(express.json());

//database connection
connectDb();
//rest api

// router middleware
app.use("/api/auth", authRoutes);
app.use("/api/mentorship", mentorRoutes);
app.use("/api/communication", menteeRoutes);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to wiseGuidance website</h1>");
});

//PORT
const port = process.env.PORT || 8080;

//run listen
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
