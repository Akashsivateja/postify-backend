const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { get } = require("mongoose");
const JWT_SECRET = "Akash_Akash_123";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ error: errors.array() });
    }
    const { userName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json("User Already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });
      const createdUser = await newUser.save();
      return res.status(200).json(createdUser);
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Email id is Invalid or does not exist");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json("Invalid password");
      }

      
      //send a JWT Token....
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      res.status(500).json({ error: `Failed to Log in: ${error.message}` });
      res.status(500).json({ error: "Failed to Log in: ${error.message}" });
    }
  }
);

module.exports = router;
