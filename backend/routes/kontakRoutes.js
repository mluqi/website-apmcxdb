const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getKontakData,
  editKontak,
} = require("../controllers/kontakController");

router.get("/", getKontakData);
router.put("/", authMiddleware, editKontak);

module.exports = router;
