const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  signin,
  logout,
  changePassword,
  resetPassword,
  verify,
} = require("../controllers/authController");

router.post("/signin", signin);
router.post("/logout", authMiddleware, logout);
router.post("/change-password", authMiddleware, changePassword);
router.post("/reset-password", resetPassword);
router.get("/verify", authMiddleware, verify);

module.exports = router;
