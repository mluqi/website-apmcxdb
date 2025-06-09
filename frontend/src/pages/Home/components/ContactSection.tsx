import React from "react";
import { Link } from "react-router-dom";
import { useKontak } from "@/contexts/KontakContext";

const ContactSection: React.FC = () => {
  const { kontak } = useKontak();
  const email = kontak?.email || "";
  const telepon = kontak?.telepon || "";
  const alamat = kontak?.alamat || "";
  if (!kontak) {
    return null;
  }

  return (
    <section className="py-16 md:py-44 bg-gradient-to-b from-white to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        {/* Kontainer dan alignment teks */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Hubungi Kami
          </h2>
          <hr className="mx-auto h-px my-8 bg-accent/20 w-[300px] text-center border-0"></hr>
        </div>
        <p className="text-lg text-gray-600 mb-2">
          Email:{" "}
          <a className="text-accent hover:text-secondary">{email || ""}</a>
        </p>
        <p className="text-lg text-gray-600 mb-2">
          Telepon:{" "}
          <a className="text-accent hover:text-secondary">{telepon || ""}</a>
        </p>
        <p className="text-lg text-gray-600">
          Alamat:{" "}
          <a className="text-accent hover:text-secondary">{alamat || ""}</a>
        </p>
        <div className="mt-8">
          <Link
            to="/kontak-kami"
            className="bg-accent text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer shadow-md hover:bg-secondary hover:-translate-y-1 transform"
          >
            Kunjungi Halaman Kontak Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
