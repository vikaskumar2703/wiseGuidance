import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";
import girl from "../assets/girl.png";
import { useNavigate } from "react-router-dom";

export default function MenteeDashboardPage() {
  const [auth, setAuth] = useAuth();
  const [mentor, setMentor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMentorById();
  }, [auth]);

  const getMentorById = async () => {
    console.log(auth?.user?.mentor);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-mentor-id/${auth?.user?.mentor}`
      );
      setMentor(data?.mentor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Mentee Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center ">
          <MenteeMenu />
        </div>
        <div className="col-span-3 bg-lpurple  text-center p-10 flex flex-col items-start space-y-8   ">
          <div className="text-start">
            <h1 className="font-bold text-2xl">Hi {auth?.user?.name},</h1>
            <p className="my-3 font-semibold">
              Welcome to your mentee dashboard
            </p>
          </div>
          <div className=" rounded-xl max-w-fit   space-y-4 text-start">
            <h1 className="font-bold text-xl ">Your Details</h1>
            <h2 className=""> Name : {auth?.user?.name}</h2>
            <h2 className=""> Email : {auth?.user?.email}</h2>
            <h2 className=""> Phone : {auth?.user?.phone}</h2>
          </div>
          <div className=" max-w-fit space-y-4 text-start">
            <h1 className="font-bold text-xl">Current Mentor </h1>

            <div
              className="mentor-card flex flex-col items-center bg-white border-4 h-72 rounded-xl relative w-56"
              key={mentor._id}
            >
              <div className="bg-gradient-to-b from-purple w-full to-pink-100 h-28 rounded-t-xl "></div>
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/api/mentorship/mentor/mentor-photo/${mentor._id}`}
                className="h-24 w-24 absolute top-14 right-16 rounded-full "
              />
              <h2 className="text-center font-semibold mt-14">{mentor.name}</h2>
              <button
                className="  px-4 py-2 bg-purple rounded-xl w-fit mt-4 text-white"
                onClick={() => {
                  navigate(`/browse-mentors/${mentor.slug}`);
                }}
              >
                {" "}
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
