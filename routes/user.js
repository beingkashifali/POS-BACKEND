const express = require("express");
const {
  register,
  login,
  getUsers,
  deleteUser,
} = require("../controllers/user");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getUsers);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
