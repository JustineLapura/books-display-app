import React, { useContext } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

const BookSingleCard = ({ book, handleDelete }) => {
  const { user } = useContext(authContext);

  return (
    <div className="relative w-[300px] border border-gray-500 rounded-lg p-4 shadow">
      <div className="space-y-2">
        <p className="text-gray-400">{book._id}</p>
        <div className="absolute top-0 right-2 bg-red-400 px-2 py-1 rounded-lg">
          <p className="text-sm">{book.publishYear}</p>
        </div>
        <div className="flex gap-3 items-center">
          <PiBookOpenTextLight className="text-red-400 font-semibold" />
          <p className="text-gray-700 font-semibold">{book.title}</p>
        </div>
        <div className="flex gap-3 items-center">
          <BiUserCircle className="text-red-400 font-semibold" />
          <p className="text-gray-700 font-semibold">{book.author}</p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-8">
        {!user && (
          <Link to={`/books/details/${book._id}`} className="w-full flex items-center justify-center gap-1">
            <BiInfoCircle className="text-green-500 cursor-pointer text-xl" />
            <p className="text-gray-500 hover:scale-105">view</p>
          </Link>
        )}
        {user && (
          <>
            <Link to={`/books/details/${book._id}`}>
              <BiInfoCircle className="text-green-500 cursor-pointer text-xl" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-yellow-500 cursor-pointer text-xl" />
            </Link>
            <MdOutlineDelete
              className="text-red-500 cursor-pointer text-xl"
              onClick={() => handleDelete(book._id)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;
