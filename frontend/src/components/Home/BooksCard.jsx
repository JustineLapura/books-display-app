import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books, handleDelete }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4">
      {books.map((book) => (
        <BookSingleCard key={book._id} book={book} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BooksCard;
