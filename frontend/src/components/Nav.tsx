import { useState, useEffect, useRef } from "react";
import { NavigationLinks } from "../config/links";

const Nav = () => {
  const [currentPathname, setCurrentPathname] = useState<string>("");
  const [activeLink, setActiveLink] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentPathname(window.location.pathname);

    const handleLocationChange = () => {
      setCurrentPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    const handleScroll = () => {
      NavigationLinks.forEach((link) => {
        if (link.path.startsWith("#") && link.path.length > 1) {
          const targetElement = document.querySelector(link.path);
          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const navbarHeight =
              document.getElementById("navbar")?.offsetHeight || 0;
            if (
              rect.top <= navbarHeight + 10 &&
              rect.bottom > navbarHeight + 10
            ) {
              setActiveLink(link.path);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof NavigationLinks)[0]
  ) => {
    const { path, sub } = link;
    const hasSubmenu = !!(sub && sub.length > 0);

    if (path === "#" && hasSubmenu) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === link.name ? null : link.name));
      return;
    }

    setOpenDropdown(null);

    if (path.startsWith("#") && path.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(path);
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            85,
          behavior: "smooth",
        });
      }
    } else if (path === "/") {
      if (currentPathname === "/") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav id="navbar" ref={navRef} className="flex items-center gap-8">
      {NavigationLinks.map((link, index) => (
        <div className="relative" key={link.name + index}>
          <a
            href={
              link.path === "#" && link.sub && link.sub.length > 0
                ? undefined
                : link.path
            }
            onClick={(e) => handleClick(e, link)}
            className={`
              uppercase text-accent transition-all flex items-center
              ${
                (link.path.startsWith("#") && activeLink === link.path) ||
                (!link.path.startsWith("#") && currentPathname === link.path)
                  ? "font-bold border-b-2 border-accent"
                  : "font-bold text-textcolor hover:text-accent"
              }
               hover:bg-secondary hover:text-white hover:shadow-lg px-3 py-2 rounded-md hover:border-b-2 hover:border-accent
               ${
                 link.path === "#" && link.sub && link.sub.length > 0
                   ? "cursor-pointer"
                   : ""
               }
            `}
            aria-haspopup={link.sub && link.sub.length > 0 ? "true" : undefined}
            aria-expanded={openDropdown === link.name ? "true" : "false"}
          >
            {link.name}
            {link.sub && link.sub.length > 0 && (
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 transform ${
                  openDropdown === link.name ? "rotate-180" : "rotate-0"
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
          </a>
          {openDropdown === link.name && link.sub && link.sub.length > 0 && (
            <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {link.sub.map((subLink) => (
                  <a
                    key={subLink.name}
                    href={subLink.path}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2 text-sm text-textcolor hover:bg-secondary rounded-md hover:text-white transition-colors duration-150"
                    role="menuitem"
                  >
                    {subLink.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Nav;
