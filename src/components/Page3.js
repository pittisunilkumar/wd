import React, { useEffect, useRef } from "react";
import car from "../assets/formulasCarimg.svg";

const Page3 = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      pageRef.current.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      ref={pageRef}
      id="page3"
      className="flex-none w-screen lg:w-[200vw] h-screen bg-[#292929] relative z-10 overflow-hidden flex items-center lg:-ml-[10vw]"
      style={{
        padding: "0", // Default padding for desktop
      }}
    >
      <style>
        {`
          /* Mobile devices (max-width: 768px) */
          @media (max-width: 768px) {
            #page3 {
              padding-top: 20px; /* Space above for mobile */
              padding-bottom: 20px; /* Space below for mobile */
            }

            #page3 h1 {
              font-size: 24px; /* Font size for headings on mobile */
            }

            #page3 p {
              font-size: 16px; /* Font size for paragraphs on mobile */
            }
          }

          /* Tablet devices (769px - 1024px) */
          @media (min-width: 769px) and (max-width: 1024px) {
            #page3 {
              padding-top: 40px; /* Space above for tablets */
              padding-bottom: 40px; /* Space below for tablets */
            }

            #page3 h1 {
              font-size: 32px; /* Font size for headings on tablets */
            }

            #page3 p {
              font-size: 18px; /* Font size for paragraphs on tablets */
            }
          }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] transform rotate-[36deg]">
          {[...Array(40)].map((_, index) => (
            <div
              key={index}
              className="line2 absolute w-px h-full bg-white/10 hidden sm:block"
              style={{
                left: `${(index / 40) * 100}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            ></div>
          ))}
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="line2 absolute w-px h-full bg-white/10 sm:hidden"
              style={{
                left: `${(index / 10) * 100}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8 lg:max-w-[90%] xl:max-w-[80%] h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 items-center">
          <div className="text-center lg:text-left animate-on-scroll">
            <h1 className="text-4xl lg:text-[5.5vw] text-[#e2dcc8] fontmycustom mb-2 sm:mb-4 leading-tight mobile-text-adjust">
              IN DIGITAL
              <br />
              MARKETING
              <br />
              <span
                className="text-4xl lg:text-[5.5vw] text-stroke fontmycustom"
                style={{
                  WebkitTextStroke: "2px #e2dcc8",
                  color: "transparent",
                  background: "none",
                }}
              >
                WE "TRUST"
              </span>
            </h1>
            <p className="ptagfont text-lg lg:text-[1.6vw] text-[#e2dcc8] mt-2 sm:mt-8 leading-relaxed lg:text-left mobile-text-adjust">
              Our human-led, AI-powered digital marketing creates trust, builds
              value, and maximizes your ROI for your business.
            </p>
          </div>

          <div className="text-center mb-4 sm:mb-8 lg:mb-16 animate-on-scroll">
            <p className="text-xl lg:text-[2vw] text-[#e2dcc8] mb-2 sm:mb-4 mobile-text-adjust ptagfont">
              We will put you in the driver's seat like a Formula 1 racer. A
              digital marketing team assisting you to win with AI.
            </p>
            <img
              src={car}
              alt="Formula 1 Car"
              className="hidden sm:block w-full max-w-3xl lg:max-w-6xl mx-auto mt-2 sm:mt-5"
            />
          </div>

          <div className="text-center lg:mr-8 xl:mr-12 animate-on-scroll">
            <h1 className="text-4xl lg:text-[5.5vw] text-[#e2dcc8] fontmycustom mb-2 sm:mb-3 leading-tight mobile-text-adjust">
              OFF TO THE
              <br />
              <span
                className="text-4xl lg:text-[5.5vw] text-stroke fontmycustom"
                style={{
                  WebkitTextStroke: "2px #e2dcc8",
                  color: "transparent",
                  background: "none",
                }}
              >
                RACES!
              </span>
            </h1>
            <p className=" ptagfont text-lg lg:text-[1.6vw] text-[#e2dcc8] mt-2 sm:mt-8 leading-relaxed mobile-text-adjust">
              It's not enough to win races. Like race cars,
              <br className="hidden sm:inline" />
              you have to keep your website primed for action.
              <br className="hidden sm:inline" />
              Ready to take on any challenges that come your way!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;

// import React, { useEffect, useRef } from "react";
// import car from "../assets/formulasCarimg.svg";

// const Page3 = () => {
//   const pageRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate");
//           } else {
//             entry.target.classList.remove("animate");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const animatedElements =
//       pageRef.current.querySelectorAll(".animate-on-scroll");
//     animatedElements.forEach((el) => observer.observe(el));

//     return () => {
//       animatedElements.forEach((el) => observer.unobserve(el));
//     };
//   }, []);

//   return (
//     <div
//       ref={pageRef}
//       id="page3"
//       className="flex-none w-screen lg:w-[200vw] h-screen bg-[#292929] relative z-10 overflow-hidden flex items-center lg:-ml-[10vw]"
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] transform rotate-[36deg]">
//           {[...Array(40)].map((_, index) => (
//             <div
//               key={index}
//               className="line2 absolute w-px h-full bg-white/10 hidden sm:block"
//               style={{
//                 left: `${(index / 40) * 100}%`,
//                 animationDelay: `${index * 0.1}s`,
//               }}
//             ></div>
//           ))}
//           {[...Array(10)].map((_, index) => (
//             <div
//               key={index}
//               className="line2 absolute w-px h-full bg-white/10 sm:hidden"
//               style={{
//                 left: `${(index / 10) * 100}%`,
//                 animationDelay: `${index * 0.1}s`,
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-4 sm:py-8 lg:max-w-[90%] xl:max-w-[80%] h-full flex flex-col justify-center">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 items-center">
//           <div className="text-center lg:text-left animate-on-scroll">
//             <h1 className="text-4xl lg:text-[5.5vw] text-[#e2dcc8] fontmycustom mb-2 sm:mb-4 leading-tight mobile-text-adjust">
//               IN DIGITAL
//               <br />
//               MARKETING
//               <br />
//               <span
//                 className="text-4xl lg:text-[5.5vw] text-stroke fontmycustom"
//                 style={{
//                   WebkitTextStroke: "2px #e2dcc8",
//                   color: "transparent",
//                   background: "none",
//                 }}
//               >
//                 WE "TRUST"
//               </span>
//             </h1>
//             <p className="text-lg lg:text-[1.6vw] text-[#e2dcc8] mt-2 sm:mt-8 leading-relaxed lg:text-left mobile-text-adjust">
//               Our human-led, AI-powered digital marketing creates trust, builds
//               value, and maximizes your ROI for your business.
//             </p>
//           </div>

//           <div className="text-center mb-4 sm:mb-8 lg:mb-16 animate-on-scroll">
//             <p className="text-xl lg:text-[2vw] text-[#e2dcc8] mb-2 sm:mb-4 mobile-text-adjust">
//               We will put you in the driver's seat like a Formula 1 racer. A
//               digital marketing team assisting you to win with AI.
//             </p>
//             <img
//               src={car}
//               alt="Formula 1 Car"
//               className="hidden sm:block w-full max-w-3xl lg:max-w-6xl mx-auto mt-2 sm:mt-5"
//             />
//           </div>

//           <div className="text-center lg:mr-8 xl:mr-12 animate-on-scroll">
//             <h1 className="text-4xl lg:text-[5.5vw] text-[#e2dcc8] fontmycustom mb-2 sm:mb-3 leading-tight mobile-text-adjust">
//               OFF TO THE
//               <br />
//               <span
//                 className="text-4xl lg:text-[5.5vw] text-stroke fontmycustom"
//                 style={{
//                   WebkitTextStroke: "2px #e2dcc8",
//                   color: "transparent",
//                   background: "none",
//                 }}
//               >
//                 RACES!
//               </span>
//             </h1>
//             <p className="text-lg lg:text-[1.6vw] text-[#e2dcc8] mt-2 sm:mt-8 leading-relaxed mobile-text-adjust">
//               It's not enough to win races. Like race cars,
//               <br className="hidden sm:inline" />
//               you have to keep your website primed for action.
//               <br className="hidden sm:inline" />
//               Ready to take on any challenges that come your way!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page3;
