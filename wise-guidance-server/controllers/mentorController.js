import Mentor from "../models/mentorModel.js";
import Course from "../models/courseModels.js";
import slugify from "slugify";

// get all mentors
export const getMentorsController = async (req, res) => {
  try {
    const mentors = await Mentor.find({}).limit(12).sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: "Mentors listed successfully",
      mentors,
      menotrCount: mentors.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting all Mentors",
      error: error.message,
    });
  }
};

//get single mentor
export const getSingleMentorController = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ slug: req.params.slug });
    if (mentor) {
      res.status(201).send({
        success: true,
        message: "Single Mentor listed successfully",
        mentor,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting single Mentor",
      error: error.message,
    });
  }
};

export const getMentorByIdController = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    res.status(201).send({
      success: true,
      message: "Single Mentor listed successfully",
      mentor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting single Mentor",
      error: error.message,
    });
  }
};

// create courses
export const createCourseController = async (req, res) => {
  try {
    const { courseName, mentor, mentorName, description, cost, skills, calls } =
      req.body;
    if (
      !courseName ||
      !mentor ||
      !mentorName ||
      !description ||
      !skills ||
      !cost ||
      !calls
    ) {
      return res.send({ message: "All fields are mandatory!" });
    }
    const course = await Course.create({
      courseName,
      mentor,
      mentorName,
      mentorSlug: slugify(mentorName),
      description,
      cost,
      skills,
      calls,
    });
    if (course) {
      return res.status(201).send({
        success: true,
        message: "Course created successfully",
        course,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error in course registration",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in creating course",
      error: error.message,
    });
  }
};

// update course
export const updateCourseController = async (req, res) => {
  try {
    const { courseName, mentor, mentorName, description, cost, skills, calls } =
      req.body;
    if (
      !courseName ||
      !mentor ||
      !mentorName ||
      !description ||
      !skills ||
      !cost ||
      !calls
    ) {
      return res.send({ message: "All fields are mandatory!" });
    }
    const course = await Course.findByIdAndUpdate(
      { _id: req.params.courseId },
      {
        courseName,
        mentor,
        mentorName,

        description,
        cost,
        skills,
        calls,
      },
      { new: true }
    );
    if (course) {
      return res.status(201).send({
        success: true,
        message: "Course updated successfully",
        course,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error in course registration",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in creating course",
      error: error.message,
    });
  }
};

//get all courses of a mentor

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ mentorSlug: req.params.mentorSlug });

    res.status(201).send({
      success: true,
      message: "All courses listed successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting  Mentor Courses",
      error: error.message,
    });
  }
};

// get single course
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    res.status(201).send({
      success: true,
      message: "Single courses retrieved successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting single Mentor Course",
      error: error.message,
    });
  }
};

// get all mentees
export const getAllMenteesController = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate(
      "mentee"
    );

    res.status(201).send({
      success: true,
      message: "All courses listed successfully",
      mentor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in getting  Mentor Courses",
      error: error.message,
    });
  }
};
