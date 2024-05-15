import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import axios from "axios";
import ChatArea from "../components/Chat";
import { Link } from "react-router-dom";

export default function MenteeCommunicationPage() {
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useAuth();
  const [channel, setChannel] = useState({});
  const [chatToken, setChatToken] = useState("");
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

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

  const getChannel = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/communication/channel-mentee/${auth?.user?._id}`
      );
      setChannel(data?.channel);
      setTodos(data?.channel?.todo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getChatToken();
    getChannel();
  }, []);

  const addTask = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/communication/create-todo`,
        { task, channelId: channel._id }
      );
      setTodos(data.todo);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/communication/delete-todo`,
        { taskId: id, channelId: channel._id }
      );
      setTodos(data?.todo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            <div className="border border-black flex justify-center items-center">
              <Link
                to={`/dashboard/meeting/${channel._id}`}
                className="bg-purple text-white p-2 rounded-xl font-semibold"
              >
                Join Meeting
              </Link>
            </div>
            <div className="col-start-1 row-start-2 border border-black flex justify-center flex-col space-y-4">
              <div className="flex justify-center">
                <input
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  placeholder="Enter task to do"
                />
                <button className="p-2 bg-purple" onClick={addTask}>
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {todos.map((t, index) => (
                  <div key={index} className="flex justify-center">
                    <p className="w-2/3">{t.task}</p>
                    <button
                      className="bg-red-600 text-white p-2"
                      onClick={() => deleteTask(t._id)}
                    >
                      Del
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="row-span-2 col-start-2 row-start-1 border border-black">
              <div className=" flex h-full ">
                <div className="chat-area w-full">
                  {chatToken ? (
                    <ChatArea
                      userObj={auth.user}
                      token={chatToken}
                      channelId={channel._id}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
