"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Layanan", [
      {
        title: "Internet",
        konten:
          "<p>Layanan internet cepat dan stabil untuk rumah & bisnis.</p>",
        image: "uploads/layanan/internet.png",
        button_text: "Lihat Detail",
        button_link: "/layanan/internet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hotspot",
        konten:
          "<p>Solusi hotspot publik dan private dengan manajemen user mudah.</p>",
        image: "uploads/layanan/hotspot.png",
        button_text: "Lihat Detail",
        button_link: "/layanan/hotspot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "CCTV",
        konten: "<p>Jasa pemasangan dan perawatan CCTV profesional.</p>",
        image: "uploads/layanan/cctv.png",
        button_text: "Lihat Detail",
        button_link: "/layanan/cctv",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Layanan", null, {});
  },
};
