import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MentorMenu";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ChatArea from "../components/Chat";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MentorCommunicationPage() {
  const params = useParams();
  const [menteeId, setMenteeId] = useState(params.menteeId);
  const [channel, setChannel] = useState({});
  const [auth, setAuth] = useAuth();
  const [chatToken, setChatToken] = useState("");
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [openModal, setOpenModal] = useState(false);
  //schedule meeting states
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");

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
        }/api/communication/channel-mentee/${menteeId}`
      );
      setChannel(data?.channel);
      setTodos(data?.channel.todo);
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

  const scheduleMeeeting = async () => {
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/communication/schedule-meeting`,
        { channelId: channel._id, title, date, time }
      );
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full h-screen mb-14 ">
        <div className="text-center ">
          <MentorMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start bg-lpurple">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            <div className="border meeting-box bg-white rounded-xl">
              <div className="text-start p-4 bg-gradient-to-r from-pink-200 to-violet-300 rounded-t-xl text-white font-semibold">
                Meetings With Mentor
              </div>
              <div className="flex justify-center items-center flex-col space-y-6 mt-14 ">
                <Link
                  to={`/dashboard/meeting/${channel._id}`}
                  className="bg-purple rounded-t-xl text-white p-4 w-48 rounded-xl font-semibold"
                >
                  Join Meeting
                </Link>{" "}
                <Link
                  className="bg-purple text-white p-4 w-48 rounded-xl font-semibold"
                  onClick={() => setOpenModal(true)}
                >
                  Schedule Meeting
                </Link>
              </div>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Schedule Meeting</Modal.Header>
                <form className="space-y-2">
                  <Modal.Body>
                    <div className="space-y-2 flex flex-col ">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <label htmlFor="time">Time</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      onClick={() => {
                        setOpenModal(false);
                        scheduleMeeeting();
                      }}
                      className="bg-purple text-white p-2 rounded-lg"
                    >
                      Schedule Meeting
                    </button>
                  </Modal.Footer>{" "}
                </form>
              </Modal>
            </div>
            <div className="col-start-1 row-start-2 border-2 rounded-xl bg-white">
              <div className="text-start p-4 rounded-t-xl  bg-gradient-to-r from-pink-200 to-violet-300 text-white font-semibold">
                Goals & Tasks
              </div>
              <div className="flex  justify-between p-2 gap-4 ">
                <input
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  placeholder="Enter task to do"
                  className="flex-grow px-2 h-10 border rounded-xl"
                />
                <button
                  className=" text-2xl text-purple"
                  onClick={(e) => addTask(e)}
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                </button>
              </div>
              <div className=" p-2 w-full ">
                {todos.map((t, index) => (
                  <div
                    key={index}
                    className="flex border-b px-2 justify-between items-center w-full"
                  >
                    <p>{t.task}</p>
                    <button
                      className=" text-red-600 p-2"
                      onClick={() => deleteTask(t._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="row-span-2 col-start-2 rounded-xl row-start-1 border-2 ">
              <div className=" flex h-full ">
                <div className="chat-area w-full rounded-xl">
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
