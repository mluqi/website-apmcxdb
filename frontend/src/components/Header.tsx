import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`py-5 px-6 xl:py-6 text-secondary w-full fixed top-0 z-50 bg-white border-accent transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-primary shadow-md border-b border-accent"
          : "py-5 xl:py-8 text-white w-full top-0 z-50 border-b border-accent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Damai Bersatu Logo"
            className="h-10 md:h-12 cursor-pointer"
          />
        </Link>

        <div className="hidden xl:flex gap-8">
          <Nav />
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
