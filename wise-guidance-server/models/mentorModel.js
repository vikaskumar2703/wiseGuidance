import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      default: "mentor",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, lowercase: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    mentee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentee",
      },
    ],

    answer: {
      type: String,
      required: true,
    },
    photo: {
      data: "Buffer",
      contentType: String,
    },
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", MentorSchema);
export default Mentor;
