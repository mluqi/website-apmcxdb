const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads", "posts");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Hanya file gambar yang diizinkan!";
    return cb(new Error("Hanya file gambar yang diizinkan!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.uploadPostImage = upload.single("post_image");

exports.deleteFile = (filePathInPublic) => {
  if (filePathInPublic) {
    const fullPath = path.join(__dirname, "..", "public", filePathInPublic);
    fs.unlink(fullPath, (err) => {
      if (err) console.error(`Gagal menghapus file: ${fullPath}`, err);
    });
  }
};

const ABOUT_UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "public",
  "uploads",
  "tentangkami"
);

if (!fs.existsSync(ABOUT_UPLOAD_DIR)) {
  fs.mkdirSync(ABOUT_UPLOAD_DIR, { recursive: true });
}

const aboutStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ABOUT_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.uploadAboutImage = multer({
  storage: aboutStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const LANDING_UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "public",
  "uploads",
  "landingpage"
);

if (!fs.existsSync(LANDING_UPLOAD_DIR)) {
  fs.mkdirSync(LANDING_UPLOAD_DIR, { recursive: true });
}

const landingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, LANDING_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.uploadLandingImage = multer({
  storage: landingStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const LAYANAN_UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "public",
  "uploads",
  "layanan"
);

if (!fs.existsSync(LAYANAN_UPLOAD_DIR)) {
  fs.mkdirSync(LAYANAN_UPLOAD_DIR, { recursive: true });
}

const layananStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, LAYANAN_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.uploadLayananImage = multer({
  storage: layananStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");
