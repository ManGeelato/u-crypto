/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import {UserAuth } from "../context/AuthenticationContext";
import toast from 'react-hot-toast';

function SignIn() {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const notify = () => toast("Signed in successfully", {
    style: {
      background: '#81E6BF',
    }
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="my-4">
            <label>Email: </label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="email"
                placeholder="Enter email address"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-blue-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password: </label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
                placeholder="Enter password"
              />
              <AiFillLock className="absolute right-2 top-3 text-blue-400" />
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Submit
          </button>
        </form>
        <p className="my-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
