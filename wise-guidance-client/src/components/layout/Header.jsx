import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../contexts/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Dropdown, DropdownItem, theme } from "flowbite-react";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    // <Flowbite theme={{ theme: customTheme }}>
    <header className="w-full  flex justify-between py-7 px-8 sticky z-10 top-0 drop-shadow-sm bg-white rounded-xl ">
      <div>
        <NavLink to="/">
          <img className="max-h-10" src={logo} />
        </NavLink>
      </div>

      <div className="navlinks">
        <ul className="flex items-center  space-x-10 font-sans font-bold">
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/resources">Resources</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li className="px-4 py-2 bg-purple rounded-xl ">
            <NavLink to="/browse-mentors" className="text-white font-bold">
              Mentors
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          ) : (
            <div className="border border-black rounded-xl">
              <Dropdown
                label={auth?.user?.name}
                dismissOnClick={false}
                color="primary"
                className="rounded-xl"
              >
                <DropdownItem>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : auth.user.userType
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink onClick={handleLogout} to="/login">
                    Logout
                  </NavLink>
                </DropdownItem>
              </Dropdown>
            </div>
          )}
        </ul>
      </div>
    </header>
    // </Flowbite>
  );
}

// add search functionality or atleast get a understanding
