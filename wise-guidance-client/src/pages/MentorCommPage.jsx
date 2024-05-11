import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MentorMenu";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MentorCommPage() {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useAuth();
  const [chatToken, setChatToken] = useState("");
  const [recievedMessages, setReceivedMessages] = useState([]);
  const params = useParams();

  useEffect(() => {
    getChatToken();
  }, [auth?.token]);

  return (
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MentorMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            <div className="border border-black">1</div>
            <div className="col-start-1 row-start-2 border border-black">2</div>
            <div className="row-span-2 col-start-2 row-start-1 border border-black">
              <div className=" flex">
                <div className="chat-area"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
