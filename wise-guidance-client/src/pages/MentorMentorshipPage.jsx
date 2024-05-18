import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MentorMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MentorMentorshipPage() {
  const [auth, setAuth] = useAuth();
  const [mentees, setMentees] = useState([]);
  const navigate = useNavigate();

  const getAllMentees = async () => {
    console.log(auth?.user?._id);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-all-mentees/${auth?.user?._id}`
      );
      setMentees(data?.mentor.mentee);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMentees();
  }, []);

  return (
    <Layout title="Mentor Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MentorMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <div className="border-2 max-w-fit px-10 py-5 space-y-4 text-start">
            <h1 className="font-bold text-xl">Mentees :</h1>
            {mentees.map((m) => (
              <div className="border p-4" key={m._id}>
                <h2 className="text-2xl"> Name :{m.name}</h2>
                <button
                  className="p-2 bg-blue-500"
                  onClick={() => {
                    navigate(`/dashboard/mentor/mentorship/${m._id}`);
                  }}
                >
                  {" "}
                  Start Mentorship{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
