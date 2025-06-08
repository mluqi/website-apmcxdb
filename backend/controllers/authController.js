const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Fungsi untuk signin
exports.signin = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ message: "Email dan password diperlukan." });
  }

  try {
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah." }); // Pesan generik untuk keamanan
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah." }); // Pesan generik untuk keamanan
    }

    const payload = {
      id: user.user_id,
      email: user.user_email,
      name: user.user_name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.user_token = token;
    await user.save();

    res.status(200).json({
      message: "Login berhasil.",
      token,
      user: {
        user_id: user.user_id,
        name: user.user_name,
        email: user.user_email,
      },
    });
  } catch (error) {
    console.error("Error saat signin:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Fungsi untuk logout
exports.logout = (req, res) => {
  const userId = req.user.user_id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Hapus token dari user
  User.update({ user_token: null }, { where: { user_id: userId } })
    .then(() => {
      res.status(200).json({ message: "Logout berhasil." });
    })
    .catch((error) => {
      console.error("Error saat logout:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    });
};

// Fungsi untuk ganti password
exports.changePassword = async (req, res) => {
  const { old_password, new_password, confirm_new_password } = req.body;
  const userId = req.user.user_id;

  if (!old_password || !new_password || !confirm_new_password) {
    return res
      .status(400)
      .json({ message: "Semua field password diperlukan." });
  }

  if (new_password !== confirm_new_password) {
    return res
      .status(400)
      .json({ message: "Password baru dan konfirmasi password tidak cocok." });
  }

  if (new_password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password baru minimal 6 karakter." });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    // Periksa password lama
    const isMatch = await bcrypt.compare(old_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah." });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update password user
    user.user_password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password berhasil diubah." });
  } catch (error) {
    console.error("Error saat ganti password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Fungsi untuk reset password
exports.resetPassword = async (req, res) => {
  const { user_email, new_password, confirm_new_password } = req.body;

  if (!user_email || !new_password || !confirm_new_password) {
    return res
      .status(400)
      .json({ message: "Email dan password baru diperlukan." });
  }

  if (new_password !== confirm_new_password) {
    return res
      .status(400)
      .json({ message: "Password baru dan konfirmasi password tidak cocok." });
  }

  if (new_password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password baru minimal 6 karakter." });
  }

  try {
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User dengan email tersebut tidak ditemukan." });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update password user
    user.user_password = hashedPassword;
    await user.save();

    res.status(200).json({
      message:
        "Password berhasil direset. Silakan login dengan password baru Anda.",
    });
  } catch (error) {
    console.error("Error saat reset password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

exports.verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token tidak ditemukan." });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: ["user_id", "user_name", "user_email"],
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error saat verifikasi token:", error);
    return res.status(401).json({ message: "Token tidak valid atau kadaluarsa." });
  }
};