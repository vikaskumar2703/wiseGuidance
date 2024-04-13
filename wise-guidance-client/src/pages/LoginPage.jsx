import Layout from "../components/layout/Layout";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  };
  return (
    <Layout title="Login">
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 w-1/3 max-h-96">
        <h1 className="text-center font-bold">Login</h1>
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
        <button className="link-btn mt-4 underline">
          Don't have an account ? Register Here
        </button>
      </div>{" "}
    </Layout>
  );
}
