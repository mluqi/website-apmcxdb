const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadAboutImage } = require("../middlewares/fileMiddleware");
const {
  getAboutData,
  editAboutData,
} = require("../controllers/aboutController");

router.get("/", getAboutData);
router.put("/", authMiddleware, uploadAboutImage, editAboutData);

module.exports = router;
