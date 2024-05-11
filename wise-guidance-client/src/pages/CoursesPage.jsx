import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function CoursesPage() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [mentorId, setMentorId] = useState("");

  const getAllCourses = async () => {
    try {
      const slug = auth?.user?.slug;

      console.log(slug);
      const { data } = await axios.get(
        `http://localhost:8000/api/mentorship/get-courses/${slug}`
      );

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCourses();
  }, [auth?.user?.slug]);

  return (
    <Layout title="My Courses">
      <h1 className="font-bold"> Hi , All your courses will appear here</h1>
      {courses.map((c) => (
        <div key={c._id} className="border-black border-2 m-4">
          <h1>Name of Plan: {c.courseName}</h1>
          <p>Description: {c.description}</p> <p>Cost: {c.cost}</p>
          <p>Calls per month: {c.calls}</p>
          <button className="border bg-red-500 text-white p-2">
            Update Course
          </button>
        </div>
      ))}
      <br></br>
      <button
        className="border bg-blue-600 text-white p-2 rounded"
        onClick={() => {
          navigate("create-course");
        }}
      >
        Create New Mentorship Plan
      </button>
    </Layout>
  );
}
