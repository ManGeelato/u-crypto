import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../context/AuthenticationContext";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <h2 className="text-2xl">U-CRYPTO</h2>
      <div className="hidden md:block">
        <ToggleTheme />
      </div>
      {user?.email ? (
        <div>
          <Link to="/" className="p-4 hover:text-accent">
            Home
          </Link>
          <Link to="/account" className="p-4 hover:text-accent">My Account</Link>
          <button onClick={handleSignOut} className="p-4 hover:text-accent font-bold">Sign Out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/" className="p-4 hover:text-accent">
            Home
          </Link>
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      <div
        onClick={handleNavbar}
        className="block md:hidden cursor-pointer z-10"
      >
        {navbar ? <AiOutlineMenu size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          navbar
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNavbar} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNavbar} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ToggleTheme />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button onClick={handleNavbar} className="w-full my-2 p-3 bg-primary border border-secondary rounded-2xl shadow-xl">
              Sign In
            </button>
          </Link>
          <Link onClick={handleNavbar} to="/signup">
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
