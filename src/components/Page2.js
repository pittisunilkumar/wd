import React, { useEffect, useRef, useState } from "react";
import animation from "../assets/animate.gif";
import "../styles/Page2.css";

const Page2 = () => {
  const [isInView, setIsInView] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isVivoMobileBrowser, setIsVivoMobileBrowser] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkVivoMobileBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /vivo/.test(userAgent);
    };

    setIsVivoMobileBrowser(checkVivoMobileBrowser());

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleResize = () => {
      // Use setTimeout to ensure we get the correct height after any browser UI adjustments
      setTimeout(() => {
        setViewportHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Initial call to set the correct height
    handleResize();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const getAnimationClass = (baseClass) => {
    return `${baseClass} ${isInView ? "animate" : ""}`;
  };

  const containerStyle = {
    minHeight: isVivoMobileBrowser ? `calc(${viewportHeight}px - 56px)` : `${viewportHeight}px`,
    paddingBottom: isVivoMobileBrowser ? '72px' : undefined,
  };

  return (
    <div
      ref={sectionRef}
      id="page2"
      className="flex-none w-screen md:w-[120vw] lg:w-[140vw] bg-[#2b2a2a] relative overflow-hidden md:-ml-[10vw] lg:-ml-[20vw]"
      style={containerStyle}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] transform rotate-[37deg]">
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
                top: '-100%',
                bottom: '-100%',
              }}
            ></div>
          ))}
        </div>
      </div>

      <div 
        className="relative z-10 w-full flex flex-col justify-center p-4 pb-16 sm:p-6 sm:pb-20 md:p-8 md:pb-8 lg:p-12 overflow-hidden"
        style={containerStyle}
      >
        <div className="w-full max-w-7xl mx-auto my-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 text-white md:pr-4 lg:pr-8 mb-8 md:mb-0">
              <h1
                className={getAnimationClass(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight mb-2 bg-businees fontmycustom animate-slide-down"
                )}
              >
                LET'S BEND
              </h1>

              <h1
                className={getAnimationClass(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight mb-4 text-stroke bg-businees fontmycustom animate-right-to-left"
                )}
                style={{
                  WebkitTextStroke: "1px #e2dcc8",
                  color: "transparent",
                  background: "none",
                }}
              >
                DESIGN
              </h1>
              <p
                className={getAnimationClass(
                  "ptagfont text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 bg-businees animate-slide-up-1"
                )}
              >
                Your digital footprint starts with creating a rock-solid
                website. First impressions do Last - So Let's Make It Last!
                Don't let anyone define You. It's Time to Create Your Own
                Signature.
              </p>
              <p
                className={getAnimationClass(
                  "ptagfont text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 bg-businees animate-slide-up-1"
                )}
              >
                An experience where your business goals, branding & marketing
                efforts align like bent wood. A narrative carefully crafted for
                a natural experience. A website with your local & global reach
                is born.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center mt-4 sm:mt-8 md:mt-0">
              <img
                src={animation}
                alt="Animated Design"
                className={getAnimationClass(
                  "w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] h-auto object-contain bg-transparent animate-left-to-right"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;