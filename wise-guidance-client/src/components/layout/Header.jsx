import { NavLink } from "react-router-dom";
import logo from "./logo.png";
export default function Header() {
  return (
    <header className="w-full flex justify-between py-7 px-8">
      <div>
        <NavLink to="/">
          <img className="max-h-10" src={logo} />
        </NavLink>
      </div>

      <div className="navlinks">
        <ul className="flex items-center  space-x-10 font-sans">
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/resource">Resources</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blogs</NavLink>
          </li>
          <li className="px-4 py-2 bg-purple rounded-xl ">
            <NavLink to="/browse-mentors" className="text-white font-bold">
              Mentors
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

// add search functionality or atleast get a understanding
