import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { authContext } from "../context/authContext";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");

  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchWorkout = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
        } else {
          console.error("Failed to fetch book:", json.error);
          setFetchError(json.error);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchWorkout();
    }
  }, [id, user]);
  return (
    <div className="w-full min-h-screen p-4 flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          {book && (
            <>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Id</span>
                <span>{book._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Title:</span>
                <span>{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Author:</span>
                <span>{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Year:</span>
                <span>{book.publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Created Time:
                </span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Last Time Updated:
                </span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetail;

// <div>
//   <h1>BookDetail Page</h1>
//   <Link to="/">Go back</Link>
//   {book && (
//     <div className="">
//       <h1>{book.title}</h1>
//       <h3>{book.author}</h3>
//       <h2>{book.publishYear}</h2>
//       <p>{book.createdAt}</p>
//       <p>{book.updatedAt}</p>
//     </div>
//   )}
// </div>
