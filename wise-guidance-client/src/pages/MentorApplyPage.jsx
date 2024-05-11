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
  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [domain, setDomain] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/mentor-register",
        {
          name,
          email,
          password,
          phone,
          domain,
          answer,
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
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 w-1/3 ">
        <h1 className="text-center font-bold">Register</h1>
        <form
          className="register-form flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            value={name}
            className="border"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            name="name"
            placeholder="Full Name"
          ></input>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            className="border"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
            placeholder="youremail@gmail.com"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            className="border"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="*******"
          ></input>
          <label htmlFor="phone">Phone No.</label>
          <input
            value={phone}
            className="border"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="phone"
            name="phone"
            placeholder="Phone no."
          ></input>

          <label htmlFor="Organisation">Organisation</label>
          <input
            value={organisation}
            className="border"
            onChange={(e) => {
              setOrganisation(e.target.value);
            }}
            id="Organisation"
            name="Organisation"
            placeholder="Name of your Organisation"
          ></input>
          <label htmlFor="Domain">Domain</label>
          <input
            value={domain}
            className="border"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
            id="Domain"
            name="Domain"
            placeholder="Name of your Domain"
          ></input>
          <label htmlFor="Designation">Designation</label>
          <input
            value={designation}
            className="border"
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
            id="Designation"
            name="Designation"
            placeholder="Full Designation"
          ></input>
          <label htmlFor="Experience">Experience</label>
          <input
            value={experience}
            className="border"
            onChange={(e) => {
              setExperience(e.target.value);
            }}
            id="Experience"
            name="Experience"
            placeholder="Full Experience"
          ></input>
          <label htmlFor="Skills">Skills</label>

          <input
            value={skill}
            className="border"
            onChange={(e) => {
              setSkill(e.target.value);
            }}
            id="Skills"
            name="Skills"
            placeholder="Full Skills"
          ></input>
          <button
            className="border w-fit bg-blue-600 text-white"
            onClick={() => {
              setSkill("");
              setSkills([...skills, skill]);
            }}
          >
            Add
          </button>
          <pre>{skills}</pre>
          <label htmlFor="answer">What is your favourite sport? </label>
          <input
            value={answer}
            className="border"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            id="answer"
            name="answer"
            placeholder="mention your favourite sport"
          ></input>
          <button type="submit" className="border bg-blue-600 text-white">
            Register
          </button>
        </form>
        <NavLink to="/login">
          <button className="link-btn underline">
            Already have an account? Login Here
          </button>
        </NavLink>
      </div>
    </Layout>
  );
}
