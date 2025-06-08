const express = require("express");
const router = express.Router();
const {
  getLayanan,
  updateLayanan,
} = require("../controllers/layananController");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadLayananImage } = require("../middlewares/fileMiddleware");

router.put("/:id", authMiddleware, uploadLayananImage, updateLayanan);
router.get("/", getLayanan);

module.exports = router;
