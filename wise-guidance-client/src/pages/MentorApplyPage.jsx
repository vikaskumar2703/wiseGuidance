import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MentorApplicationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [skills, setSkills] = useState([]);
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");

  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [domain, setDomain] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/mentor-register`,
        {
          name,
          email,
          password,
          phone,
          domain,
          answer,
          description,
          organisation,
          skills,
          designation,
          experience,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register">
      <div className="flex justify-center my-2 mb-12">
        <div className="auth-form-container flex flex-col space-y-6 p-8 w-1/3 ">
          <h1 className="text-left text-3xl font-bold ">Register</h1>
          <form
            className="register-form flex flex-col font-semibold"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Name</label>
            <input
              value={name}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              name="name"
            ></input>
            <label htmlFor="email" className="mt-3">
              Email
            </label>
            <input
              value={email}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              name="email"
            ></input>
            <label htmlFor="password" className="mt-3">
              Password
            </label>
            <input
              value={password}
              className="border-gray-200 p-1 rounded-md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
            ></input>
            <label htmlFor="phone" className="mt-3">
              Phone No.
            </label>
            <input
              value={phone}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              id="phone"
              name="phone"
            ></input>

            <label htmlFor="Organisation" className="mt-3">
              Organisation
            </label>
            <input
              value={organisation}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setOrganisation(e.target.value);
              }}
              id="Organisation"
              name="Organisation"
            ></input>
            <label htmlFor="Domain" className="mt-3">
              Domain
            </label>
            <input
              value={domain}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setDomain(e.target.value);
              }}
              id="Domain"
              name="Domain"
            ></input>
            <label htmlFor="Designation" className="mt-3">
              Designation
            </label>
            <input
              value={designation}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
              id="Designation"
              name="Designation"
            ></input>
            <label htmlFor="Description" className="mt-3">
              Tell us about yourself, interests
            </label>
            <textarea
              value={description}
              rows={4}
              className="border-gray-200 p-1 rounded-md"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="Description"
              name="Description"
            ></textarea>
            <label htmlFor="Experience" className="mt-3">
              Experience
            </label>
            <input
              value={experience}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              id="Experience"
              name="Experience"
            ></input>
            <label htmlFor="Skills" className="mt-3">
              Skills
            </label>

            <input
              value={skill}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setSkill(e.target.value);
              }}
              id="Skills"
              name="Skills"
            ></input>
            <button
              className="border w-fit bg-purple px-2 p-1 rounded-md text-white mt-1"
              onClick={() => {
                setSkill("");
                setSkills([...skills, skill]);
              }}
            >
              Add
            </button>
            <pre>{skills}</pre>
            <label htmlFor="answer" className="mt-3">
              What is your favourite sport?{" "}
            </label>
            <input
              value={answer}
              className="border"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              id="answer"
              name="answer"
            ></input>
            <br></br>
            <button
              type="submit"
              className="border bg-purple p-3 rounded-xl text-white"
            >
              Apply as Mentor
            </button>
          </form>

          <button className="link-btn underline text-center text-sm">
            <NavLink to="/login"> Already have an account? Login Here</NavLink>
          </button>
        </div>
      </div>
    </Layout>
  );
}
