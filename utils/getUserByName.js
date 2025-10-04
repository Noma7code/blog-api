const User = require("../models/user.model");
// Helper to get user ID by full name
const getUserIdByName = async (name) => {
  const parts = name.trim().split(" ");
  const first_name = parts[0];
  const last_name = parts.slice(1).join(" ");
  const user = await User.findOne({ first_name, last_name });
  return user ? user._id : null;
};

module.exports = {
  getUserIdByName,
};
