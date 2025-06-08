import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ServerIcon,
  SettingsIcon,
  FileTextIcon,
  BuildingIcon,
  PhoneIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  LocationEditIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/dashboard",
      icon: <HomeIcon size={20} />,
      label: "Dashboard",
    },
    {
      path: "/admin/tentang-kami",
      icon: <BuildingIcon size={20} />,
      label: "Tentang Kami",
    },
    { path: "/admin/post", icon: <FileTextIcon size={20} />, label: "Artikel" },
    {
      path: "/admin/kontak",
      icon: <PhoneIcon size={20} />,
      label: "Kontak",
    },
    {
      path: "/admin/layanan",
      icon: <ServerIcon size={20} />,
      label: "Layanan",
    },
    {
      path: "/admin/lokasi-hotspot",
      icon: <LocationEditIcon size={20} />,
      label: "Lokasi Hotspot",
    },
    {
      path: "/admin/settings",
      icon: <SettingsIcon size={20} />,
      label: "Settings",
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    // tambahkan alert atau konfirmasi jika diperlukan
    if (!window.confirm("Apakah Anda yakin ingin logout?")) return;
    await logout();
    // Navigasi akan ditangani oleh AuthContext setelah logout
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden z-[60] top-4 left-4 p-2 rounded-md bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-all"
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-blue-600">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-md transition-colors duration-150
                      ${
                        isActive || location.pathname.startsWith(item.path)
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 mt-auto border-t border-gray-200">
            <button
              className="flex bg-red-500 text-white items-center w-full p-3 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-150 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOutIcon size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
