import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [courseName, setCourseName] = useState("");
  const [mentor, setMentor] = useState(auth?.user);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [skills, setSkills] = useState(["ai", "ml"]);
  const [calls, setCalls] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/create-course`,
        {
          courseName,
          mentor,
          mentorName: mentor.name,
          description,
          cost,
          skills,
          calls,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/courses");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Create Course">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 m-10">
        <input
          value={courseName}
          className="border"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          id="courseName"
          placeholder="Write Course Name"
        ></input>
        <input
          value={description}
          className="border"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="description"
          placeholder="Write description"
        ></input>{" "}
        <input
          value={cost}
          className="border"
          onChange={(e) => {
            setCost(e.target.value);
          }}
          id="cost"
          placeholder="cost"
        ></input>{" "}
        {/* <input
          value={skills}
          className="border"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          id="courseName"
          placeholder="Write Course Name"
        ></input>{" "} */}
        <input
          value={calls}
          className="border"
          onChange={(e) => {
            setCalls(e.target.value);
          }}
          id="calls"
          placeholder="Write Calls per month"
        ></input>
        <button type="submit" className="border bg-blue-600 text-white">
          Create Course
        </button>
      </form>
    </Layout>
  );
}
