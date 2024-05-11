import express from "express";
import {
  getChannelByMenteeController,
  getChannelByMentorController,
  getChatTokenController,
} from "../controllers/channelController.js";

const router = express.Router();

router.get("/chat-token/:userId", getChatTokenController);
router.get("/channel-mentor/:mentorId", getChannelByMentorController);
router.get("/channel-mentee/:menteeId", getChannelByMenteeController);

export default router;
