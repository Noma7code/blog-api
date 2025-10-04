const Blog = require("../models/blog.model");
const getUserIdByName = require("../utils/getUserByName");

// Utility function to calculate reading time
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; // average reading speed
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute); // in minutes
};

// Get published blogs (public)
const getPublishedBlogs = async (req, res) => {
  const { page = 1, limit = 20, author, title, tags, orderBy } = req.query;
  const query = { state: "published" };
  if (author) query.author = await getUserIdByName(author);
  if (title) query.title = { $regex: title, $options: "i" };
  if (tags) query.tags = { $in: tags.split(",") };

  let sort = {};
  if (orderBy === "read_count") sort.read_count = -1;
  else if (orderBy === "reading_time") sort.reading_time = -1;
  else if (orderBy === "timestamp") sort.timestamp = -1;

  try {
    const blogs = await Blog.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("author", "first_name last_name");
    const count = await Blog.countDocuments(query);
    res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single blog (public + owner)
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "first_name last_name email"
    );

    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    // Allow owner to view draft
    if (
      blog.state !== "published" &&
      blog.author._id.toString() !== req.userId
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Increment read count only for published blogs
    if (blog.state === "published") {
      blog.read_count += 1;
      await blog.save();
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create blog (protected)
const createBlog = async (req, res) => {
  const { title, description, tags, body } = req.body;
  try {
    const blog = await Blog.create({
      title,
      description,
      tags,
      body,
      author: req.userId,
      state: "draft",
      read_count: 0,
      reading_time: calculateReadingTime(body),
      timestamp: new Date(),
    });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update blog (protected, owner only)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (blog.author.toString() !== req.userId)
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });

    // Restrict editable fields
    const { title, description, tags, body, state } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (tags) blog.tags = tags;
    if (body) {
      blog.body = body;
      blog.reading_time = calculateReadingTime(body); // recalc reading time
    }
    if (state) blog.state = state; // owner can publish

    await blog.save();
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete blog (protected, owner only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (blog.author.toString() !== req.userId)
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get own blogs (protected)
const getOwnBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const { state, orderBy } = req.query;

  const query = { author: req.userId };
  if (state) query.state = state;

  let sort = {};
  if (orderBy === "read_count") sort.read_count = -1;
  else if (orderBy === "reading_time") sort.reading_time = -1;
  else if (orderBy === "timestamp") sort.timestamp = -1;

  try {
    const blogs = await Blog.find(query)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPublishedBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getOwnBlogs,
};
