import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { createCourseController } from "../../../wise-guidance-server/controllers/mentorController";
import { Tabs } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import photo from "../assets/photo.png";
import review from "../assets/review.png";

const customTheme = {
  button: {
    styles: {
      fullWidth: {
        base: "ml-0 flex w-full rounded-none first:ml-0",
        active: {
          on: "active rounded-none bg-black  text-gray-900 dark:bg-gray-700 dark:text-white",
          off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
        },
      },
    },
  },
};

export default function MentorProfilePage() {
  const params = useParams();
  const [mentor, setMentor] = useState({});
  const [courses, setCourses] = useState([]);
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (auth.token) getToken();
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
      <div className=" grid grid-cols-3 p-20 gap-12  bg-lpink ">
        <div className="mentorCard  col-span-2  bg-white border rounded-xl min-h-[80vh] relative ">
          <div className="gradient bg-gradient-to-r from-[#D3BAF4] to-[#FFD9F3] h-1/3 rounded-t-xl"></div>

          <div className="flex flex-col  absolute top-[100px] left-14  space-y-4">
            <img src={photo} className="h-40 w-36 "></img>
            <h1 className="text-xl font-bold mb-4  ">{mentor.name}</h1>
            <p className="font-semibold">
              {mentor.designation} at {mentor.organisation}
            </p>
            <p className="text-sm  ">{mentor.description}</p>

            {/* <p>
           
              Skills :
              {mentor
                ? mentor.skills.map((s, index) => (
                    <span
                      key={index}
                      className="border border-black px-2 text-sm p-1 rounded-3xl mx-2"
                    >
                      {s}
                    </span>
                  ))
                : ""}
            </p> */}
            <p>{mentor.experience} years of experience</p>
          </div>
        </div>
        <div className=" courseCard border rounded-2xl box-border  h-fit bg-white">
          <h1 className="text-xl  py-6 font-bold mb-4 text-center rounded-t-2xl border-b border">
            Mentorship Plans
          </h1>
          <div className="p-8">
            <Tabs aria-label="Default tabs" style="fullWidth" className="">
              {courses.map((c) => (
                <Tabs.Item active title={c.courseName} key={c._id}>
                  <div className="text-sm space-y-4 mt-4 flex flex-col">
                    <p>Description: {c.description}</p>{" "}
                    <p>Calls per month: {c.calls}</p>
                    <p>Duration : {c.duration}</p>
                    <p>Cost: {c.cost}</p>
                    {auth.token ? (
                      <div className="mt-2 payment">
                        {!clientToken ? (
                          ""
                        ) : (
                          <>
                            <DropIn
                              options={{
                                authorization: clientToken,
                                paypal: {
                                  flow: "vault",
                                },
                              }}
                              onInstance={(instance) => setInstance(instance)}
                            />

                            <button
                              className="border p-2 rounded-lg bg-purple text-white"
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
                </Tabs.Item>
              ))}
            </Tabs>
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-2xl space-y-4  px-14 py-6">
          <h1 className="text-xl   font-bold  rounded-t-2xl ">Reviews</h1>
          <img src={review} />
          <p>
            I'm a math teacher, that wanted to switch to Data Science. Anastasia
            took the time to understand mybackground and what kind of jobs I was
            interested in. She didn't just focus on getting me any job; she
            helped me figure out where I wanted to go in the world of data
            science. Our talks were really helpful. We discussed my skills, what
            I liked, and what I didn't and through these talks and some
            exercises, I
          </p>
        </div>
      </div>
    </Layout>
  );
}
