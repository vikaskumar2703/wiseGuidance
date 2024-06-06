import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { MentorMenu } from "../components/layout/MenteeMenu";
import useAuth from "../contexts/authContext";
import axios from "axios";
import girl from "../assets/girl.png";
import { useNavigate } from "react-router-dom";

export default function MenteeDashboardPage() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.user.email);
  const [name, setName] = useState(auth.user.name);
  const [address, setAddress] = useState(auth.user.address);
  const [phone, setPhone] = useState(auth.user.phone);
  const navigate = useNavigate();

  return (
    <Layout title="Mentor Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center ">
          <MentorMenu />
        </div>
        <div className="col-span-3 bg-lpurple  text-center p-10 flex flex-col items-start space-y-8   ">
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
    </Layout>
  );
}
