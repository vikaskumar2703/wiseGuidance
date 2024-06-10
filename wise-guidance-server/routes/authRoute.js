import express from "express";
import {
  MenteeLoginController,
  MentorLoginController,
  MenteeRegisterController,
  MentorRegisterController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import {
  isAdmin,
  validateToken,
  isMentor,
} from "../middleware/authMiddleware.js";
//Create a router object ; It provides a way to group related routes together and define middleware for those routes separately
const router = express.Router();
import formidable from "express-formidable";

//register-routes
router.post("/mentee-register", MenteeRegisterController);
router.post("/mentor-register", formidable(), MentorRegisterController);
//login routes
router.post("/mentee-login", MenteeLoginController);
router.post("/mentor-login", MentorLoginController);

//forgot-password
router.post("/forgot-password", forgotPasswordController);

router.get("/test", validateToken, isAdmin, testController);

router.get("/user-auth", validateToken, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", validateToken, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/mentor-auth", validateToken, isMentor, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
