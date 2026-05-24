const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {

    const { name, email, password } =
      req.body;

    // Check Existing User
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User Registered",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {

    const { email, password } =
      req.body;

    // Find User
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};