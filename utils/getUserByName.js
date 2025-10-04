const User = require("../models/user.model");
// Helper to get user ID by full name
const getUserIdByName = async (name) => {
  const [first_name, last_name] = name.split(" ");
  const user = await User.findOne({ first_name, last_name });
  return user ? user._id : null;
};

module.exports = {
  getUserIdByName,
};
