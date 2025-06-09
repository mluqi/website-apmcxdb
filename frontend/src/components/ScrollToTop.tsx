import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24); // px
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 200);

      // Cek posisi footer
      const footer = document.querySelector("footer");
      if (footer && btnRef.current) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Jika footer sudah masuk viewport bawah
        if (footerRect.top < windowHeight - 80) {
          // Naikkan tombol di atas footer
          setBottomOffset(windowHeight - footerRect.top + 24);
        } else {
          setBottomOffset(24);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label="Scroll to top"
      className="fixed right-6 z-50 bg-accent text-white rounded-full shadow-lg p-3 hover:bg-secondary transition-colors"
      style={{
        bottom: bottomOffset,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        transition: "bottom 0.2s",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  ) : null;
};

export default ScrollToTop;