import { useState, useEffect, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationLinks } from "../config/links";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activeHash = location.hash;
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.startsWith("#") && path.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(path);
      const headerOffset = 80;
      if (targetElement) {
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth",
        });
      }
    } else if (path === "/") {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const toggleAccordion = (linkName: string) => {
    setOpenAccordions((prevOpenAccordions) =>
      prevOpenAccordions.includes(linkName)
        ? prevOpenAccordions.filter((name) => name !== linkName)
        : [...prevOpenAccordions, linkName]
    );
  };

  const menuContent = (
    <div
      ref={menuRef}
      className="fixed inset-0 top-0 left-0 h-screen w-full bg-accent font-semibold text-white p-8 shadow-lg z-[999] flex flex-col transform transition-transform duration-300 ease-in-out"
      style={{ transform: isOpen ? "translateX(30%)" : "translateX(-100%)" }}
    >
      {" "}
      {/* Changed translateX(30%) to translateX(0%) for open state */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          className="text-white hover:text-accent"
        >
          <IoMdClose size={30} />
        </button>
      </div>
      <nav className="flex flex-col space-y-6">
        {NavigationLinks.map((link) => {
          const hasSubmenu = !!(link.sub && link.sub.length > 0);
          const isAccordionToggle = hasSubmenu && link.path === "#";
          const isParentHashActive =
            link.path.startsWith("#") &&
            link.path.length > 1 &&
            activeHash === link.path;

          const LinkComponent = isAccordionToggle ? "a" : NavLink;
          const linkProps: any = {
            to: isAccordionToggle ? undefined : link.path,
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isAccordionToggle) {
                e.preventDefault();
                toggleAccordion(link.name);
                return;
              }
              handleLinkClick(e, link.path);
            },
            className: ({ isActive }: { isActive?: boolean } = {}) => `
              flex items-center justify-between text-xl capitalize transition-all w-full
              ${
                isParentHashActive || (!isAccordionToggle && isActive)
                  ? "text-secondary font-semibold"
                  : "text-white hover:text-secondary"
              }
              ${isAccordionToggle ? "cursor-pointer" : ""}
            `,
          };
          if (isAccordionToggle) {
            linkProps.href = "#";
          }

          return (
            <Fragment key={link.name}>
              <LinkComponent {...linkProps}>
                <span>{link.name}</span>
                {hasSubmenu && (
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 transform ${
                      openAccordions.includes(link.name)
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </LinkComponent>
              {openAccordions.includes(link.name) && hasSubmenu && (
                <div className="pl-6 mt-2 flex flex-col space-y-3">
                  {link.sub!.map((subLink) => {
                    return (
                      <NavLink // Gunakan NavLink untuk sub-item juga
                        key={subLink.name}
                        to={subLink.path}
                        onClick={(e) => handleLinkClick(e, subLink.path)}
                        className={({ isActive }) =>
                          `block text-lg capitalize transition-all ${
                            isActive
                              ? "text-secondary font-semibold" // Gaya sublink aktif disamakan dengan link utama
                              : "text-gray-300 hover:text-secondary" // Gaya sublink tidak aktif, hover ke warna sekunder
                          }`
                        }
                      >
                        {subLink.name}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="xl:hidden">
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-accent hover:text-accent p-2"
        aria-label="Open menu"
      >
        <CiMenuBurger size={28} />
      </button>
      {isMounted && isOpen ? createPortal(menuContent, document.body) : null}
    </div>
  );
};

export default MobileNav;
