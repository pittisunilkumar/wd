//working for hover effect
import React from "react";
import logo from "../assets/webdaddy-final-logo.png";

const Sidebar = ({ scrollToPage }) => {
  const handleClick = (e, pageNumber) => {
    e.preventDefault();
    scrollToPage(pageNumber);
  };

  const links = [
    { label: "Home", page: "home", href: "/" },
    { label: "About", page: "about", href: "/about" },
    { label: "Team", page: "last", href: "/team" },
    { label: "Services", page: "services", href: "/services" },
    { label: "Portfolio", page: "portfolio", href: "/portfolio" },
    { label: "Blog", page: "blog", href: "/blog" },
    { label: "Contact", page: "last-vertical", href: "/contact" },
  ];

  return (
    <div className="sidebar fixed top-0 left-0 h-full bg-[#333333] z-20 flex flex-col items-center py-4 space-y-5 w-15">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-15 h-15 flex items-center justify-center">
          <img
            src={logo}
            alt="W"
            className="cursor-pointer w-full h-full object-contain"
            onClick={(e) => handleClick(e, "home")}
          />
        </div>
      </div>
      {links.map(({ label, page, href }) => (
        <div key={page} className="relative group">
          {label !== "Home" && (
            <div className="w-1.5 h-1.5 bg-[#26d4b4] mb-2 ml-1 rounded-full transition-opacity duration-200 group-hover:opacity-0"></div>
          )}
          <a
            href={href}
            className="text-[#e3ddc8] hover:text-[#26d4b4] sidebaricon fontmycustom"
            onClick={(e) => handleClick(e, page)}
          >
            {label.charAt(0)} {/* Display the first letter of the label */}
          </a>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-0.5 w-20  text-[#e2dcc8] text-center text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
