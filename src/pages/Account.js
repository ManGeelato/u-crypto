import React from "react";
import MyCoins from "../components/MyCoins";
import { UserAuth } from "../context/AuthenticationContext";
import { Navigate, useNavigate } from "react-router-dom";

function Account() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if(user){
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">My Crypto Account</h1>
            <div>
              <p>Welcome: {user?.email}</p>
            </div>
          </div>
          <div>
            <button onClick={handleSignOut} className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl">
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px]">
            <h1 className="text-2xl font-bold py-4">My Coins</h1>
            <MyCoins />
          </div>
        </div>
      </div>
    );

  } else{
    return <Navigate to="/signin" />
  }
}

export default Account;
