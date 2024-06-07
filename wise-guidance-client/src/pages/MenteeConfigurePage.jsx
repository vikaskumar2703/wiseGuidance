import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function MenteeConfigurePage() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.user.email);
  const [name, setName] = useState(auth.user.name);
  const [address, setAddress] = useState(auth.user.address);
  const [phone, setPhone] = useState(auth.user.phone);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        ` ${
          import.meta.env.VITE_REACT_APP_API
        }/api/mentorship/mentee/update-profile/${auth.user._id}`,
        {
          name,
          email,
          phone,
          address,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.mentee,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: res.data.mentee,
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
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 bg-lpurple text-center px-16 py-8 flex flex-col items-start space-y-6 ">
          <h1 className="font-bold text-3xl">Update your profile</h1>
          <form
            className="register-form flex flex-col font-semibold space-y-6 items-start"
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
            <label htmlFor="address" className="flex gap-2">
              Address :{" "}
              <textarea
                value={address}
                className="border-gray-300 border-1 p-1  rounded-md"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                id="address"
                name="address"
              ></textarea>
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
    </Layout>
  );
}
