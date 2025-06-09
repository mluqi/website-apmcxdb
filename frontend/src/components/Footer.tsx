import React from "react";
import { NavigationLinks } from "../config/links";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext";

const iconMap: Record<string, React.ReactElement> = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedin />,
  youtube: <FaYoutube />,
};

const Products = [
  {
    name: "Internet",
    path: "/layanan/internet",
  },
  {
    name: "CCTV",
    path: "/layanan/cctv",
  },
  {
    name: "Hotspot",
    path: "/layanan/hotspot",
  },
];

const Footer: React.FC = () => {
  const { landingContent } = usePublic();

  const officeHours = landingContent.filter(
    (item) => item.section === "footer" && item.key_name === "jam_operasional"
  );

  const socialLinks = landingContent
    .filter(
      (item) => item.section === "footer" && item.key_name.endsWith("_link")
    )
    .map((item) => {
      const name = item.key_name.replace("_link", "");
      return {
        name,
        icon: iconMap[name] || null,
        link: item.value,
      };
    });

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
                {socialLinks.map((item) =>
                  item.icon && item.link ? (
                    <li key={item.name} className="mr-4 mt-4 mb-2 md:mb-0">
                      <a
                        href={item.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="hover:text-accent transition-colors duration-200"
                      >
                        {item.icon}
                      </a>
                    </li>
                  ) : null
                )}
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
            <h4 className="text-lg font-bold text-white mb-2">
              Jam Operasional
            </h4>
            <div
              className="text-gray-200"
              dangerouslySetInnerHTML={{ __html: officeHours[0]?.value || "" }}
            />
          </div>
        </div>
        <div className="mt-12 py-6 border-t border-gray-200 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} apmcXdb.net. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
