import express from "express";
import {
  createCourseController,
  getAllCourses,
  getAllMenteesController,
  getMentorByIdController,
  getMentorsController,
  getSingleCourse,
  getSingleMentorController,
  searchMentorController,
  updateCourseController,
  updateProfileController,
  mentorPhotoController,
} from "../controllers/mentorController.js";
import { isMentor, validateToken } from "../middleware/authMiddleware.js";

import {
  braintreePaymentController,
  braintreeTokenController,
} from "../controllers/menteeController.js";
import formidable from "express-formidable";

const router = express.Router();

// get all mentors
router.get("/get-mentors", getMentorsController);

router.get("/get-mentor/:slug", getSingleMentorController);

router.get("/get-mentor-id/:id", getMentorByIdController);

router.get("/mentor-photo/:mid", mentorPhotoController);

router.get("/search/:keyword", searchMentorController);

router.post("/create-course", validateToken, isMentor, createCourseController);

router.put(
  "/update-course/:courseId",
  validateToken,
  isMentor,
  updateCourseController
);

router.get("/get-courses/:mentorSlug", getAllCourses);

router.get("/get-single-course/:courseId", getSingleCourse);

router.get("/client-token", validateToken, braintreeTokenController);

router.put(
  "/update-profile/:id",
  validateToken,
  formidable(),
  updateProfileController
);

router.put("/checkout", validateToken, braintreePaymentController);

router.get("/get-all-mentees/:mentorId", getAllMenteesController);

export default router;
