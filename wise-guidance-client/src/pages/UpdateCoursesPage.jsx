import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function UpdateCoursesPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [auth, setAuth] = useAuth();
  const [courseName, setCourseName] = useState("");
  const [mentor, setMentor] = useState(auth?.user);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [skills, setSkills] = useState("");
  const [calls, setCalls] = useState("");
  const [duration, setDuration] = useState("");

  const getSingleCourse = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-single-course/${courseId}`
      );

      if (data.success) {
        setCourseName(data.course.courseName);
        setDescription(data.course.description);
        setCost(data.course.cost);
        setSkills(data.course.skills);
        setCalls(data.course.calls);
        setDuration(data.course.duration);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getSingleCourse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/update-course/${courseId}`,
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
          <div className="flex space-x-2 text-red-600">
            <label> Course name : </label>
            <p>{courseName}</p>
          </div>
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
            Update Course
          </button>
        </form>
      </div>
    </Layout>
  );
}
