import React, { useEffect, useRef, useState } from "react";
import "../styles/About.css";

const About = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSections, setAnimatedSections] = useState({
    about: false,
    us: false,
    vision: false,
    mission: false,
    focus: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          // Reset animations when component is out of view
          setAnimatedSections({
            about: false,
            us: false,
            vision: false,
            mission: false,
            focus: false,
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const sections = ["about", "us", "vision", "mission", "focus"];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setAnimatedSections((prev) => ({ ...prev, [section]: true }));
        }, index * 300); // 300ms delay between each section
      });
    }
  }, [isVisible]);

  const getAnimationClass = (section) => {
    return animatedSections[section]
      ? "animate-slide-in"
      : "opacity-0 translate-y-10";
  };

  return (
    <div
      ref={containerRef}
      className="flex-none w-screen h-screen bg-[#333] text-[#e3ddc8] font-['Inter',sans-serif] relative z-10 overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="vertical-text-container hidden lg:flex absolute left-0 top-0 bottom-0 items-center">
          <div
            className={`vertical-text text-[10vw] xl:text-[10rem] bg-abusinees fontmycustom transition-all duration-500 ${getAnimationClass(
              "about"
            )}`}
          >
            About
          </div>
        </div>
        <div className="w-full max-w-[90vw] mx-auto flex flex-col justify-between h-full lg:ml-[15vw]">
          <div
            className={`lg:hidden text-4xl sm:text-5xl md:text-6xl mb-4 bg-abusinees fontmycustom transition-all duration-500 ${getAnimationClass(
              "about"
            )}`}
          >
            About Us
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8 flex-grow">
            <div className="flex flex-col justify-start lg:justify-center">
              <h1
                className={`text-sm sm:text-base md:text-lg font-normal mb-2 lg:mb-4 transition-all duration-500 ${getAnimationClass(
                  "us"
                )}`}
              >
                We dream, think, design, engineer, learn and build like artists.
                And we are hellbent on creating the best digital experiences in
                the world for our clients.
              </h1>
              <p
                className={`hidden lg:block text-[10vw] xl:text-[9rem] text-stroke leading-none fontmycustom transition-all duration-500 ${getAnimationClass(
                  "us"
                )}`}
                style={{
                  WebkitTextStroke: "1px #e2dcc8",
                  color: "transparent",
                  background: "none",
                }}
              >
                us
              </p>
            </div>

            <div className="flex flex-col justify-start lg:justify-center">
              <div className="space-y-2 lg:space-y-4">
                <div
                  className={`transition-all duration-500 ${getAnimationClass(
                    "vision"
                  )}`}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
                    Vision
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base">
                    Our vision is to ride on emergent technologies and be a
                    leader & innovator in creating user experiences.
                  </p>
                </div>
                <div
                  className={`transition-all duration-500 ${getAnimationClass(
                    "mission"
                  )}`}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
                    Mission
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base">
                    Our mission is to solve your user experience. Easily said
                    than done. That means we have to reimagine, disrupt status
                    quos, find elegant and thoughtful digital solutions on how
                    people interact with brands. To uncover values others can't
                    in an everchanging technology landscape.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col justify-start lg:justify-center transition-all duration-500 ${getAnimationClass(
                "focus"
              )}`}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
                Our Focus
              </h3>
              <p className="text-xs sm:text-sm md:text-base w-3/4 lg:w-2/3">
                We want to humanize the digital process. Infectious creativity
                to create natural platforms for seamless communication and
                experience. Decoding the code. Code only necessary scripts and
                code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
// import React, { useEffect, useRef, useState } from "react";
// import "../styles/About.css";

// const About = () => {
//   const aboutRef = useRef(null);
//   const usRef = useRef(null);
//   const visionRef = useRef(null);
//   const missionRef = useRef(null);
//   const focusRef = useRef(null);
//   const containerRef = useRef(null);
//   const [animationKey, setAnimationKey] = useState(0);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setAnimationKey((prevKey) => prevKey + 1);
//         }
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold: 0.1,
//       }
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="flex-none w-screen h-screen bg-[#333] text-[#e3ddc8] font-['Inter',sans-serif] relative z-10 overflow-hidden"
//     >
//       <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
//         <div className="vertical-text-container hidden lg:flex absolute left-0 top-0 bottom-0 items-center">
//           <div
//             ref={aboutRef}
//             className="vertical-text text-[10vw] xl:text-[10rem] bg-abusinees fontmycustom animate-slide-in reverse-text"
//             key={`about-${animationKey}`}
//           >
//             About
//           </div>
//         </div>
//         {/* <div className="vertical-text-container hidden lg:flex absolute left-0 top-0 bottom-0 items-center">
//           <div
//             ref={aboutRef}
//             className="vertical-text text-[10vw] xl:text-[10rem] bg-abusinees fontmycustom animate-slide-in reverse-text"
//             key={`about-${animationKey}`}
//           >
//             About
//           </div>
//         </div> */}
//         <div className="w-full max-w-[90vw] mx-auto flex flex-col justify-between h-full lg:ml-[15vw]">
//           <div
//             className="lg:hidden text-4xl sm:text-5xl md:text-6xl mb-4 bg-abusinees fontmycustom animate-slide-in reverse-text "
//             key={`about-us-${animationKey}`}
//           >
//             About Us
//           </div>
//           {/* Rest of the component remains the same */}
//           <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8 flex-grow">
//             <div
//               ref={usRef}
//               className="flex flex-col justify-start lg:justify-center"
//             >
//               <h1
//                 className="text-sm sm:text-base md:text-lg font-normal mb-2 lg:mb-4 bg-abusinees animate-slide-in"
//                 key={`us-h1-${animationKey}`}
//               >
//                 We dream, think, design, engineer, learn and build like artists.
//                 And we are hellbent on creating the best digital experiences in
//                 the world for our clients.
//               </h1>
//               <p
//                 className="hidden lg:block text-[10vw] xl:text-[9rem] text-stroke leading-none fontmycustom bg-abusinees animate-slide-in"
//                 key={`us-p-${animationKey}`}
//                 style={{
//                   WebkitTextStroke: "1px #e2dcc8",
//                   color: "transparent",
//                   background: "none",
//                 }}
//               >
//                 us
//               </p>
//             </div>

//             <div className="flex flex-col justify-start lg:justify-center">
//               <div className="space-y-2 lg:space-y-4">
//                 <div
//                   ref={visionRef}
//                   className="bg-abusinees animate-slide-in"
//                   key={`vision-${animationKey}`}
//                 >
//                   <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
//                     Vision
//                   </h3>
//                   <p className="text-xs sm:text-sm md:text-base">
//                     Our vision is to ride on emergent technologies and be a
//                     leader & innovator in creating user experiences.
//                   </p>
//                 </div>
//                 <div
//                   ref={missionRef}
//                   className="bg-abusiness animate-slide-in"
//                   key={`mission-${animationKey}`}
//                 >
//                   <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
//                     Mission
//                   </h3>
//                   <p className="text-xs sm:text-sm md:text-base">
//                     Our mission is to solve your user experience. Easily said
//                     than done. That means we have to reimagine, disrupt status
//                     quos, find elegant and thoughtful digital solutions on how
//                     people interact with brands. To uncover values others can't
//                     in an everchanging technology landscape.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div
//               ref={focusRef}
//               className="flex flex-col justify-start lg:justify-center animate-slide-in"
//               key={`focus-${animationKey}`}
//             >
//               <h3 className="text-3xl sm:text-4xl md:text-5xl fontmycustom mb-1 lg:mb-2">
//                 Our Focus
//               </h3>
//               <p className="text-xs sm:text-sm md:text-base w-3/4 lg:w-2/3">
//                 We want to humanize the digital process. Infectious creativity
//                 to create natural platforms for seamless communication and
//                 experience. Decoding the code. Code only necessary scripts and
//                 code.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
