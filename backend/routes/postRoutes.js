const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadPostImage } = require("../middlewares/fileMiddleware");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, uploadPostImage, createPost);
router.put("/:id", authMiddleware, uploadPostImage, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
