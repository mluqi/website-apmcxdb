const { deleteFile } = require("../middlewares/fileMiddleware");
const { tentangkami } = require("../models");
const path = require("path");

const IMAGE_PATH_PREFIX = path.join("uploads", "tentangkami");

exports.getAboutData = async (req, res) => {
  const id = 1;
  try {
    const aboutData = await tentangkami.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editAboutData = async (req, res) => {
  const { konten } = req.body;

  if (!konten) {
    return res.status(400).json({ message: "Konten harus diisi" });
  }

  try {
    const aboutData = await tentangkami.findOne({
      where: {
        id: 1,
      },
    });

    if (!aboutData) {
      return res
        .status(404)
        .json({ message: "Data tentang kami tidak ditemukan" });
    }

    let new_image_path = null;
    if (req.file) {
      if (aboutData.image) {
        deleteFile(aboutData.image);
      }
      new_image_path = path.join(IMAGE_PATH_PREFIX, req.file.filename);
    }

    aboutData.konten = konten;
    aboutData.image = new_image_path;

    await aboutData.save();
    res.status(200).json(aboutData);
  } catch (error) {
    if (req.file && new_image_path && aboutData.image !== new_image_path) {
      deleteFile(new_image_path);
    }
    res.status(500).json({ message: error.message });
  }
};
