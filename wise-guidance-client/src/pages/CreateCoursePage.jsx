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
  const [duration, setDuration] = useState("");

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
          duration,
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
      <div className="form w-full h-screen flex justify-center p-16 bg-lpink ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 h-fit rounded-xl p-10 bg-white font-semibold"
        >
          <div className="flex ">
            <label>Select a Course name : </label>
            <div className="ml-2 space-x-3">
              <input
                type="radio"
                id="short"
                name="courseName"
                value="Short Term"
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
              <label htmlFor="short">Short Term</label>
              <input
                type="radio"
                id="medium"
                name="courseName"
                value="Medium Term"
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
              <label htmlFor="medium">Medium Term</label>
              <input
                type="radio"
                id="long"
                name="courseName"
                value="Long Term"
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
              <label htmlFor="long">Long Term</label>
            </div>
          </div>{" "}
          <div className="flex">
            <label htmlFor="description">Description : </label>
            <textarea
              rows={2}
              value={description}
              className="border-gray-200 p-1 rounded-md ml-2 flex-grow"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
            ></textarea>{" "}
          </div>
          <div className="flex">
            <label htmlFor="cost">Cost : </label>
            <input
              value={cost}
              className="border  p-1 ml-2 flex-grow rounded-md"
              onChange={(e) => {
                setCost(e.target.value);
              }}
              id="cost"
            ></input>{" "}
          </div>
          {/* <input
          value={skills}
          className="border"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          id="courseName"
          placeholder="Write Course Name"
        ></input>{" "} */}{" "}
          <div className="flex">
            <label htmlFor="calls">Calls per month : </label>
            <input
              value={calls}
              className="border  p-1 ml-2 flex-grow rounded-md"
              onChange={(e) => {
                setCalls(e.target.value);
              }}
              id="calls"
            ></input>
          </div>
          <div className="flex">
            <label htmlFor="duration">Duration : </label>
            <input
              value={duration}
              className="border  p-1 ml-2 flex-grow rounded-md"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              id="duration"
            ></input>{" "}
          </div>
          <button
            type="submit"
            className="border bg-purple p-3 rounded-xl text-white"
          >
            Create Course
          </button>
        </form>
      </div>
    </Layout>
  );
}
