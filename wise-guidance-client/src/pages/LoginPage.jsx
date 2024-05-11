import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../contexts/authContext";

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
    <Layout title="Login">
      <div className="w-full h-full flex justify-center items-center">
        <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 max-w-1/3 h-fit min-h-96">
          <h1 className="text-center font-bold">Login</h1>
          <div className="flex justify-around p-3">
            <button
              className={`w-1/2  ${
                userType == "mentee" ? "border-purple border-b-4" : ""
              }`}
              onClick={() => {
                setUserType("mentee");
              }}
            >
              Mentee
            </button>
            <button
              className={`w-1/2  ${
                userType != "mentee" ? "border-purple border-b-4" : ""
              }`}
              onClick={() => {
                setUserType("mentor");
              }}
            >
              Mentor
            </button>
          </div>
          <form
            className="login-form flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              className="border"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              name="email"
              placeholder="youremail@gmail.com"
            ></input>
            <label htmlFor="password">Password</label>
            <input
              className="border"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="*******"
            ></input>
            <button type="submit" className="border bg-blue-600 text-white">
              Log In
            </button>
          </form>
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
    </Layout>
  );
}
