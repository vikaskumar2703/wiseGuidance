import Layout from "../components/layout/Layout";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import photo from "../assets/photo.png";

export default function BrowseMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();
  const getAllMentors = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-mentors`
      );
      if (data.success) {
        setMentors(data.mentors);
        toast.success(data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllMentors();
  }, []);

  return (
    <Layout title="Browse Mentors">
      <div className="h-full flex items-center justify-center -z-10 bg-slate-100   p-14">
        <div className="w-full h-full flex flex-col items-center">
          <div className="mb-10 rounded-xl  border-2 w-1/2 flex justify-between bg-white items-baseline">
            <input
              className="p-4 rounded-xl font-bold flex-grow "
              placeholder="Search by skills"
            />
            <button className="px-4 p-2 rounded-xl  font-bold mx-3 bg-purple text-white">
              Search
            </button>
          </div>
          <div className="flex justify-center flex-col items-center space-y-10">
            {mentors.map((m) => (
              <div
                className="border border-black w-3/4 space-x-5 p-6 rounded-xl bg-white space-y-2 grid grid-cols-4"
                key={m._id}
              >
                <div className="mr-10  ">
                  <img src={photo} className="min-h-72 min-w-36"></img>
                </div>
                <div className="space-y-2 flex col-span-3 flex-col justify-between">
                  <h1 className="font-bold text-2xl">{m.name}</h1>
                  <p className="font-semibold">
                    {m.designation} at {m.organisation}
                  </p>
                  <p className="text-sm  ">{m.description}</p>

                  <p>
                    {" "}
                    Skills :{" "}
                    {m
                      ? m.skills.map((s, index) => (
                          <span
                            key={index}
                            className="border border-black px-2 text-sm p-1 rounded-3xl mx-2"
                          >
                            {s}
                          </span>
                        ))
                      : ""}
                  </p>
                  <p>{m.experience} years of experience</p>
                  <button
                    onClick={() => {
                      navigate(`${m.slug}`);
                    }}
                    className="bg-purple p-2 font-bold text-white border-black rounded-lg w-2/3"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
