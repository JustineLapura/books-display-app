import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { authContext } from "../context/authContext";

const Edit = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(authContext);

  const navigate = useNavigate();
  console.log(emptyFields);
  console.log(book);
  console.log(id);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          console.log("book from backend: ", json);
          setBook(json);
        } else {
          console.error("Failed to fetch book:", json.error);
          setError(json.error);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    if (user) {
      fetchWorkout();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(book),
      });

      const json = await response.json();

      if (response.ok) {
        enqueueSnackbar("Book Updated Successfuly", { variant: "success" });
        setError(null);
        navigate("/");
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
    } catch (error) {
      setError("Error updating book: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="w-full min-h-screen p-4">
      <BackButton />

      <h1 className="text-3xl font-bold my-6 text-center">Update Book</h1>

      {!book ? (
        <Spinner />
      ) : (
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
              name="title"
              onChange={handleChange}
              value={book.title}
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
              name="author"
              onChange={handleChange}
              value={book.author}
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
              name="publishYear"
              onChange={handleChange}
              value={book.publishYear}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleUpdate}
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

export default Edit;
