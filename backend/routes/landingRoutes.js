const express = require("express");
const router = express.Router();
const {
  getLandingContent,
  updateLandingContent,
} = require("../controllers/landingContentController");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadLandingImage } = require("../middlewares/fileMiddleware");

router.put("/:id", authMiddleware, uploadLandingImage, updateLandingContent);
router.get("/", getLandingContent);

module.exports = router;
