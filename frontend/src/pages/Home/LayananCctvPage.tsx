import React from "react";
import { Link } from "react-router-dom";
import { useLayanan } from "@/contexts/LayananContext";

const BASE_IMAGE_URL = "https://dev4-p3.palindo.id/api/storage/";

const LayananCctvPage: React.FC = () => {
  const { layanan, loading } = useLayanan();
  const data = layanan[2];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-semibold text-gray-700">
          Layanan tidak ditemukan.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-accent to-secondary py-20 pt-44 md:pt-44 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan Jasa CCTV
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Keamanan optimal dengan solusi CCTV profesional kami. Instalasi,
            perawatan, dan konsultasi untuk rumah dan bisnis Anda.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-20">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-secondary mb-6">
            {data.title}
          </h2>
          {data.image && (
            <div className="flex justify-center mb-6">
              <img
                src={BASE_IMAGE_URL + data.image}
                alt={data.title}
                className="max-h-64 rounded-lg object-contain border bg-white"
              />
            </div>
          )}
          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: data.konten }}
          ></div>
          <div className="mt-8 text-center">
            <Link
              to={data.button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer shadow-md hover:bg-secondary hover:-translate-y-1 transform"
            >
              {data.button_text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayananCctvPage;
