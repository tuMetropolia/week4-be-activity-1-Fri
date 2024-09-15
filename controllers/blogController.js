const Blog = require("../models/blogModel");

// GET /blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

// POST /blogs
const createBlog = async (req, res) => {
  const newblog = await Blog.create({ ...req.body });
  res.status(201).json(newblog);
};

// GET /blogs/:blogId
const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// PUT /blogs/:blogId
const updateBlog = async (req, res) => {
  const { blogId } = req.params;

  const updatedblog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { ...req.body },
    { new: true, overwrite: true }
  );
  if (updatedblog) {
    res.status(200).json(updatedblog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// DELETE /blogs/:blogId
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  const deletedblog = await Blog.findOneAndDelete({ _id: blogId });
  if (deletedblog) {
    res.status(200).json({ message: "Blog deleted" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
