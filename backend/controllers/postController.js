const { Post } = require("../models");
const { deleteFile } = require("../middlewares/fileMiddleware");
const path = require("path");

const IMAGE_PATH_PREFIX = path.join("uploads", "posts");

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Post.findAndCountAll({
      order: [["post_date", "DESC"]],
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      totalItems: count,
      totalPages: totalPages,
      currentPage: page,
      posts: rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
  const { post_title, post_konten, post_date } = req.body;
  if (!post_title || !post_konten) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  let post_image_path = null;
  if (req.file) {
    post_image_path = path.join(IMAGE_PATH_PREFIX, req.file.filename);
  }

  try {
    const newPost = await Post.create({
      post_title,
      post_konten,
      post_image: post_image_path,
      post_date: post_date || new Date(),
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { post_title, post_konten, post_date } = req.body;

  if (!post_title || !post_konten) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let new_image_path = post.post_image;
    if (req.file) {
      if (post.post_image) {
        deleteFile(post.post_image);
      }
      new_image_path = path.join(IMAGE_PATH_PREFIX, req.file.filename);
    }

    post.post_title = post_title || post.post_title;
    post.post_konten = post_konten || post.post_konten;
    post.post_date = post_date || post.post_date;
    post.post_image = new_image_path;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    if (req.file && new_image_path && post.post_image !== new_image_path) {
      deleteFile(new_image_path);
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.post_image) {
      deleteFile(post.post_image);
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
