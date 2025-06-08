const { Kontak } = require("../models");

exports.getKontakData = async (req, res) => {
  const id = 1;
  try {
    const kontakData = await Kontak.findOne({
      where: { id },
      attributes: ["telepon", "email", "alamat", "gmaps"],
    });

    res.status(200).json(kontakData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editKontak = async (req, res) => {
  const { telepon, email, alamat, gmaps } = req.body;

  if (!telepon || !email || !alamat || !gmaps) {
    res.status(400).json({ message: "Telepon, email, alamat and gmaps are required" });
  }

  try {
    const editedKontakData = await Kontak.update(
      { telepon, email, alamat, gmaps },
      { where: { id: 1 } }
    );

    res.status(200).json(editedKontakData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
