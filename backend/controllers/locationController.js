const { lokasihotspot } = require("../models");

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await lokasihotspot.findAll({
      attributes: ["id", "nama", "lat", "long", "alamat"],
    });
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addLocation = async (req, res) => {
  const { nama, lat, long, alamat } = req.body;

  if (!nama || !lat || !long || !alamat) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newLocation = await lokasihotspot.create({
      nama,
      lat,
      long,
      alamat,
    });
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { nama, lat, long, alamat } = req.body;

  if (!nama || !lat || !long || !alamat) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const location = await lokasihotspot.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    location.nama = nama;
    location.lat = lat;
    location.long = long;
    location.alamat = alamat;

    await location.save();
    res.status(200).json(location);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await lokasihotspot.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await location.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
