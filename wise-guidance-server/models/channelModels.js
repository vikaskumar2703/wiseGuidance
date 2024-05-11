import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
