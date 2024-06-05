import Layout from "../components/layout/Layout";
import { MenteeMenu } from "../components/layout/MenteeMenu";
import { useState } from "react";
import useAuth from "../contexts/authContext";

export default function MenteeConfigurePage() {
  const [email, setEmail] = useState(auth.user.email);
  const [name, setName] = useState(auth.user.name);
  const [address, setAddress] = useState(auth.user.address);
  const [phone, setPhone] = useState(auth.user.phone);
  const auth = useAuth();

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
    <Layout title=" Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <MenteeMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <h1 className="font-bold text-xl">Update your profile</h1>
        </div>
      </div>
    </Layout>
  );
}
