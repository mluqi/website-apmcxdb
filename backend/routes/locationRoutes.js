const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", getAllLocations);
router.post("/", authMiddleware, addLocation);
router.put("/:id", authMiddleware, updateLocation);
router.delete("/:id", authMiddleware, deleteLocation);

module.exports = router;
