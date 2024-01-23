import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";

import { useSnackbar } from "notistack";
import { authContext } from "../context/authContext";

const Home = () => {
  const { user } = useContext(authContext);
  // console.log("Home Page User state: ", user);

  const [books, setBooks] = useState([]);
  console.log(books);
  const [isLoading, setIsLoading] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [showType, setShowType] = useState(() => {
    // Retrieve showType from localStorage or set a default value
    return localStorage.getItem("showType") || "table";
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/books");
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  // Save showType to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("showType", showType);
  }, [showType]);

  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:4000/api/books/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      enqueueSnackbar("Book Deleted Successfuly!", { variant: "success" });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    }

    if (!response.ok) {
      enqueueSnackbar(json.error, { variant: "error" });
    }
  };

  return (
    <div className="">
      <div
        onClick={() => setShowBook(false)}
        className={showBook ? "fixed w-full h-screen bg-black/80" : ""}
      />

      <div className="w-full flex justify-center items-center gap-4 pt-8">
        <button
          onClick={() => setShowType("table")}
          className="bg-green-500 text-xl hover:bg-green-600 text-white font-semibold px-4 py-1 rounded-lg"
        >
          Table
        </button>
        <button
          onClick={() => setShowType("card")}
          className="bg-blue-500 text-xl hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded-lg"
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center px-4">
        <h1 className="text-3xl my-8 font-bold">Books List</h1>
        {user && (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          {showType === "table" ? (
            <BooksTable
              books={books}
              handleDelete={handleDelete}
              showBook={showBook}
              setShowBook={setShowBook}
            />
          ) : (
            <BooksCard
              books={books}
              handleDelete={handleDelete}
              showBook={showBook}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
