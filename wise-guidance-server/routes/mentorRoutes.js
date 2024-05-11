import express from "express";
import formidable from "express-formidable";
import {
  createCourseController,
  getAllCourses,
  getAllMenteesController,
  getMentorByIdController,
  getMentorsController,
  getSingleMentorController,
} from "../controllers/mentorController.js";
import { isMentor, validateToken } from "../middleware/authMiddleware.js";

import {
  braintreePaymentController,
  braintreeTokenController,
} from "../controllers/menteeController.js";

const router = express.Router();

// get all mentors
router.get("/get-mentors", getMentorsController);

router.get("/get-mentor/:slug", getSingleMentorController);

router.get("/get-mentor-id/:id", getMentorByIdController);

router.post("/create-course", validateToken, isMentor, createCourseController);

router.get("/get-courses/:mentorSlug", getAllCourses);

router.get("/client-token", validateToken, braintreeTokenController);

router.put("/checkout", validateToken, braintreePaymentController);

router.get("/get-all-mentees/:mentorId", getAllMenteesController);

export default router;
