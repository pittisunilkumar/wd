import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedText = ({ children, className, variants, delay = 0 }) => (
  <motion.div variants={variants} custom={delay} className={className}>
    {children}
  </motion.div>
);

const Page4 = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay) => ({
      opacity: 1,
      transition: { duration: 1.5, delay },
    }),
  };

  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: (delay) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay },
    }),
  };

  const slideFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, delay },
    }),
  };

  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: (delay) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 2, delay },
    }),
  };

  return (
    <motion.div
      ref={ref}
      id="page4"
      className="flex-none w-screen lg:w-[90vw] h-screen bg-white relative z-10 overflow-visible lg:-ml-[30vw]"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Ripple buttons only rendered on larger screens */}
      {typeof window !== "undefined" && window.innerWidth >= 1024 && (
        <div className="ripple-buttons absolute w-96 h-96 top-1/3 left-[15%] z-0">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      )}

      <div className="lg:hidden flex flex-col min-h-screen relative z-10 p-4 sm:p-6 md:p-8 items-center text-center">
        <div className="mb-8 sm:mb-12 max-w-md">
          <AnimatedText
            className="text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-4 fontmycustom"
            variants={slideFromLeft}
          >
            WHO
          </AnimatedText>
          <AnimatedText
            className="ptagfont text-sm sm:text-base text-gray-600"
            variants={fadeIn}
            delay={0.2}
          >
            "We're a crew of digital wizards - web devs, SEO geeks, social media
            mavens, and content creators -turning online ideas into epic digital
            experiences. With a blend of creativity, AI and tech magic, we make
            your brand shine!"
          </AnimatedText>
        </div>

        <div className="mb-8 sm:mb-12 max-w-md">
          <AnimatedText
            className="text-4xl sm:text-5xl md:text-6xl page4-stroke mb-4 fontmycustom"
            variants={slideFromTop}
            delay={0.4}
          >
            WE
          </AnimatedText>
          <AnimatedText
            className="ptagfont text-sm sm:text-base text-gray-600"
            variants={fadeIn}
            delay={0.6}
          >
            "We believe branding, design, development, content and visuals
            should be aligned and combined with the latest technological
            advancements for business creation."
          </AnimatedText>
        </div>

        <div className="max-w-md">
          <AnimatedText
            className="text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-4 fontmycustom"
            variants={slideFromRight}
            delay={0.8}
          >
            ARE
          </AnimatedText>
          <AnimatedText
            className="ptagfont text-sm sm:text-base text-gray-600"
            variants={fadeIn}
            delay={1}
          >
            "We combine Website creation with a passion for Digital marketing.
            They go hand in hand like teenagers in love. It's an inseparable
            relationship."
          </AnimatedText>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto px-8 relative z-10">
        {/* Desktop content remains unchanged */}
        <div className="absolute top-16 left-[25%] right-8 flex items-start">
          <AnimatedText
            className="text-9xl xl:text-10xl fontmycustom text-gray-800 mr-8"
            variants={slideFromLeft}
          >
            WHO
          </AnimatedText>
          <AnimatedText
            className="flex-1 text-gray-600 text-lg mt-8 pr-8"
            variants={fadeIn}
            delay={0.2}
          >
            "We're a crew of digital wizards - web devs, SEO geeks, social media
            mavens, and content creators -turning online ideas into epic digital
            experiences. With a blend of creativity, AI and tech magic, we make
            your brand shine!"
          </AnimatedText>
        </div>

        <div className="absolute top-1/2 ml-12 left-2/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center w-full">
          <div className="flex-1"></div>
          <AnimatedText
            className="text-9xl xl:text-10xl page4-stroke mr-8 fontmycustom"
            variants={slideFromTop}
            delay={0.5}
          >
            WE
          </AnimatedText>
          <AnimatedText
            className="flex-1 text-gray-600 text-lg pr-16"
            variants={fadeIn}
            delay={1}
          >
            "We believe branding, design, development, content and visuals
            should be aligned and combined with the latest technological
            advancements for business creation."
          </AnimatedText>
        </div>

        <div className="absolute bottom-16 left-[25%] right-16 flex items-center justify-end">
          <AnimatedText
            className="flex-1 text-gray-600 text-lg text-left pl-8"
            variants={fadeIn}
            delay={1.2}
          >
            "We combine Website creation with a passion for Digital marketing.
            They go hand in hand like teenagers in love. It's an inseparable
            relationship."
          </AnimatedText>
          <AnimatedText
            className="text-9xl xl:text-10xl fontmycustom text-gray-800 pl-8"
            variants={slideFromRight}
            delay={1.5}
          >
            ARE
          </AnimatedText>
        </div>
      </div>
    </motion.div>
  );
};

export default Page4;