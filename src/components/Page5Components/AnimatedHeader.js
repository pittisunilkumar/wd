import React, { useRef, useEffect } from "react";

const AnimatedHeader = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-header");
          } else {
            entry.target.classList.remove("animate-header");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="blogpage-heading mb-20 text-center overflow-hidden"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl fontmycustom inline-block mb-8 sm:mb-8 text-center">
        <span
          className="fontmycustom heading-left inline-block"
          style={{ color: "#e3ddc8" }}
        >
          BLOG
        </span>
        <span
          className="fontmycustom heading-right inline-block"
          style={{
            WebkitTextStroke: "2px #e3ddc8",
            color: "transparent",
          }}
        >
          YARD
        </span>
      </h1>
    </header>
  );
};

export default AnimatedHeader;