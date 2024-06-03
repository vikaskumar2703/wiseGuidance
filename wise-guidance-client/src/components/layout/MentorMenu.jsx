import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faWallet,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

export const MentorMenu = () => {
  return (
    <div className="my-4">
      <div className="admin-links flex flex-col">
        <NavLink
          className=" flex p-5  hover:bg-lpurple "
          to="/dashboard/mentor"
        >
          <span className="mr-5">
            <FontAwesomeIcon icon={faUser} />
          </span>
          Profile
        </NavLink>

        <NavLink
          className=" flex p-5 hover:bg-lpurple "
          to="/dashboard/mentor/mentorship/"
        >
          <span className="mr-4">
            <FontAwesomeIcon icon={faHouse} />
          </span>
          Mentorship
        </NavLink>
        <NavLink
          className="flex p-5 hover:bg-lpurple "
          to="/dashboard/mentor/payout/"
        >
          <span className="mr-4">
            <FontAwesomeIcon icon={faWallet} />
          </span>
          Payout{" "}
        </NavLink>
        <NavLink
          className=" flex p-5 hover:bg-lpurple "
          to="/dashboard/mentor/update-profile/"
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
