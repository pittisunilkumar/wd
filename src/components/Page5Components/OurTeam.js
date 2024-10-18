import React, { useEffect, useRef, useState } from "react";
import hariimg from "../../assets/hari_image-cropped.svg";
import COOimg from "../../assets/coo_img.svg";
import rohithimg from "../../assets/rohith_img-cropped.svg";
import girishimg from "../../assets/girish_img-cropped.svg";
import aliimg from "../../assets/ali_img-cropped.svg";

const TeamMemberBox = ({ member, isVisible }) => {
  return (
    <div
      className={`border-r border-b border-[#e2dcc8] p-4 md:p-6 lg:p-10 flex flex-col md:flex-row items-center justify-center h-full overflow-hidden transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
      } ${!member.img ? "bg-transparent" : ""}`}
      style={{ minHeight: "150px" }}
    >
      {member.img && (
        <img
          src={member.img}
          className="w-16 h-16 md:w-20 md:h-20 object-cover mb-2 md:mb-0 md:mr-4"
          alt={`${member.name} image`}
        />
      )}
      {member.name && (
        <div className="fontmycustom flex flex-col text-center md:text-left">
          <h2
            className={`text-lg md:text-xl font-semibold p-1 transition-all duration-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {member.name}
          </h2>
          <p
            className={`ptagfont text-xs md:text-sm transition-all duration-500 delay-100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {member.designation}
          </p>
        </div>
      )}
    </div>
  );
};

const OurTeam = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [visibleMembers, setVisibleMembers] = useState(
    new Array(8).fill(false)
  );
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleMembers((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          } else {
            setVisibleMembers((prev) => {
              const newVisible = [...prev];
              newVisible[index] = false;
              return newVisible;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const observeMembers = () => {
      if (containerRef.current) {
        const memberElements =
          containerRef.current.querySelectorAll(".team-member");
        memberElements.forEach((element) => observer.observe(element));
      }
    };

    const timeoutId = setTimeout(observeMembers, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const teamMembers = [
    { name: "Hari", designation: "CEO", img: hariimg },
    { name: "Dhanur", designation: "COO", img: COOimg },
    { name: "Rohith", designation: "CTO", img: rohithimg },
    { name: "", designation: "" },
    { name: "Girish", designation: "Head- Frontend Developer", img: girishimg },
    { name: "Ali", designation: "Head - Digital Marketing", img: aliimg },
    {
      name: "Chris White",
      designation: "HR",
      img: "https://dummyimage.com/90x90",
    },
    {
      name: "Hamsi",
      designation: "Mascot",
      img: "https://dummyimage.com/90x90",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#282828] text-[#e2dcc8]"
      ref={containerRef}
    >
      <div className="flex-grow flex flex-col justify-center items-center p-4 md:p-6 lg:p-8">
        <h1
          className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl mb-6 md:mb-8 text-center"
          ref={headerRef}
        >
          <span
            className={`bg-abusinees fontmycustom inline-block ${
              isHeaderVisible ? "animate-left-to-right" : ""
            }`}
          >
            OUR
          </span>
          <span
            className={`text-stroke bg-abusinees fontmycustom inline-block ml-2 md:ml-4 ${
              isHeaderVisible ? "animate-right-to-left" : ""
            }`}
            style={{
              WebkitTextStroke: "2px #e2dcc8",
              color: "transparent",
              background: "none",
            }}
          >
            TEAM
          </span>
        </h1>

        <p className=" ptagfont text-base md:text-lg lg:text-xl xl:text-2xl mb-8 md:mb-12 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-center bg-abusinees">
          You will find some of the brightest minds on the web in our team. Your
          success defines the core of our processes. Every collaboration pins it
          down and are mission-oriented and driven.
        </p>

        <div className=" w-full md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-l border-t border-[#e2dcc8]">
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index} data-index={index}>
                <TeamMemberBox
                  member={member}
                  isVisible={visibleMembers[index]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes leftToRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes rightToLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-left-to-right {
          animation: leftToRight 1s ease-out forwards;
        }

        .animate-right-to-left {
          animation: rightToLeft 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OurTeam;
