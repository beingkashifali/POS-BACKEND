const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser)
      return res.status(400).json({
        success: false,
        msg: "User already exists!",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (!existingUser)
      return res.status(400).json({
        success: false,
        msg: "User not found!",
      });

    const isMatched = await bcrypt.compare(password, existingUser.password);

    if (!isMatched)
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      username: existingUser.username,
      role: existingUser.role,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "User Deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getUsers, deleteUser };
