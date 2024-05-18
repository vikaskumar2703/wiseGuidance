import Footer from "../components/layout/Footer";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../contexts/authContext";
import logo from "../assets/logo2.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentee");
  useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/${userType}-login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(
          location.state || userType === "mentor"
            ? "/courses"
            : "/browse-mentors"
        );
        console.log(userType, "login successfull");
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
            {" "}
            <img className="" src={logo}></img>{" "}
          </NavLink>
          <div className="text-white text-xl font-semibold">
            wise<br></br> Guidance
          </div>
        </div>
      </div>
      <div className="right h-full  w-2/3 flex justify-center items-center ">
        {" "}
        <div className="auth-form-container  flex flex-col space-y-6 p-8 max-w-1/3 h-fit min-h-96">
          <h1 className=" text-3xl font-bold">Log in</h1>
          <div className="flex selector justify-around border-collapse box-border border-b-2 text-sm">
            <button
              className={`w-1/2 p-4  ${
                userType == "mentee" ? "border-purple border-b-4" : ""
              }`}
              onClick={() => {
                setUserType("mentee");
              }}
            >
              I 'm a Mentee
            </button>
            <button
              className={`w-1/2 p-4 ${
                userType != "mentee" ? "border-purple border-b-4" : ""
              }`}
              onClick={() => {
                setUserType("mentor");
              }}
            >
              I 'm a Mentor
            </button>
          </div>
          <form
            className="login-form flex flex-col space-y-1 font-semibold"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              className="border p-1 rounded-md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              name="email"
            ></input>
            <br></br>
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              className="border-gray-200 p-1 rounded-md"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
            ></input>
            <br></br>
            <button
              type="submit"
              className="border bg-purple p-3 rounded-xl text-white"
            >
              Log In
            </button>
          </form>
          <div className="flex justify-center flex-col">
            <button className="link-btn mt-4 underline text-sm">
              <NavLink to="/register">
                Don't have an account ? Register Here as a Mentee
              </NavLink>
            </button>
            <p className="w-full text-center">or</p>
            <button className="link-btn  text-sm underline">
              <NavLink to="/mentor-apply">Apply to be a Mentor</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
