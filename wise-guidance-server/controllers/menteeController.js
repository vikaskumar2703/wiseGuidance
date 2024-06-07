import Mentor from "../models/mentorModel.js";
import Course from "../models/courseModels.js";
import Mentee from "../models/menteeModels.js";
import Channel from "../models/channelModels.js";
import slugify from "slugify";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

// payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

// generate a  braintree client token

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(response);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in generating transaction token ",
      error,
    });
  }
};

// make transaction controller

export const braintreePaymentController = async (req, res) => {
  try {
    const { courseCost, mentorId, nonce, menteeId } = req.body;
    if (!mentorId || !courseCost || !nonce || !menteeId) {
      return res.send({ message: "All fields are mandatory!" });
    }

    let newTransaction = gateway.transaction.sale(
      {
        amount: courseCost,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result) {
          const mentee = await Mentee.findByIdAndUpdate(
            menteeId,
            {
              mentor: mentorId,
            },
            { new: true }
          ).populate("mentor");
          const mentor = await Mentor.findByIdAndUpdate(
            mentorId,
            {
              $addToSet: { mentee: menteeId },
            },
            { new: true }
          );
          const channel = await Channel.create({
            mentor: mentorId,
            mentee: menteeId,
          });
          if (mentee)
            res
              .status(201)
              .send({ success: true, message: "Payment Successfull", mentee });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in checkout ",
      error,
    });
  }
};

// get assigned mentor (complete details) from mentee's user Id
export const getAssignedMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ _id: req.params.slug });

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

// update mentee profile
export const updateMenteeProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // form validation
    if (!name || !email || !phone || !address) {
      return res.send({ message: "All fields are mandatory!" });
    }

    const mentee = await Mentee.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        email,
        phone,
        address,
      },
      {
        new: true,
      }
    );

    res.status(201).send({
      success: true,
      message: "Mentee profile updated successfully",
      mentee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " Error in updating mentee profile",
      error: error.message,
    });
  }
};
