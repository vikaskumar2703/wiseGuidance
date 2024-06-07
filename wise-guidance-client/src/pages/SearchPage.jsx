import React from "react";
import Layout from "../components/layout/Layout";
import useSearch from "../contexts/searchContext";
import photo from "../assets/photo.png";

const SearchPage = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className=" bg-lpurple min-h-screen   ">
        <div className="text-center font-semibold pt-8">
          <h1>Search Resuts</h1>
          <h6>
            {values.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            <div className="flex justify-center flex-col items-center space-y-10">
              {values?.results.map((m) => (
                <div
                  className="border border-black w-3/4 space-x-5 p-6 rounded-xl bg-white space-y-2 grid grid-cols-4"
                  key={m._id}
                >
                  <div className="mr-10  ">
                    <img src={photo} className="min-h-72 min-w-36"></img>
                  </div>
                  <div className="space-y-2 flex col-span-3 flex-col items-start justify-between">
                    <h1 className="font-bold text-2xl">{m.name}</h1>
                    <p className="font-semibold">
                      {m.designation} at {m.organisation}
                    </p>{" "}
                    <p className="font-semibold">Domain : {m.domain}</p>
                    <p className="text-sm  ">{m.description}</p>
                    <p>
                      {" "}
                      Skills :{" "}
                      {m
                        ? m.skills.map((s, index) => (
                            <span
                              key={index}
                              className="border border-black px-2 text-sm p-1 rounded-3xl mx-2"
                            >
                              {s}
                            </span>
                          ))
                        : ""}
                    </p>
                    <p>{m.experience} years of experience</p>
                    <button
                      onClick={() => {
                        navigate(`${m.slug}`);
                      }}
                      className="bg-purple p-2 font-bold text-white border-black rounded-lg w-2/3"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
