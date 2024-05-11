import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    mentorName: {
      type: String,
      required: true,
    },
    mentorSlug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    calls: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "1 month",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
