import React from "react";
import { NavigationLinks } from "../config/links";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "facebook",
    icon: <FaFacebook />,
    link: "",
  },
  {
    name: "instagram",
    icon: <FaInstagram />,
    link: "",
  },
  {
    name: "linkedin",
    icon: <FaLinkedin />,
    link: "",
  },
  {
    name: "youtube",
    icon: <FaYoutube />,
    link: "",
  },
];

const Products = [
  {
    name: "Internet",
    path: "/",
  },
  {
    name: "CCTV",
    path: "/",
  },
  {
    name: "Hotspot",
    path: "/",
  },
];

const officeHours = [
  {
    day: "Senin - Jumat",
    time: "08:00 - 17:00",
  },
  {
    day: "Sabtu",
    time: "08:00 - 12:00",
  },
  {
    day: "Minggu",
    time: "Libur",
  }
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-bl from-accent to-secondary py-12">
      <div className="container mx-auto px-4 lg:px-44">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">apmcXdb.net</h3>
            <p className="text-gray-200">
              Solusi internet dan CCTV terpercaya untuk Anda.
            </p>
            <div>
              <ul className="text-gray-200 flex flex-row text-4xl decoration-none">
                {socialLinks.map((item) => (
                  <li key={item.name} className="mr-4 mt-4 mb-2 md:mb-0">
                    <Link
                      to={item.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Navigasi</h4>
            <ul className="text-gray-200">
              {NavigationLinks.map((link) => (
                <li key={link.name} className="mb-1">
                  <Link to={link.path} className="hover:text-accent">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Produk Kami</h4>
            <ul className="text-gray-200">
              {Products.map((item) => (
                <li key={item.name} className="mb-1">
                  <Link to={item.path} className="hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Jam Operasional</h4>
            <ul className="text-gray-200">
              {officeHours.map((item) => (
                <li key={item.day} className="mb-1">
                    {item.day}: {item.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 py-6 border-t border-gray-200 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} apmcXdb.net. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
