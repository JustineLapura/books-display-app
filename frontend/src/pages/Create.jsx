import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { authContext } from "../context/authContext";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(authContext);

  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();
    const book = { title, author, publishYear };

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    const response = await fetch("http://localhost:4000/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      enqueueSnackbar("Error", { variant: "error" });
    }

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setPublishYear("");
      setError(null);
      enqueueSnackbar("Book Created Successfuly", { variant: "success" });

      //   navigate to / path
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen p-4">
      <BackButton />

      <h1 className="text-3xl font-bold my-6 text-center">Create new Book</h1>
      <div className="w-full max-w-[500px] mx-auto  border-2 border-sky-400 rounded-lg p-4 space-y-2">
        <div className="">
          <h3 className="text-gray-500">Title:</h3>
          <input
            className={
              emptyFields.includes("title")
                ? "w-full border-2 border-red-500 ps-2 py-1 rounded-lg"
                : "w-full border-2 border-gray-700 ps-2 py-1 rounded-lg"
            }
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="">
          <h3 className="text-gray-500">Author:</h3>
          <input
            className={
              emptyFields.includes("author")
                ? "w-full border-2 border-red-500 ps-2 py-1 rounded-lg"
                : "w-full border-2 border-gray-700 ps-2 py-1 rounded-lg"
            }
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div className="">
          <h3 className="text-gray-500">publishYear:</h3>
          <input
            className={
              emptyFields.includes("publishYear")
                ? "w-full border-2 border-red-500 ps-2 py-1 rounded-lg"
                : "w-full border-2 border-gray-700 ps-2 py-1 rounded-lg"
            }
            type="number"
            onChange={(e) => setPublishYear(e.target.value)}
            value={publishYear}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleAddBook}
            className="border bg-blue-500 text-white rounded-lg px-3 py-1"
          >
            Save
          </button>
        </div>
        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Create;
