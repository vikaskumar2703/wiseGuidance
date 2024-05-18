import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getChannelByMenteeController,
  getChannelByMentorController,
  getChatTokenController,
  scheduleMeetingController,
} from "../controllers/channelController.js";

const router = express.Router();

router.get("/chat-token/:userId", getChatTokenController);
router.get("/channel-mentor/:mentorId", getChannelByMentorController);
router.get("/channel-mentee/:menteeId", getChannelByMenteeController);
router.post("/create-todo", createTodoController);
router.put("/delete-todo", deleteTodoController);

router.post("/schedule-meeting", scheduleMeetingController);

export default router;
