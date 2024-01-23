import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] h-[350px] flex flex-col space-y-4 border-2 border-gray-500 rounded-lg p-5"
      >
        <h1 className="text-center font-bold">Login</h1>
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
        <button
          disabled={isLoading}
          className="bg-blue-500 text-white py-1 mt-4"
        >
          Login
        </button>
        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
