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
