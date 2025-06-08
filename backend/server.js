require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const kontakRoutes = require("./routes/kontakRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const landingRoutes = require("./routes/landingRoutes");
const layananRoutes = require("./routes/layananRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/kontak", kontakRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/landing-content", landingRoutes);
app.use("/api/layanan", layananRoutes);
app.use("/api/lokasi-hotspot", locationRoutes);

app.use("/api/storage", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
