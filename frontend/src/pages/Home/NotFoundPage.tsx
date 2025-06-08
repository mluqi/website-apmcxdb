import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md">
        <svg
          className="mx-auto h-24 w-24 text-secondary mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold text-textcolor mb-4">
          Oops! Halaman Tidak Ditemukan
        </h1>
        <p className="text-md text-gray-600 mb-8">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin
          halaman tersebut telah dipindahkan atau dihapus.
        </p>
        <Link
          to="/"
          className="bg-accent text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-accent-hover transition duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
