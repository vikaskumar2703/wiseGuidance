import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faWrench } from "@fortawesome/free-solid-svg-icons";

export const MenteeMenu = () => {
  return (
    <div className="my-4">
      <div className="mentee-links flex flex-col ">
        <NavLink
          className=" flex p-5  hover:bg-lpurple "
          to="/dashboard/mentee"
        >
          <span className="mr-5">
            <FontAwesomeIcon icon={faUser} />
          </span>
          Profile
        </NavLink>
        <NavLink
          className=" flex p-5 hover:bg-lpurple "
          to="/dashboard/mentee/mentorship/"
        >
          <span className="mr-4">
            <FontAwesomeIcon icon={faHouse} />
          </span>
          Mentorship
        </NavLink>
        <NavLink
          className=" flex p-5 hover:bg-lpurple "
          to="/dashboard/mentee/update-profile/"
        >
          <span className="mr-4">
            <FontAwesomeIcon icon={faWrench} />
          </span>
          Configure{" "}
        </NavLink>
      </div>
    </div>
  );
};
