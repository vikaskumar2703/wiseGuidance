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

  const getAllCourses = async () => {
    try {
      const slug = auth?.user?.slug;

      console.log(slug);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-courses/${slug}`
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
    <Layout title="My Courses ">
      <div className="p-8">
        <h1 className="font-bold"> Hi , All your courses will appear here</h1>
        <div className="flex">
          {courses.map((c) => (
            <div
              key={c._id}
              className=" rounded-2xl border-2 flex flex-col  items-center m-4 pb-4 "
            >
              <div className="border-b w-full text-center  text-xl   font-bold mb-4  rounded-t-2xl">
                <h1 className="py-6 "> {c.courseName}</h1>
              </div>
              <div className="p-8 space-y-4 ">
                <p>Description: {c.description}</p> <p>Cost: ${c.cost}</p>
                <p>Calls per month: {c.calls}</p>{" "}
                <p>Duration of course : {c.duration}</p>
              </div>

              <button
                className="border p-2 rounded-lg bg-purple font-semibold text-white"
                onClick={() => {
                  navigate(`update-course/${c._id}`);
                }}
              >
                Update Course
              </button>
            </div>
          ))}
        </div>
        <br></br>
        <div className="w-full text-center">
          <button
            className="border bg-red-500 text-center rounded-xl font-semibold text-white p-4 "
            onClick={() => {
              navigate("create-course");
            }}
          >
            Create New Mentorship Plan
          </button>
        </div>
      </div>
    </Layout>
  );
}
