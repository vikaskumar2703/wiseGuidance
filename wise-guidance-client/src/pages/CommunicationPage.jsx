import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { ZIM } from "zego-zim-web";

export default function CommunicationPage() {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useAuth();
  const [chatToken, setChatToken] = useState("");
  const [recievedMessages, setReceivedMessages] = useState("");

  /*  zim code starts here*/

  var appID = 497565116;

  ZIM.create({ appID });
  var zim = ZIM.getInstance();

  zim.on("error", function (zim, errorInfo) {
    console.log("error", errorInfo.code, errorInfo.message);
  });

  zim.on(
    "connectionStateChanged",
    function (zim, { state, event, extendedData }) {
      console.log("connectionStateChanged", state, event, extendedData);
      if (state == 0 && event == 3) {
        zim.login(userInfo, token);
      }
    }
  );

  const receivePeerMessage = async () => {
    zim.on(
      "receivePeerMessage",
      function (zim, { messageList, fromConversationID }) {
        console.log("receivePeerMessage", messageList, fromConversationID);
      }
    );
  };

  var userInfo = { userID: auth.user._id, userName: auth.user._id };

  const zimLogin = async () => {
    zim
      .login(userInfo, chatToken)
      .then(function () {
        console.log("Login Successfully");
      })
      .catch(function (err) {
        console.log("Login Failed");
      });
  };

  var toConversationID = auth?.user?.mentor; // Peer user's ID.
  var conversationType = 0; // Message type; 1-on- chat: 0, in-room chat: 1, group chat:2
  var config = {
    priority: 1,
  };

  var messageTextObj = {
    type: 1,
    message: message,
    extendedData: "Message extended info(optional)",
  };

  const sendMessage = async () => {
    zim
      .sendMessage(messageTextObj, toConversationID, conversationType, config)
      .then(function ({ message }) {
        console.log("Message sent successfully");
      })
      .catch(function (err) {
        console.log("Message sent unsuccessfully");
      });
  };

  /*  zim code ends here*/

  const getChatToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/communication/chat-token/${
          auth?.user?._id
        }`
      );
      setChatToken(data?.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatToken();
  }, [auth?.token]);

  useEffect(() => {
    zimLogin();
    receivePeerMessage();
  }, [chatToken]);
  return (
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            <div className="border border-black">1</div>
            <div className="col-start-1 row-start-2 border border-black">2</div>
            <div className="row-span-2 col-start-2 row-start-1 border border-black">
              <div className=" flex">
                <div className="chat-area"></div>
                <input
                  placeholder="Enter your message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></input>
                <button className="p-2 bg-red-400" onClick={sendMessage}>
                  {" "}
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
