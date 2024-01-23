import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import BookDetail from "./pages/BookDetail";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContext } from "react";
import { authContext } from "./context/authContext";
import User from "./pages/User";
import EditProfile from "./pages/EditProfile";

function App() {
  const { user } = useContext(authContext);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books/create"
          element={user ? <Create /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/edit/:id"
          element={user ? <Edit /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/details/:id"
          element={user ? <BookDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-profile"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
