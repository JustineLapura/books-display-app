import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);

  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] h-[350px] flex flex-col space-y-4 border-2 border-gray-500 rounded p-5"
      >
        <h1 className="text-center font-bold">Signup</h1>
        <label>Email:</label>
        <input
          className="border border-gray-600 ps-2 py-1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          className="border border-gray-600 ps-2 py-1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />
        <button disabled={isLoading} className={isLoading ? "bg-gray-600 text-white py-1 mt-4" : "bg-blue-500 text-white py-1 mt-4"}>Signup</button>
        {error && <p className="text-red-500 font-semibold text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
