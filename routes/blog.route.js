const express = require("express");

const {
  getPublishedBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getOwnBlogs,
} = require("../controllers/blog.controller");
const { isAuth } = require("../middlewares/auth.middleware");

const blogRouter = express.Router();
blogRouter.get("/", getPublishedBlogs);
blogRouter.get("/myblogs", isAuth, getOwnBlogs);
blogRouter.get("/get-blog/:id", getBlog);
blogRouter.post("/create-blog", isAuth, createBlog);
blogRouter.put("/update-blog/:id", isAuth, updateBlog);
blogRouter.delete("/delete-blog/:id", isAuth, deleteBlog);

module.exports = blogRouter;
