import React, { useRef, useEffect } from "react";
import portfolioimgaes7 from "../../assets/BAVET_WEB_PIC.png";
import portfolioimgaes8 from "../../assets/sightbox_web_pic.png";
import portfolioimgaes9 from "../../assets/giganticcandy_web_pic.png";
import portfolioimgaes10 from "../../assets/mydayaway_web_pic.png";
import portfolioimgaes11 from "../../assets/archmotorcycle_web_pic.png";
import arrowimage from "../../assets/Arrow.svg";

const Portfolio = () => {
  const projectRefs = useRef([]);
  const headingRef = useRef(null);
  const strokeRef = useRef(null);

  useEffect(() => {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-project");
          } else {
            entry.target.classList.remove("animate-project");
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) {
        projectObserver.observe(ref);
      }
    });

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headingRef.current.classList.add("animate-left");
          strokeRef.current.classList.add("animate-right");
        } else {
          headingRef.current.classList.remove("animate-left");
          strokeRef.current.classList.remove("animate-right");
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current && strokeRef.current) {
      headingObserver.observe(headingRef.current);
      headingObserver.observe(strokeRef.current);
    }

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) projectObserver.unobserve(ref);
      });
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (strokeRef.current) headingObserver.unobserve(strokeRef.current);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const projects = [
    {
      name: "BAVET",
      description: "Restaurant Business",
      imageSrc: portfolioimgaes7,
      url: "https://bavet.eu/",
    },
    {
      name: "SIGHTBOX",
      description: "Branding Agency",
      imageSrc: portfolioimgaes8,
      url: "https://sightbox.co/",
    },
    {
      name: "GIGANTIC CANDY",
      description: "Ecommerce",
      imageSrc: portfolioimgaes9,
      url: "https://giganticcandy.com/",
    },
    {
      name: "DAYAWAY",
      description: "Travel Membership",
      imageSrc: portfolioimgaes10,
      url: "https://www.mydayaway.com/",
    },
    {
      name: "ARCH - Motorcycle",
      description: "Automobile",
      imageSrc: portfolioimgaes11,
      url: "https://archmotorcycle.com/",
    },
  ];

  return (
    <div
      id="portfolio-section"
      className="min-h-screen bg-[#282828] flex flex-col justify-center items-center p-4 sm:p-8"
    >
      <div className="container mx-auto px-4 py-8 sm:py-16 max-w-7xl">
        <h1 className="fontmycustom text-4xl sm:text-6xl lg:text-9xl mb-8 sm:mb-16 text-center text-[#e2dcc8] flex justify-center items-center">
          <span ref={headingRef} className="inline-block">
            PORT
          </span>
          <span
            ref={strokeRef}
            className="inline-block text-[#e2dcc8] bg-businees text-stroke"
            style={{
              WebkitTextStroke: "2px #e2dcc8",
              color: "transparent",
              background: "none",
            }}
          >
            FOLIO
          </span>
        </h1>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 portfoliopage-project-container cursor-pointer ${
                index % 2 === 0
                  ? "portfoliopage-project-container-one"
                  : "portfoliopage-project-container-two"
              }`}
              onClick={() => window.open(project.url, "_blank")}
            >
              <div
                className={`w-full md:w-1/2 portfoliopage-project-text-container text-center items-center justify-center text-[#e2dcc8] flex flex-col px-4 md:px-8 ${
                  index % 2 === 0
                    ? "items-start md:order-1"
                    : "items-end md:order-2"
                }`}
              >
                <h2 className="fontmycustom text-4xl font-bold mb-4 text-center">
                  {project.name}
                </h2>
                <p className="ptagfont text-xl mb-4">{project.description}</p>
                <div className="flex items-center justify-center">
                  <div className="relative w-12 h-12 rounded-full border border-[#e2dcc8] bg-[#e2dcc8] flex items-center justify-center hover:bg-[#26d4b4] cursor-pointer transition-all duration-300">
                    <img
                      src={arrowimage}
                      alt="arrow"
                      className={`w-8 h-8 transform ${
                        index % 2 !== 0 ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`w-full md:w-1/2 portfoliopage-project-image-container px-4 md:px-8 ${
                  index % 2 === 0 ? "md:order-2" : "md:order-1"
                }`}
              >
                <img
                  src={project.imageSrc}
                  alt={project.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

// import React, { useRef, useEffect } from "react";
// import portfolioimgaes7 from "../../assets/BAVET_WEB_PIC.png";
// import portfolioimgaes8 from "../../assets/sightbox_web_pic.png";
// import portfolioimgaes9 from "../../assets/giganticcandy_web_pic.png";
// import portfolioimgaes10 from "../../assets/mydayaway_web_pic.png";
// import portfolioimgaes11 from "../../assets/archmotorcycle_web_pic.png";
// import arrowimage from "../../assets/Arrow.svg";

// const Portfolio = () => {
//   const projectRefs = useRef([]);
//   const headingRef = useRef(null);
//   const strokeRef = useRef(null);

//   useEffect(() => {
//     const projectObserver = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-project");
//           } else {
//             entry.target.classList.remove("animate-project");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     projectRefs.current.forEach((ref) => {
//       if (ref) {
//         projectObserver.observe(ref);
//       }
//     });

//     const headingObserver = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           headingRef.current.classList.add("animate-left");
//           strokeRef.current.classList.add("animate-right");
//         } else {
//           headingRef.current.classList.remove("animate-left");
//           strokeRef.current.classList.remove("animate-right");
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (headingRef.current && strokeRef.current) {
//       headingObserver.observe(headingRef.current);
//       headingObserver.observe(strokeRef.current);
//     }

//     return () => {
//       projectRefs.current.forEach((ref) => {
//         if (ref) projectObserver.unobserve(ref);
//       });
//       if (headingRef.current) headingObserver.unobserve(headingRef.current);
//       if (strokeRef.current) headingObserver.unobserve(strokeRef.current);
//     };
//   }, []);

//   const addToRefs = (el) => {
//     if (el && !projectRefs.current.includes(el)) {
//       projectRefs.current.push(el);
//     }
//   };

//   const projects = [
//     {
//       name: "BAVET",
//       description: "Restaurant Business",
//       imageSrc: portfolioimgaes7,
//       url: "https://bavet.eu/",
//     },
//     {
//       name: "SIGHTBOX",
//       description: "Branding Agency",
//       imageSrc: portfolioimgaes8,
//       url: "https://sightbox.co/",
//     },
//     {
//       name: "GIGANTIC CANDY",
//       description: "Ecommerce",
//       imageSrc: portfolioimgaes9,
//       url: "https://giganticcandy.com/",
//     },
//     {
//       name: "DAYAWAY",
//       description: "Travel Membership",
//       imageSrc: portfolioimgaes10,
//       url: "https://www.mydayaway.com/",
//     },
//     {
//       name: "ARCH - Motorcycle",
//       description: "Automobile",
//       imageSrc: portfolioimgaes11,
//       url: "https://archmotorcycle.com/",
//     },
//   ];

//   return (
//     <div
//       id="portfolio-section"
//       className="min-h-screen bg-[#282828] flex flex-col justify-center items-center p-8"
//     >
//       <div className="container mx-auto px-4 py-8 sm:py-16 max-w-7xl">
//         <h1 className="fontmycustom text-4xl sm:text-6xl lg:text-9xl mb-8 sm:mb-16 text-center text-[#e2dcc8] flex justify-center items-center">
//           <span ref={headingRef} className="inline-block">
//             PORT
//           </span>
//           <span
//             ref={strokeRef}
//             className="inline-block text-[#e2dcc8] bg-businees text-stroke"
//             style={{
//               WebkitTextStroke: "2px #e2dcc8", // Apply stroke color and width
//               color: "transparent", // Hide fill color
//               background: "none", // Ensure no background affects the blend
//             }}
//           >
//             FOLIO
//           </span>
//         </h1>

//         <div className="space-y-24">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               ref={addToRefs}
//               className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 portfoliopage-project-container cursor-pointer ${
//                 index % 2 === 0
//                   ? "portfoliopage-project-container-one"
//                   : "portfoliopage-project-container-two"
//               }`}
//               onClick={() => window.open(project.url, "_blank")}
//             >
//               <div
//                 className={`w-full md:w-1/2 portfoliopage-project-text-container text-center items-center justify-center text-[#e2dcc8] flex flex-col ${
//                   index % 2 === 0
//                     ? "items-start md:order-1"
//                     : "items-end md:order-2"
//                 }`}
//               >
//                 <h2 className="text-4xl font-bold mb-4 text-center">
//                   {project.name}
//                 </h2>
//                 <p className="text-xl mb-4">{project.description}</p>
//                 <div className="flex items-center justify-center">
//                   <div className="relative w-12 h-12 rounded-full border border-[#e2dcc8]  bg-[#e2dcc8] flex items-center justify-center hover:bg-[#26d4b4] cursor-pointer transition-all duration-300">
//                     <img
//                       src={arrowimage}
//                       alt="arrow"
//                       className={`w-8 h-8 transform ${
//                         index % 2 !== 0 ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`w-full md:w-1/2 portfoliopage-project-image-container ${
//                   index % 2 === 0 ? "md:order-2" : "md:order-1"
//                 }`}
//               >
//                 <img
//                   src={project.imageSrc}
//                   alt={project.name}
//                   className="w-full "
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

// // import React, { useRef, useEffect } from "react";
// // import portfolioimgaes7 from "../../assets/BAVET_WEB_PIC.png";
// // import portfolioimgaes8 from "../../assets/sightbox_web_pic.png";
// // import portfolioimgaes9 from "../../assets/giganticcandy_web_pic.png";
// // import portfolioimgaes10 from "../../assets/mydayaway_web_pic.png";
// // import portfolioimgaes11 from "../../assets/archmotorcycle_web_pic.png";
// // import arrowimage from "../../assets/Arrow.svg";

// // const Portfolio = () => {
// //   const projectRefs = useRef([]);
// //   const headingRef = useRef(null);
// //   const strokeRef = useRef(null);

// //   useEffect(() => {
// //     const projectObserver = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add("animate-project");
// //           } else {
// //             entry.target.classList.remove("animate-project");
// //           }
// //         });
// //       },
// //       { threshold: 0.1 }
// //     );

// //     projectRefs.current.forEach((ref) => {
// //       if (ref) {
// //         projectObserver.observe(ref);
// //       }
// //     });

// //     const headingObserver = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           headingRef.current.classList.add("animate-left");
// //           strokeRef.current.classList.add("animate-right");
// //         } else {
// //           headingRef.current.classList.remove("animate-left");
// //           strokeRef.current.classList.remove("animate-right");
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (headingRef.current && strokeRef.current) {
// //       headingObserver.observe(headingRef.current);
// //       headingObserver.observe(strokeRef.current);
// //     }

// //     return () => {
// //       projectRefs.current.forEach((ref) => {
// //         if (ref) projectObserver.unobserve(ref);
// //       });
// //       if (headingRef.current) headingObserver.unobserve(headingRef.current);
// //       if (strokeRef.current) headingObserver.unobserve(strokeRef.current);
// //     };
// //   }, []);

// //   const addToRefs = (el) => {
// //     if (el && !projectRefs.current.includes(el)) {
// //       projectRefs.current.push(el);
// //     }
// //   };

// //   const projects = [
// //     {
// //       name: "BAVET",
// //       description: "Restaurant Business",
// //       imageSrc: portfolioimgaes7,
// //       url: "https://bavet.eu/",
// //     },
// //     {
// //       name: "SIGHTBOX",
// //       description: "Branding Agency",
// //       imageSrc: portfolioimgaes8,
// //       url: "https://sightbox.co/",
// //     },
// //     {
// //       name: "GIGANTIC CANDY",
// //       description: "Ecommerce",
// //       imageSrc: portfolioimgaes9,
// //       url: "https://giganticcandy.com/",
// //     },
// //     {
// //       name: "DAYAWAY",
// //       description: "Travel Membership",
// //       imageSrc: portfolioimgaes10,
// //       url: "https://www.mydayaway.com/",
// //     },
// //     {
// //       name: "ARCH - Motorcycle",
// //       description: "Automobile",
// //       imageSrc: portfolioimgaes11,
// //       url: "https://archmotorcycle.com/",
// //     },
// //   ];

// //   return (
// //     <div
// //       id="portfolio-section"
// //       className="min-h-screen bg-[#282828] flex flex-col justify-center items-center p-8"
// //     >
// //       <div className="container mx-auto px-4 py-8 sm:py-16 max-w-7xl">
// //         <h1 className="fontmycustom text-4xl sm:text-6xl lg:text-9xl mb-8 sm:mb-16 text-center text-[#e2dcc8] flex justify-center items-center">
// //           <span ref={headingRef} className="inline-block">
// //             PORT
// //           </span>
// //           <span
// //             ref={strokeRef}
// //             className="inline-block bg-businees text-stroke"
// //           >
// //             FOLIO
// //           </span>
// //         </h1>

// //         <div className="space-y-24">
// //           {projects.map((project, index) => (
// //             <div
// //               key={index}
// //               ref={addToRefs}
// //               className={`flex flex-col md:flex-row items-center justify-between  gap-8 md:gap-16 portfoliopage-project-container ${
// //                 index % 2 === 0
// //                   ? "portfoliopage-project-container-one"
// //                   : "portfoliopage-project-container-two"
// //               }`}
// //               onClick={() => window.open(project.url, "_blank")}
// //             >
// //               <div
// //                 className={`w-full md:w-1/2 portfoliopage-project-text-container text-center items-center justify-center text-[#e2dcc8] flex flex-col ${
// //                   index % 2 === 0
// //                     ? "items-start md:order-1"
// //                     : "items-end md:order-2"
// //                 }`}
// //               >
// //                 <h2 className="text-4xl font-bold mb-4 text-center">
// //                   {project.name}
// //                 </h2>
// //                 <p className="text-xl mb-4">{project.description}</p>
// //                 <img
// //                   src={arrowimage}
// //                   alt="arrow"
// //                   className={`w-8 h-8  ${
// //                     index % 2 !== 0 ? "transform rotate-180" : ""
// //                   }`}
// //                 />
// //               </div>
// //               <div
// //                 className={`w-full md:w-1/2 portfoliopage-project-image-container ${
// //                   index % 2 === 0 ? "md:order-2" : "md:order-1"
// //                 }`}
// //               >
// //                 <img
// //                   src={project.imageSrc}
// //                   alt={project.name}
// //                   className="w-full "
// //                 />
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Portfolio;
