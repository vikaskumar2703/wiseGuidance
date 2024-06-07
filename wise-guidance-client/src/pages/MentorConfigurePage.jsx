import { useState } from "react";
import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MentorMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MentorConfigurePage() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.user.email);
  const [organisation, setOrganisation] = useState(auth.user.organisation);
  const [skills, setSkills] = useState(auth.user.skills);
  const [designation, setDesignation] = useState(auth.user.designation);
  const [description, setDescription] = useState(auth.user.description);
  const [experience, setExperience] = useState(auth.user.experience);
  const [skill, setSkill] = useState("");
  const [domain, setDomain] = useState(auth.user.domain);
  const [name, setName] = useState(auth.user.name);
  const [phone, setPhone] = useState(auth.user.phone);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentor/update-profile/${auth.user._id}`,
        {
          name,
          email,
          phone,
          domain,
          description,
          organisation,
          skills,
          designation,
          experience,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.mentor,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: res.data.mentor,
          })
        );

        navigate(-1);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Mentor Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center ">
          <MentorMenu />
        </div>
        <div className="col-span-3 bg-lpurple  text-start px-16 py-8 flex flex-col items-start space-y-8   ">
          <div className="auth-form-container  flex flex-col justify-around   space-y-6 ">
            <h1 className=" text-3xl font-bold">Update Profile</h1>
            <form
              className="register-form flex flex-col font-semibold space-y-4 items-start"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name" className="">
                Name :{" "}
                <input
                  value={name}
                  className="border p-1 rounded-md "
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  name="name"
                ></input>
              </label>
              <label htmlFor="email" className="">
                Email :{" "}
                <input
                  value={email}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                ></input>
              </label>
              <label htmlFor="phone">
                Phone No. :{" "}
                <input
                  value={phone}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  id="phone"
                  name="phone"
                ></input>
              </label>
              <label>
                Skills :{" "}
                {skills.map((s, index) => (
                  <span
                    key={index}
                    className="border border-black bg-white w-fit  px-2 text-sm p-1 rounded-3xl mx-2"
                  >
                    {s}
                  </span>
                ))}
              </label>
              <label>
                Add Skills :{" "}
                <input
                  value={skill}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setSkill(e.target.value);
                  }}
                  id="Skills"
                  name="Skills"
                ></input>{" "}
                <button
                  className="border w-fit bg-purple px-2 p-1 rounded-xl text-white mt-1"
                  onClick={() => {
                    setSkill("");
                    setSkills([...skills, skill]);
                  }}
                >
                  Add
                </button>
              </label>
              <label htmlFor="Designation" className="mt-3">
                Current Designation :{" "}
                <input
                  value={designation}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                  id="Designation"
                  name="Designation"
                ></input>
              </label>
              <label htmlFor="Description" className="mt-3 flex">
                Bio :{" "}
                <textarea
                  value={description}
                  className="border-gray-300 p-1 rounded-md"
                  cols={50}
                  rows={5}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id="Description"
                  name="Description"
                ></textarea>
              </label>{" "}
              <label htmlFor="Organisation" className="mt-3">
                Organisation :{" "}
                <input
                  value={organisation}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setOrganisation(e.target.value);
                  }}
                  id="Organisation"
                  name="Organisation"
                ></input>
              </label>
              <label htmlFor="Domain" className="mt-3">
                Domain :{" "}
                <input
                  value={domain}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setDomain(e.target.value);
                  }}
                  id="Domain"
                  name="Domain"
                ></input>
              </label>
              <label htmlFor="Experience" className="mt-3">
                Experience :{" "}
                <input
                  value={experience}
                  className="border p-1 rounded-md"
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  id="Experience"
                  name="Experience"
                ></input>
              </label>
              <br></br>
              <button
                type="submit"
                className=" bg-purple px-3 py-2 rounded-3xl text-white"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
