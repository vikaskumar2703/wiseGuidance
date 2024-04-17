import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  };
  return (
    <Layout title="Login">
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 max-w-1/3 min-h-96">
        <h1 className="text-center font-bold">Login</h1>
        <div className="flex justify-around p-3">
          <button
            className="w-1/2  focus:border-purple focus:border-b-4"
            onClick={() => {
              setRole(0);
              console.log(role);
            }}
          >
            Mentee
          </button>
          <button
            className=" w-1/2 focus:border-purple focus:border-b-4"
            onClick={() => {
              setRole(1);
              console.log(role);
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
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
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
          Apply to be a Mentor
        </button>
      </div>{" "}
    </Layout>
  );
}
