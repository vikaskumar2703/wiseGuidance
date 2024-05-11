import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";

export default function MenteeDashboardPage() {
  const [auth, setAuth] = useAuth();
  const [mentor, setMentor] = useState({});
  useEffect(() => {
    getMentorById();
  }, [auth]);

  const getMentorById = async () => {
    console.log(auth?.user?.mentor);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/mentorship/get-mentor-id/${
          auth?.user?.mentor
        }`
      );
      setMentor(data?.mentor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Mentee Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <h1 className="">
            Mentee Details, Current Mentor , Review Mentor, Notifications (if
            possiblee)
          </h1>
          <div className="border-2 max-w-fit px-10 py-5 space-y-4 text-start">
            <h1 className="font-bold text-xl">Mentee Details</h1>
            <h2 className="text-2xl"> Name : {auth?.user?.name}</h2>
            <h2 className="text-2xl"> Email : {auth?.user?.email}</h2>
            <h2 className="text-2xl"> Phone : {auth?.user?.phone}</h2>
          </div>
          <div className="border-2 max-w-fit px-10 py-5 space-y-4 text-start">
            <h1 className="font-bold text-xl">Mentor Details</h1>

            <h2 className="text-2xl"> Name : {mentor.name}</h2>
            <h2 className="text-2xl"> Email : {mentor.email}</h2>
            <h2 className="text-2xl"> Experience : {mentor.experience}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
