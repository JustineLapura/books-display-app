import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";

import { useSnackbar } from "notistack";
import { authContext } from "../context/authContext";
import BackButton from "../components/BackButton";

const Home = () => {
  const { user } = useContext(authContext);
  // console.log("Home Page User state: ", user);

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/books/getusers", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

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
      enqueueSnackbar("Delete Error", { variant: "error" });
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <BackButton />
        <Link to="/edit-profile">
          <p className="text-gray-500 font-semibold">Edit Profile</p>
        </Link>
      </div>
      <div
        onClick={() => setShowBook(false)}
        className={showBook ? "fixed w-full h-screen bg-black/80" : ""}
      />

      <div className="flex justify-between items-center px-4">
        <h1 className="text-3xl my-8 font-bold">My Book List</h1>
        {user && (
          <Link to="/books/create" className="flex items-center gap-2">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
            <p className="text-gray-500 font-semibold">Add Book</p>
          </Link>
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <BooksCard
          books={books}
          handleDelete={handleDelete}
          showBook={showBook}
        />
      )}
    </div>
  );
};

export default Home;
