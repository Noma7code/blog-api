const express = require("express");
const {
  signup,
  signin,
  logoutUser,
  deleteUserAccount,
} = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", isAuth, logoutUser);
authRouter.delete("/delete", isAuth, deleteUserAccount);

module.exports = authRouter;
