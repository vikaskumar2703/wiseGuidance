import Mentee from "../models/menteeModels.js";
import slugify from "slugify";

import Mentor from "../models/mentorModel.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/authUtils.js";

//@desc Register a user
//@route POST /api/v1/auth/register
//@access public
export const MenteeRegisterController = async (req, res) => {
  try {
    const { name, email, pass, phone, address, answer } = req.body;

    // Validate fields in user input
    if (!name || !email || !pass || !phone || !address || !answer) {
      return res.send({ message: "All fields are mandatory!" });
    }
    // Check for an existing user
    const existingUser = await Mentee.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: " Mentee already Exists",
      });
    }
    const hashedPassword = await hashPassword(pass);
    const user = await Mentee.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    if (user) {
      return res.status(201).send({
        success: true,
        message: "Mentee registered successfully",
        user,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error in mentee registration",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in registration",
      error,
    });
  }
};

//mentor Register
export const MentorRegisterController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      domain,
      answer,
      organisation,
      skills,
      designation,
      experience,
    } = req.body;

    // Validate fields in user input
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !answer ||
      !domain ||
      !organisation ||
      !skills ||
      !designation ||
      !experience
    ) {
      return res.send({ message: "All fields are mandatory!" });
    }
    // Check for an existing user
    const existingUser = await Mentor.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: " Mentor already Exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await Mentor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      domain,
      slug: slugify(name),
      answer,
      organisation,
      skills,
      designation,
      experience,
    });
    if (user) {
      return res.status(201).send({
        success: true,
        message: "Mentor registered successfully",
        user,
      });
    } else {
      return res.status(400).send({
        success: true,
        message: "Mentor registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in registration",
      error,
    });
  }
};

// @desc login a user
// @route POST /api/v1/auth/login
// @access public
export const MenteeLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    const user = await Mentee.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      const token = jwt.sign(
        {
          username: user.name,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      return res.status(201).send({
        success: true,
        message: "Login successfull",
        user,
        token,
      });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Mentee or password does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while logging",
      error,
    });
  }
};

// mentor login
export const MentorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    const user = await Mentor.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      const token = jwt.sign(
        {
          username: user.name,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      return res.status(201).send({
        success: true,
        message: "Login successfull",
        user,
        token,
      });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Mentor or password does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while logging",
      error,
    });
  }
};

// @desc forgot password controller
// @route POST /api/v1/auth/forgot-password
// @access public
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }
    const user = await Mentee.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "wrong email or answer" });
    }
    const hashedPassword = await hashPassword(newPassword);
    await Mentee.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while reseting password",
      error,
    });
  }
};

// @desc test controller
// @route POST /api/v1/auth/test
// @access private - admin only
export const testController = async (req, res) => {
  res.status(201).send({
    message:
      "Token validated successfully + Protected Route can be accessed by admin with token",
  });
};
