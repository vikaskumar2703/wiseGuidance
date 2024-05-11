import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/authContext";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { createCourseController } from "../../../wise-guidance-server/controllers/mentorController";

export default function MentorProfilePage() {
  const params = useParams();
  const [mentor, setMentor] = useState({});
  // const [mentorId, setMentorId] = useState("");
  const [courses, setCourses] = useState([]);
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(auth?.user?._id)
  //menteeId : auth?.user?._id

  // const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      getSingleMentor();
      getAllCourses();
    }
  }, [params.slug]);

  // getSingleMentor from params
  const getSingleMentor = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-mentor/${params.slug}`
      );
      setMentor(data?.mentor);
      // getSimilarProducts(data?.product.category._id, data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get courses of mentor
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/get-courses/${params.slug}`
      );

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // braintree client token generation
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/client-token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async (courseCost, mentorId) => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/mentorship/mentor/checkout`,
        { courseCost, mentorId, nonce, menteeId: auth?.user?._id }
      );
      if (data && data?.mentee) {
        setLoading(false);
        setAuth({ ...auth, user: data.mentee });

        navigate("/dashboard/mentee");
        toast.success("Payment Completed Successfully ");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title="Mentor Profile">
      <div className="h-full flex items-center justify-center border-black border p-14">
        <div className="w-full h-full">
          <div className="flex flex-col  text-center  ">
            <h1 className="text-xl font-bold underline mb-4">Mentor Profile</h1>
            <div className="flex justify-between">
              <div className="w-1/2 flex flex-col text-left">
                <h1 className="text-xl font-bold mb-4">Mentor Details</h1>
                <h1>Name:{mentor.name}</h1>
                <h2>Organisation:{mentor.organisation}</h2>
                <h2>Years of Experience: {mentor.experience}</h2>
                <h2>Designation{mentor.designation}</h2>
                <p>Skills : {mentor.skills}</p>
              </div>
              <div className="w-1/2 ml-4">
                <h1 className="text-xl font-bold  mb-4">Courses</h1>
                {courses.map((c) => (
                  <div
                    key={c._id}
                    className="border-black border-2 m-4 space-y-2 text-left p-2"
                  >
                    <h1>Name of Plan: {c.courseName}</h1>
                    <p>Description: {c.description}</p> <p>Cost: {c.cost}</p>
                    <p>Calls per month: {c.calls}</p>
                    {auth.token ? (
                      <div className="mt-2 payment">
                        {!clientToken ? (
                          ""
                        ) : (
                          <>
                            <DropIn
                              options={{
                                authorization: clientToken,
                              }}
                              onInstance={(instance) => setInstance(instance)}
                            />

                            <button
                              className="btn btn-primary"
                              onClick={() => handlePayment(c.cost, c.mentor)}
                              disabled={
                                loading || !instance || !auth?.user?.address
                              }
                            >
                              {loading ? "Processing ...." : "Make Payment"}
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <button
                        className="border p-2 rounded-lg bg-purple text-white"
                        onClick={
                          () => navigate("/login")
                          // , {
                          //   state: "/",
                          // })
                        }
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
