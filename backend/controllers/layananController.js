const { Layanan } = require("../models");

const path = require("path");
const { deleteFile } = require("../middlewares/fileMiddleware");

const IMAGE_PATH_PREFIX = path.join("uploads", "layanan");

exports.getLayanan = async (req, res) => {
  try {
    const layanan = await Layanan.findAll({
      attributes: [
        "id",
        "title",
        "konten",
        "image",
        "button_text",
        "button_link",
      ],
    });
    res.status(200).json(layanan);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateLayanan = async (req, res) => {
  const { id, title, konten, image, button_text, button_link } = req.body;
  console.log(req.body);

  if (!title || !konten || !button_text || !button_link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const layanan = await Layanan.findOne({
      where: { id },
    });

    if (!layanan) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    let new_image_path = null;
    if (req.file) {
      if (image) {
        deleteFile(image);
      }
      new_image_path = path.join(IMAGE_PATH_PREFIX, req.file.filename);
    }

    layanan.title = title;
    layanan.konten = konten;
    layanan.image = new_image_path || image;
    layanan.button_text = button_text;
    layanan.button_link = button_link;

    await layanan.save();
    res.status(200).json(layanan);
  } catch (error) {
    console.error("Error updating layanan:", error);
    if (req.file && new_image_path && layanan.image !== new_image_path) {
      deleteFile(new_image_path);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
