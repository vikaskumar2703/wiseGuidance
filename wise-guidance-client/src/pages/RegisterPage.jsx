import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo2.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        ` ${import.meta.env.VITE_REACT_APP_API}/api/auth/mentee-register`,
        {
          name,
          email,
          pass,
          phone,
          address,
          answer,
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
    <div className="w-full h-screen flex ">
      <div className="left h-full w-1/3 bg-purple opacity-90 flex justify-center">
        <div className="logo flex items-center">
          <NavLink to="/">
            <img className="" src={logo}></img>
          </NavLink>
          <div className="text-white text-xl font-semibold">
            wise<br></br> Guidance
          </div>
        </div>{" "}
      </div>
      <div className="right h-full  w-2/3 flex-col space-y-6  flex justify-center items-center ">
        {" "}
        <div className="auth-form-container  flex flex-col justify-around  w-1/3 space-y-6 ">
          <h1 className=" text-3xl font-bold">Register</h1>
          <form
            className="register-form flex flex-col font-semibold space-y-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              value={name}
              className="border p-1 rounded-md text-gray-200"
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              name="name"
            ></input>

            <label htmlFor="email" className="">
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

            <label htmlFor="password">Password</label>
            <input
              value={pass}
              className="border-gray-200 p-1 rounded-md"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
            ></input>

            <label htmlFor="phone">Phone No.</label>
            <input
              value={phone}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              id="phone"
              name="phone"
            ></input>

            <label htmlFor="address">Address</label>
            <input
              value={address}
              className="border p-1 rounded-md"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              id="address"
              name="address"
            ></input>

            <label htmlFor="answer">What is your favourite sport? </label>
            <input
              value={answer}
              className="border p-1 rounded-md"
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
              Register
            </button>
          </form>
          <NavLink to="/login">
            <button className="link-btn underline w-full text-sm text-center">
              Already have an account? Login Here
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
