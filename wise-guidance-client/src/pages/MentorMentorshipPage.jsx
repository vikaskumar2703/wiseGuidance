import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MentorMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import girl from "../assets/girl.png";

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
        <div className="text-center">
          <MentorMenu />
        </div>
        <div className="col-span-3 text-center bg-lpurple flex flex-col items-start p-10">
          <div className=" max-w-fit  space-y-4 text-start">
            <h1 className="font-bold text-xl">Mentees :</h1>
            {mentees.map((m) => (
              <div
                className="mentee-card flex flex-col items-center bg-white border-4 h-72 rounded-xl relative w-56"
                key={m._id}
              >
                <div className="bg-gradient-to-b from-purple w-full to-pink-100 h-28 rounded-t-xl "></div>
                <img
                  src={girl}
                  className="h-24 w-24 absolute top-14 right-16 rounded-full "
                />
                <h2 className="text-center font-semibold mt-14">{m.name}</h2>
                <button
                  className="  px-4 py-2 bg-purple rounded-xl w-fit mt-4 text-white"
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
