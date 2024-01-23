import React, { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import BookCardModal from "./BookCardModal";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const BooksTable = ({ books, handleDelete, showBook, setShowBook }) => {
  const { user } = useContext(authContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleUpdate = (user_id, book_id) => {
    console.log(user_id, user._id);
    if (user_id !== user._id) {
      enqueueSnackbar("You can only update your own book", {
        variant: "error",
      });

      return;
    }

    navigate(`/books/details/${book_id}`);
  };

  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md">Author</th>
          <th className="border border-slate-600 rounded-md">Year Published</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <React.Fragment key={book._id}>
            <tr className="h-8">
              <td className="border borde-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border borde-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className="border borde-slate-700 rounded-md text-center">
                {book.author}
              </td>
              <td className="border borde-slate-700 rounded-md text-center">
                {book.publishYear}
              </td>
              <td className="flex justify-center gap-x-4 border borde-slate-700 rounded-md text-center">
                <p
                  onClick={() => setShowBook(true)}
                  className="cursor-pointer text-sm"
                >
                  view
                </p>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-xl text-green-500" />
                </Link>
                {user && (
                  <>
                    <AiOutlineEdit
                      className="text-xl text-yellow-500"
                      onClick={() => handleUpdate(book.user_id, book._id)}
                    />
                    <MdOutlineDelete
                      className="text-xl text-red-500 cursor-pointer"
                      onClick={() => handleDelete(book._id)}
                    />
                  </>
                )}
              </td>
            </tr>
            <>
              {showBook && (
                <BookCardModal book={book} setShowBook={setShowBook} />
              )}
            </>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
