const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const user = await User.create({ first_name, last_name, email, password });
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({
      success: true,
      _id: user._id,
      first_name,
      last_name,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, signin };
