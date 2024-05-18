import { NavLink } from "react-router-dom";

export const MentorMenu = () => {
  return (
    <div>
      <h1 className="m-10 font-bold rounded-md p-5 bg-[#0E7490] text-white">
        <NavLink to="/dashboard/mentor">Workspace</NavLink>
      </h1>
      <div className="admin-links flex flex-col m-10">
        <NavLink
          className="p-3 border border-collapse font-semibold  hover:bg-gray-300 "
          to="/dashboard/mentor/mentorship/"
        >
          Mentorship
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold  hover:bg-gray-300 "
          to="/dashboard/mentor/update-profile/"
        >
          Configure{" "}
        </NavLink>
      </div>
    </div>
  );
};
