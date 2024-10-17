import React, { useState, useEffect, useRef } from "react";

const TransitionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-36 bg-[#2b2a2a] min-h-[400px] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ transform: "rotate(45deg) scale(2.5)" }}
      >
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="line absolute w-px h-[200%] bg-white/10 -top-1/2"
            style={{ left: `${index * 5}%` }}
          ></div>
        ))}
      </div>
      <div className="relative flex justify-center w-full">
        <span
          className={`px-4 text-4xl text-[#e2dcc8] font-light text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 blur-none" : "opacity-0 blur-md"
          }`}
        >
          The team is the compass, and our teamwork charts the
          <br />
          course to your success!
        </span>
      </div>
    </div>
  );
};

export default TransitionSection;

// import React from 'react';

// const TransitionSection = () => {
//   return (
//     <div className="relative py-36 bg-[#2b2a2a] min-h-[400px] flex items-center overflow-hidden">
//       <div className="absolute inset-0" style={{ transform: 'rotate(45deg) scale(2.5)' }}>
//         {[...Array(20)].map((_, index) => (
//           <div
//             key={index}
//             className="line absolute w-px h-[200%] bg-white/10 -top-1/2"
//             style={{ left: `${index * 5}%` }}
//           ></div>
//         ))}
//       </div>
//       <div className="relative flex justify-center w-full">
//         <span className="px-4 text-4xl text-[#e0e0e0] font-light text-center">
//           The team is the compass, and our teamwork charts the<br />
//           course to your success!
//         </span>
//       </div>
//     </div>
//   );
// };

// export default TransitionSection;
