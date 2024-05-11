import Layout from "../components/layout/Layout";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
      <div className="h-full flex items-center justify-center border-black border p-14">
        <div className="w-full h-full">
          <div className="mb-10">
            <input
              className="p-4 rounded-xl font-bold  border-2 w-1/2"
              placeholder="Search by skills"
            />
            <button className="p-4 rounded-xl  font-bold ml-4 bg-purple text-white">
              Search
            </button>
          </div>
          {mentors.map((m) => (
            <div
              className="border border-black w-fit space-x-5 p-8 rounded-xl space-y-2 flex justify-between"
              key={m._id}
            >
              <div>
                <h1>Name : {m.name}</h1>
                <p>Designation : {m.designation}</p>
                <p>Domain : {m.domain}</p>
              </div>
              <button
                onClick={() => {
                  navigate(`${m.slug}`);
                }}
                className="bg-amber-300 p-2 font-bold text-white border-black rounded-lg"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
