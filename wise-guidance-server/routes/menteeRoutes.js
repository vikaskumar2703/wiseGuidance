import express from "express";

import { validateToken } from "../middleware/authMiddleware.js";
import { updateMenteeProfileController } from "../controllers/menteeController.js";

const router = express.Router();

// update mentee profile
router.put("/update-profile/:id", validateToken, updateMenteeProfileController);

export default router;
