import React from "react";
import backgroundImage from "../assets/waves.gif";
import wletter from "../assets/removebg.png";
import dletter from "../assets/logo_d.svg";

const Page1 = () => {
  return (
    <div
      id="page1"
      className="gradient-overlay  flex-none w-screen h-screen md:w-[110vw] lg:w-[120vw] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 order-2 lg:order-1 text-center lg:text-left">
                {/* Text content remains unchanged */}
                <h1 className="blend text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl fontmycustom opacity-0 transform translate-y-full animate-slide-up-1">
                  A BUSINESS
                </h1>

                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl blend text-stroke bg-abusinees fontmycustom opacity-0 transform translate-y-full animate-slide-up-2"
                  style={{
                    WebkitTextStroke: "1px #e2dcc8",
                    color: "transparent",
                    background: "none",
                  }}
                >
                  CREATION
                </h1>

                <h1 className="blend text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl bg-businees fontmycustom opacity-0 transform translate-y-full animate-slide-up-3">
                  AGENCY
                </h1>

                <h6 className="blend ptagfont text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2 sm:mt-3 md:mt-4 opacity-0 bg-abusinees transform -translate-x-full animate-slide-in">
                  An AI focused team on a mission for your{" "}
                  <br className="hidden sm:inline" />
                  Web development & Digital Marketing needs.
                </h6>
              </div>

              <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2">
                <h2 className="blend text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-abusinees fontmycustom text-center w-full">
                  WEBDADDY
                </h2>

                {/* Logo section - keeping desktop version unchanged */}
                {/* <div className="flex items-center justify-center opacity-0 transform translate-y-full animate-slide-up-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                    <img
                      src={wletter}
                      alt="W"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-14 h-14 sm:w-100 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center -ml-2 sm:-ml-3 md:-ml-4">
                    <img
                      src={dletter}
                      alt="D"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div> */}

                <div className="flex items-center justify-center opacity-0 transform translate-y-full animate-slide-up-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                    <img
                      src={wletter}
                      alt="W"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h5 className="bg-businees blend ptagfont text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg opacity-0 transform translate-y-full animate-slide-up-5">
                  Like waves carve and etch their story on the shore, we sculpt
                  your enduring digital identity.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
