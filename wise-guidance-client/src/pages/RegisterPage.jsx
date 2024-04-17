import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /*Add condition on successful register*/

    console.log(email);
  };
  return (
    <Layout title="Register">
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 w-1/3 min-h-96">
        <h1 className="text-center font-bold">Register as a mentee</h1>
        <form
          className="register-form flex flex-col space-y-4 my-3"
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
            value={pass}
            className="border"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="*******"
          ></input>
          <button type="submit" className="border bg-blue-600 text-white">
            Register
          </button>
        </form>
        <button className="link-btn underline text-sm">
          <NavLink to="/login">Already have an account? Login Here</NavLink>
        </button>
      </div>
    </Layout>
  );
}
