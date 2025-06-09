const { LandingContent } = require("../models");
const { deleteFile } = require("../middlewares/fileMiddleware");
const path = require("path");

exports.getLandingContent = async (req, res) => {
  try {
    const landingContent = await LandingContent.findAll({
      order: [["sort_order", "ASC"]],
    });
    res.status(200).json(landingContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateLandingContent = async (req, res) => {
  const { id, section, key_name, value, type, sort_order } = req.body;

  try {
    const landingContent = await LandingContent.findByPk(id);
    if (!landingContent) {
      return res.status(404).json({ error: "Landing content not found" });
    }

    if (type === "image") {
      if (req.file) {
        if (landingContent.value) {
          deleteFile(landingContent.value);
        }
        landingContent.value = path.join(
          "uploads",
          "landingpage",
          req.file.filename
        );
      }
    } else {
      landingContent.value = value;
    }

    landingContent.section = section;
    landingContent.key_name = key_name;
    landingContent.type = type;
    landingContent.sort_order = sort_order;

    await landingContent.save();
    res.status(200).json(landingContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
