const mongoose = require("mongoose");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

// create Token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// get Users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// get User
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    res.status(400).json({ error: "Book not found" });
  }
  res.status(200).json(user);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create Token
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ mssg: "No such user" });
  }
  res.status(200).json({ mssg: "User Deleted Successfuly", user });
};

module.exports = { getUsers, getUser, loginUser, signupUser, deleteUser };
