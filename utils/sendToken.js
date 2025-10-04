const jwt = require("jsonwebtoken");

// Helper: create and send token as cookie
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Cookie options
  const cookieOptions = {
    httpOnly: true, //
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    sameSite: "Strict", // prevents CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
};

module.exports = sendToken;
