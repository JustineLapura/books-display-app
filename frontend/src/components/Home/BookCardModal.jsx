import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";

const BookCardModal = ({ book, setShowBook }) => {
  return (
    <div className="fixed w-[600px] text-blue-900 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 bg-white rounded-2xl z-20 ease-in duration-300">
      <button
        onClick={() => setShowBook(false)}
        className="absolute top-2 right-2 px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-900 rounded-full"
      >
        X
      </button>
      <div className="space-y-2">
        <div className="bg-red-300 rounded-lg px-4 py-1 w-fit">
          <p className="text-gray-900">{book.publishYear}</p>
        </div>
        <p className="text-gray-400 mt-2">{book._id}</p>
        <div className="flex gap-3 items-center">
          <PiBookOpenTextLight className="text-red-400 font-semibold" />
          <p className="text-gray-700 font-semibold">{book.title}</p>
        </div>
        <div className="flex gap-3 items-center">
          <BiUserCircle className="text-red-400 font-semibold" />
          <p className="text-gray-700 font-semibold">{book.author}</p>
        </div>
      </div>
      <div className="my-10">
        <p>Anything You Want to Say</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          neque minima doloremque nobis recusandae nihil odio consectetur est
          itaque dolore iusto, voluptate magni, aliquid quia! Nam laborum alias
          vitae sapiente aspernatur vero a est earum voluptatibus molestias
          beatae velit exercitationem incidunt repellendus in, rerum deleniti
          accusamus amet rem eos ex!
        </p>
      </div>
    </div>
  );
};

export default BookCardModal;
