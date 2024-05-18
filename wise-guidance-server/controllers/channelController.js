import Channel from "../models/channelModels.js";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

// get channel (single) by mentor id
export const getChannelByMentorController = async (req, res) => {
  try {
    const channel = await Channel.findOne({ mentor: req.params.mentorId })
      .populate("mentor")
      .populate("mentee");
    res.status(200).send({
      success: true,
      message: "Message retrieved successfull",
      channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while getting channel",
      error,
    });
  }
};

// get channel by mentee id
export const getChannelByMenteeController = async (req, res) => {
  try {
    const channel = await Channel.findOne({ mentee: req.params.menteeId })
      .populate("mentor")
      .populate("mentee");
    res.status(200).send({
      success: true,
      message: "Message retrieved successfull",
      channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while getting channel",
      error,
    });
  }
};

// get chat token
export const getChatTokenController = async (req, res) => {
  try {
    const serverClient = StreamChat.getInstance(
      process.env.API_KEY,
      process.env.API_SECRET
    );
    const token = await serverClient.createToken(req.params.userId);
    res.status(200).send({
      success: true,
      message: "Chat token generated successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while getting chat token",
      error,
    });
  }
};

// create to-do
export const createTodoController = async (req, res) => {
  try {
    const { task, channelId } = req.body;
    if (!task || !channelId) {
      return res.send({ message: "Task field cannot be empty" });
    }
    const { todo } = await Channel.findByIdAndUpdate(
      channelId,
      {
        $addToSet: { todo: { task } },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Task Created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while creating todo",
      error,
    });
  }
};

// delete to-do
export const deleteTodoController = async (req, res) => {
  try {
    const { taskId, channelId } = req.body;
    if (!taskId || !channelId) {
      return res.send({
        message: " channel id misiing  ",
      });
    }
    const { todo } = await Channel.findByIdAndUpdate(
      channelId,
      {
        $pull: { todo: { _id: taskId } },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while updating todo",
      error,
    });
  }
};

// send scheduled meetings message
export const scheduleMeetingController = async (req, res) => {
  try {
    const { channelId, title, date, time } = req.body;
    if (!channelId || !title || !date || !time) {
      return res.status(500).send({ message: "All fields are mandatory" });
    }
    const client = StreamChat.getInstance(
      process.env.API_KEY,
      process.env.API_SECRET
    );
    const channel = client.channel("messaging", channelId);
    const text = `Meeting has been scheduled by your mentor on ${date} at ${time} for ${title}. Click on the Join meeting at the respective time `;
    const message = {
      text,
      user: { id: "sysId", name: "System" },
      silent: true,
      type: "system",
      pinned: true,
      pin_expires: `${date}T${time}:00Z`,
    };
    await channel.sendMessage(message);

    res.status(200).send({
      success: true,
      message: "Meeting scheduled successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error while scheduling meeting",
      error,
    });
  }
};
