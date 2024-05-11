import jwt from "jsonwebtoken";
import Mentee from "../models/menteeModels.js";
import Mentor from "../models/mentorModel.js";

export const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("bearer")) {
      token = authHeader.split(" ")[1];
      // console.log(`Token :${token}`);
    } else {
      token = authHeader;
    }
    const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedPayload;
    //adding decodedPayload of token i.e user information to new property in req and then passing it on to next()
    // console.log(decodedPayload);
    next();
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in token validation",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.user.email);
    const user = await Mentee.findOne({
      email: req.user.email,
    });
    // console.log(user);
    if (user && user.role == 1) {
      // console.log("reached here");
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "unauthorized access admin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in admin validation",
      error,
    });
  }
};

export const isMentor = async (req, res, next) => {
  try {
    // console.log(req.user.email);
    const user = await Mentor.findOne({
      email: req.user.email,
    });
    // console.log(user);
    if (user && user.userType == "mentor") {
      // console.log("reached here");
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "unauthorized access ,not a mentor",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in mentor validation",
      error,
    });
  }
};
