const express = require("express");
const {
  getUsers,
  getUser,
  loginUser,
  signupUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

// get Users
router.get("/", getUsers);

// get User
router.get("/:id", getUser);

// login user
router.post("/login", loginUser);

// signup user
router.post("/signup", signupUser);

// delete User
router.delete("/:id", deleteUser);

module.exports = router;
