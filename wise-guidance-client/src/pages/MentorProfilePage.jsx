import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/authContext";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { createCourseController } from "../../../wise-guidance-server/controllers/mentorController";
import { Tabs } from "flowbite-react";
import photo from "../assets/photo.png";

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
      <div className="h-screen grid grid-cols-3 p-20 gap-8 ">
        <div className="mentorCard  col-span-2 border rounded-xl relative ">
          <div className="gradient bg-gradient-to-r from-[#D3BAF4] to-[#FFD9F3] h-1/3 rounded-t-xl"></div>

          <div className="flex flex-col  absolute top-[100px] left-14 space-y-4">
            <img src={photo} className="h-40 w-36 "></img>
            <h1 className="text-xl font-bold mb-4">{mentor.name}</h1>
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
        <div className=" border-black border h-fit p-6">
          <h1 className="text-xl font-bold mb-4 text-center">
            Mentorship Plans
          </h1>
          <Tabs aria-label="Default tabs" style="fullWidth" className="border">
            {courses.map((c) => (
              <Tabs.Item
                active
                title={c.courseName}
                key={c._id}
                onFocus="border-black"
              >
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
              </Tabs.Item>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
