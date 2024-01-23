import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const EditProfile = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useContext(authContext);
  console.log(user);
  console.log(userProfile);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/user/${user._id}`
        );
        const json = await response.json();

        if (response.ok) {
          console.log("user from backend: ", json);
          setUserProfile(json);
        } else {
          console.error("Failed to fetch user:", json.error);
          setError(json.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl font-bold my-6 text-center">
        Update User Profile
      </h1>

      {!userProfile ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-[500px] mx-auto  border-2 border-sky-400 rounded-lg p-4 space-y-2">
          <div className="">
            <h3 className="text-gray-500">Title:</h3>
            <input
              className="w-full border-2 border-gray-700 ps-2 py-1 rounded-lg"
              type="text"
              name="email"
              onChange={handleChange}
              value={userProfile.email}
            />
          </div>
          <div className="">
            <h3 className="text-gray-500">Author:</h3>
            <input
              className="w-full border-2 border-gray-700 ps-2 py-1 rounded-lg"
              type="password"
              name="password"
              onChange={handleChange}
              value={userProfile.password}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              // onClick={handleUpdate}
              className="border bg-blue-500 text-white rounded-lg px-3 py-1"
            >
              Save
            </button>
          </div>
          {error && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
