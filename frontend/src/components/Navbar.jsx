import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { authContext } from "../context/authContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useContext(authContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-20 px-4 shadow flex justify-between items-center">
      <Link to="/" className="text-4xl font-bold">
        Bookstore
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/user">
            <p className="text-gray-500 font-semibold">{user.email}</p>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white px-3 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="flex items-center gap-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
