import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useSearch from "../contexts/searchContext";

export default function SearchInput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/mentorship/mentor/search/${
          values.keyword
        }`
      );
      if (data.success) {
        setValues({ ...values, results: data.results });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-11 w-2/3 text-xs bg-white border-2 rounded-xl px-2 flex justify-between items-center">
      <input
        placeholder="Search by domain skills or role"
        className="h-full rounded-xl w-2/3 focus:outline-none"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      ></input>
      <button
        className="bg-purple text-white px-4  rounded-lg py-1 "
        onClick={handleSearch}
      >
        Find Mentors
      </button>
    </div>
  );
}
