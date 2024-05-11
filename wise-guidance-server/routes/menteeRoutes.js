import express from "express";
import { chatTokenController } from "../controllers/menteeController.js";

const router = express.Router();

// get all mentors
router.get("/chat-token/:userId", chatTokenController);

export default router;
