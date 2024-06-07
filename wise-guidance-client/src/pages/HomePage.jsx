import Layout from "../components/layout/Layout";
import heroImg from "../assets/heroImg.png";
import features from "../assets/features.png";
import BubbleBg from "../assets/BubbleBg.svg";
import Group from "../assets/Group.png";
import SearchInput from "../components/SearchInput";

export default function HomePage() {
  return (
    <Layout title="Ecommerce Site">
      <div className="">
        <div className="heading h-3/4  flex flex-col justify-end">
          <div className=" m-32 mb-0 flex-grow flex">
            <div className=" w-[52%] h-full pl-2 space-y-10 ">
              <h1 className="text-5xl font-bold line leading-tight">
                Empowering college success through peer mentorship
              </h1>
              <h3>
                Learn a new skill, launch a project, land your dream career.
              </h3>
              <SearchInput />
            </div>
            <div className="  h-full w-[48%] py-6 image-container">
              <img src={heroImg} className="w-full "></img>
            </div>
          </div>
        </div>
        <div className="flex justify-center align-center h-1/4 items-center">
          <div className="flex text-base items-baseline space-x-5 m-16">
            <p>Find top mentors in:</p>
            <div className="domain border-black border rounded-2xl py-1 px-2">
              Web Development
            </div>
            <div className="domain border-black border rounded-2xl py-1 px-2">
              Data Science
            </div>
            <div className="domain border-black border rounded-2xl py-1 px-2">
              App Development
            </div>
            <div className="domain border-black border rounded-2xl py-1 px-2">
              FAANG
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen p-5 my-16 ">
        <img src={features} className=""></img>
      </div>
      <div className="h-screen my-32 ">
        {" "}
        <div
          className="h-full p-16 bg-center flex flex-col justify-around items-center"
          style={{
            backgroundImage: `url(${BubbleBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "70%",
          }}
        >
          {" "}
          <h1 className="text-left w-2/3 font-bold text-4xl">
            Mentees Absolutely<br></br> Love Our Mentors
          </h1>
          <img src={Group} className="h-2/3"></img>
        </div>
      </div>
    </Layout>
  );
}
