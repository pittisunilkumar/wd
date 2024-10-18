import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EarthGIF from "../../assets/black_global_Video.gif";
import WavesGIF from "../../assets/waves.gif";
// import Footer from "./Footer";
import Socialmedia from "./SocialButtons";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  const countryCodes = [
    { code: "+65", country: "Singapore" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+81", country: "Japan" },
  ];

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [showEarth, setShowEarth] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let earthTimeout, contentTimeout;

    if (inView && !animationComplete) {
      setShowEarth(true);
      setShowContent(false);

      earthTimeout = setTimeout(() => {
        setShowEarth(false);
        contentTimeout = setTimeout(() => {
          setShowContent(true);
          setAnimationComplete(true);
        }, 1000);
      }, 2000);
    } else if (!inView && animationComplete) {
      setShowEarth(true);
      setShowContent(false);
      setAnimationComplete(false);
    }

    return () => {
      clearTimeout(earthTimeout);
      clearTimeout(contentTimeout);
    };
  }, [inView, animationComplete]);

  return (
    <>
      <div
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={WavesGIF}
            alt="Background"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          />
        </div>

        {/* Earth Image */}
        <div className={`earth-container ${showEarth ? "show" : "hide"}`}>
          <div className="earth-wrapper">
            <img src={EarthGIF} alt="Earth GIF" className="earth-gif" />
          </div>
        </div>

        <header className="mb-10 sm:mb-20 text-center overflow-hidden blend22">
          <h1 className="blend22 text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block">
            <span
              className={`fontmycustom mr-2 blend22 inline-block transition-transform duration-1000 ${
                showContent ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              CONTACT
            </span>
            <span
              className={`fontmycustom ml-2 blend22 text-stroke bg-abusinees inline-block transition-transform duration-1000 ${
                showContent ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ WebkitTextStrokeColor: "#e2dcc8" }}
            >
              US
            </span>
          </h1>
        </header>

        <div
          className={`contact-content-wrapper ${showContent ? "fade-in" : ""}`}
        >
          <div className="contact-content">
            <div className="contact-info ptagfont">
              <div className="contact-item">
                <MapPin size={24} />
                <span>
                  22 Sin Ming Lane, #06-76 Midview City, Singapore 573969.
                </span>
              </div>
              <div className="contact-item">
                <Mail size={24} />
                <span>support@webdaddy.sg</span>
              </div>
              <div className="contact-item">
                <Phone size={24} />
                <span>+65-88061007</span>
              </div>
            </div>

            <div className="contact-form ptagfont">
              <form>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="email" placeholder="Email" required />
                <div className="phone-input">
                  <select className="country-code" required>
                    <option value="">Country Code</option>
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.country} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input type="tel" placeholder="Phone Number" required />
                </div>
                <textarea placeholder="Your Message" required></textarea>
                <div className="button-container">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className="social-media-wrapper">
            <Socialmedia />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

// import React, { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import contactbgimage from "../../assets/waves.gif";
// import ctearthimage from "../../assets/black_global_Video.gif";
// import { MapPin, Mail, Phone } from "lucide-react";
// import Socialmedia from "./SocialButtons";

// const Contact = () => {
//   const [showContent, setShowContent] = useState(false);
//   const [showEarthGif, setShowEarthGif] = useState(true);
// const countryCodes = [
//   { code: "+65", country: "Singapore" },
//   { code: "+1", country: "USA" },
//   { code: "+44", country: "UK" },
//   { code: "+91", country: "India" },
//   { code: "+81", country: "Japan" },
// ];

//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     onChange: (inView) => {
//       if (inView) {
//         setShowEarthGif(true);
//         setShowContent(false);
//         setTimeout(() => {
//           setShowContent(true);
//           setShowEarthGif(false);
//         }, 2000); // 2 seconds before hiding Earth GIF
//       }
//     },
//   });

//   return (
//     <div className="contact-container" ref={ref}>
//       {showEarthGif && (
//         <img src={ctearthimage} alt="Earth GIF" className="earth-gif" />
//       )}
//       <img
//         src={contactbgimage}
//         alt="Contact Background"
//         className="contact-image"
//       />

//       <div
//         className={`contact-content-wrapper ${showContent ? "fade-in" : ""}`}
//       >
//         <h1 className={`contact-heading blend ${showContent ? "animate" : ""}`}>
//           <span className={`contact-text`}>Contact</span>{" "}
//           <span className={`us-text`}>
//             <span className="us-text-stroke">US</span>
//           </span>
//         </h1>

//         <div className="contact-content">
//           <div className="contact-info">
//             <div className="contact-item">
//               <MapPin size={24} />
//               <span>123 Main St, City, Country, 12345</span>
//             </div>
//             <div className="contact-item">
//               <Mail size={24} />
//               <span>example@example.com</span>
//             </div>
//             <div className="contact-item">
//               <Phone size={24} />
//               <span>+1234567890</span>
//             </div>
//           </div>

//           <div className="contact-form">
//             <form>
//               <input type="text" placeholder="First Name" required />
//               <input type="text" placeholder="Last Name" required />
//               <input type="email" placeholder="Email" required />
//               <div className="phone-input">
//                 <select className="country-code" required>
//                   <option value="">Country Code</option>
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.country} ({country.code})
//                     </option>
//                   ))}
//                 </select>
//                 <input type="tel" placeholder="Phone Number" required />
//               </div>
//               <textarea placeholder="Your Message" required></textarea>
//               <div className="button-container">
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="social-media-wrapper">
//           <Socialmedia />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

// import React from "react";
// import { useInView } from "react-intersection-observer";
// import contactbgimage from "../../assets/waves.gif";
// import ctearthimage from "../../assets/black_global_Video.gif";
// import { MapPin, Mail, Phone } from "lucide-react";
// import Socialmedia from "./SocialButtons";

// const Contact = () => {
//   const countryCodes = [
//     { code: "+65", country: "Singapore" },
//     { code: "+1", country: "USA" },
//     { code: "+44", country: "UK" },
//     { code: "+91", country: "India" },
//     { code: "+81", country: "Japan" },
//   ];

//   const { ref, inView } = useInView({
//     threshold: 0.1,
//   });

//   return (
//     <div className="contact-container" ref={ref}>
//       <img
//         src={contactbgimage}
//         alt="Contact Background"
//         className="contact-image"
//       />
//       <div className="contact-content-wrapper">
//         <h1 className="contact-heading blend">
//           <span className={`contact-text ${inView ? "animate-left" : ""}`}>
//             Contact
//           </span>{" "}
//           <span className={`us-text ${inView ? "animate-right" : ""}`}>
//             <span className="us-text-stroke">US</span>
//           </span>
//         </h1>

//         <div className="contact-content">
//           <div className="contact-info">
//             <div className="contact-item">
//               <MapPin size={24} />
//               <span>123 Main St, City, Country, 12345</span>
//             </div>
//             <div className="contact-item">
//               <Mail size={24} />
//               <span>example@example.com</span>
//             </div>
//             <div className="contact-item">
//               <Phone size={24} />
//               <span>+1234567890</span>
//             </div>
//           </div>

//           <div className="contact-form">
//             <form>
//               <input type="text" placeholder="First Name" required />
//               <input type="text" placeholder="Last Name" required />
//               <input type="email" placeholder="Email" required />
//               <div className="phone-input">
//                 <select className="country-code" required>
//                   <option value="">Country Code</option>
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.country} ({country.code})
//                     </option>
//                   ))}
//                 </select>
//                 <input type="tel" placeholder="Phone Number" required />
//               </div>
//               <textarea placeholder="Your Message" required></textarea>
//               <div className="button-container">
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="social-media-wrapper">
//           <Socialmedia />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
// import React from "react";
// import { useInView } from "react-intersection-observer";
// import contactbgimage from "../../assets/waves.gif";
// import earthcontactpage from "../../assets/black_global_Video.gif";
// import { MapPin, Mail, Phone } from "lucide-react";
// import Socialmedia from "./SocialButtons";

// const Contact = () => {
//   const countryCodes = [
//     { code: "+65", country: "Singapore" },
//     { code: "+1", country: "USA" },
//     { code: "+44", country: "UK" },
//     { code: "+91", country: "India" },
//     { code: "+81", country: "Japan" },
//     // Add more country codes as needed
//   ];

//   const { ref, inView } = useInView({
//     threshold: 0.1, // Trigger when 10% of the component is visible
//   });

//   return (
//     <div className="contact-container" ref={ref}>
//       <img
//         src={contactbgimage}
//         alt="Contact Background"
//         className="contact-image"
//       />
//       <h1 className="contact-heading blend">
//         <span className={`contact-text ${inView ? "animate-left" : ""}`}>
//           Contact
//         </span>{" "}
//         <span className={`us-text ${inView ? "animate-right" : ""}`}>
//           <span
//             style={{
//               WebkitTextStroke: "2px #e2dcc8",
//               color: "transparent",
//               background: "none",
//               position: "relative",
//             }}
//           >
//             US
//           </span>
//         </span>
//       </h1>

//       <div className="contact-content">
//         <div className="contact-info">
//           <div className="contact-item">
//             <MapPin size={24} />
//             <span>123 Main St, City, Country, 12345</span>
//           </div>
//           <div className="contact-item">
//             <Mail size={24} />
//             <span>example@example.com</span>
//           </div>
//           <div className="contact-item">
//             <Phone size={24} />
//             <span>+1234567890</span>
//           </div>
//         </div>

//         <div className="contact-form">
//           <form>
//             <input type="text" placeholder="First Name" required />
//             <input type="text" placeholder="Last Name" required />
//             <input type="email" placeholder="Email" required />
//             <div className="phone-input">
//               <select className="country-code" required>
//                 <option value="">Country Code</option>
//                 {countryCodes.map((country) => (
//                   <option key={country.code} value={country.code}>
//                     {country.country} ({country.code})
//                   </option>
//                 ))}
//               </select>
//               <input type="tel" placeholder="Phone Number" required />
//             </div>
//             <textarea placeholder="Your Message" required></textarea>
//             <div className="button-container">
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Socialmedia />
//     </div>
//   );
// };

// export default Contact;

// import React from "react";
// import contactbgimage from "../../assets/waves.gif";

// const Contact = () => {
//   return (
//     <div className="contact-container">
//       <img
//         src={contactbgimage}
//         alt="Contact Background"
//         className="contact-image"
//       />
//       <h1 className="contact-heading">Contact Us</h1>
//     </div>
//   );
// };

// export default Contact;

// import React, { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import EarthGIF from "../../assets/black_global_Video.gif";
// import WavesGIF from "../../assets/waves.gif";
// // import Footer from "./Footer";
// import Socialmedia from "./SocialButtons";

// const Contact = () => {
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const [showEarth, setShowEarth] = useState(true);
//   const [showContent, setShowContent] = useState(false);
//   const [animationComplete, setAnimationComplete] = useState(false);

//   useEffect(() => {
//     let earthTimeout, contentTimeout;

//     if (inView && !animationComplete) {
//       setShowEarth(true);
//       setShowContent(false);

//       earthTimeout = setTimeout(() => {
//         setShowEarth(false);
//         contentTimeout = setTimeout(() => {
//           setShowContent(true);
//           setAnimationComplete(true);
//         }, 1000);
//       }, 2000);
//     } else if (!inView && animationComplete) {
//       setShowEarth(true);
//       setShowContent(false);
//       setAnimationComplete(false);
//     }

//     return () => {
//       clearTimeout(earthTimeout);
//       clearTimeout(contentTimeout);
//     };
//   }, [inView, animationComplete]);

//   return (
//     <>
//       <div
//         ref={ref}
//         className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
//       >
//         <div className="absolute inset-0">
//           <img
//             src={WavesGIF}
//             alt="Background"
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
//           />
//         </div>

//         {/* Earth Image */}
//         <div className={`earth-container ${showEarth ? "show" : "hide"}`}>
//           <div className="earth-wrapper">
//             <img src={EarthGIF} alt="Earth GIF" className="earth-gif" />
//           </div>
//         </div>

//         <header className="mb-10 sm:mb-20 text-center overflow-hidden blend22">
//           <h1 className="blend22 text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block">
//             <span
//               className={`fontmycustom mr-2 blend22 inline-block transition-transform duration-1000 ${
//                 showContent ? "translate-x-0" : "-translate-x-full"
//               }`}
//             >
//               CONTACT
//             </span>
//             <span
//               className={`fontmycustom ml-2 blend22 text-stroke bg-abusinees inline-block transition-transform duration-1000 ${
//                 showContent ? "translate-x-0" : "translate-x-full"
//               }`}
//               style={{ WebkitTextStrokeColor: "#e2dcc8" }}
//             >
//               US
//             </span>
//           </h1>
//         </header>

//         <div className="container mx-auto px-4 py-8 max-w-6xl relative z-20">
//           <div
//             className={`flex flex-col md:flex-row gap-8 transition-opacity duration-1000 relative z-40 ${
//               showContent ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {/* Contact Information Section */}

//             <div className="w-full md:w-2/5 p-8 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)] text-[#e2dcc8]">
//               {["location", "phone", "email"].map((item, index) => (
//                 <div key={index} className="mb-8">
//                   <svg
//                     className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     {item === "location" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       ></path>
//                     )}
//                     {item === "phone" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       ></path>
//                     )}
//                     {item === "email" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       ></path>
//                     )}
//                   </svg>
//                   <p className="text-center text-sm sm:text-base">
//                     {item === "location" &&
//                       "22 Sin Ming Lane, #06-76 Midview City, Singapore 573969."}
//                     {item === "phone" && "+65-88061007"}
//                     {item === "email" && "support@webdaddy.sg"}
//                   </p>
//                 </div>
//               ))}
//               <Socialmedia />
//             </div>

//             {/* Contact Form Section */}
//             <div className="w-full md:w-4/5 p-8 text-[black] bg-[rgba(0,0,0,0.5)] flex flex-col">
//               <form className="space-y-6 sm:space-y-8 flex-grow flex flex-col justify-between">
//                 <div className="space-y-6 sm:space-y-8 text-[#e2dcc8]">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {["First Name", "Last Name"].map((field, index) => (
//                       <div key={index} className="mb-4 sm:mb-6">
//                         <input
//                           type="text"
//                           placeholder={field}
//                           className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] focus:outline-none focus:border-[#e2dcc8] text-[#e2dcc8] placeholder-[#e2dcc8]"
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mb-4 sm:mb-6">
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] focus:outline-none focus:border-[#e2dcc8] text-[#e2dcc8] placeholder-[#e2dcc8]"
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-4 mb-4 sm:mb-6">
//                     <select
//                       className="w-full bg-[rgba(0,0,0,0.5)] text-[#e2dcc8] border-b border-[#e2dcc8] pb-2 focus:outline-none focus:ring-2 focus:ring-[#e2dcc8]"
//                       defaultValue="+65"
//                     >
//                       <option value="+65" className="bg-[black] text-#e2dcc8">
//                         +65 (Singapore)
//                       </option>
//                       <option value="+1" className="bg-[black] text-#e2dcc8">
//                         +1 (USA)
//                       </option>
//                       <option value="+44" className="bg-[black] text-#e2dcc8">
//                         +44 (UK)
//                       </option>
//                       <option value="+91" className="bg-[black] text-#e2dcc8">
//                         +91 (India)
//                       </option>
//                       <option value="+61" className="bg-[black] text-#e2dcc8">
//                         +61 (Australia)
//                       </option>
//                       <option value="+81" className="bg-[black] text-#e2dcc8">
//                         +81 (Japan)
//                       </option>
//                       <option value="+49" className="bg-[black] text-#e2dcc8">
//                         +49 (Germany)
//                       </option>
//                       <option value="+33" className="bg-[black] text-#e2dcc8">
//                         +33 (France)
//                       </option>
//                       <option value="+39" className="bg-[black] text-#e2dcc8">
//                         +39 (Italy)
//                       </option>
//                     </select>

//                     <input
//                       type="tel"
//                       placeholder="Phone Number"
//                       className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] pt-4 focus:outline-none text-[#e2dcc8] placeholder-[#e2dcc8]"
//                     />
//                   </div>

//                   <div className="mb-4 sm:mb-6">
//                     <textarea
//                       placeholder="Message"
//                       rows="4"
//                       className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] focus:outline-none focus:border-[#e2dcc8] text-[#e2dcc8] placeholder-[#e2dcc8]"
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="flex justify-center">
//                   <button
//                     type="submit"
//                     className="w-1/2 bg-black bg-opacity-20 border border-[#e2dcc8] text-[#e2dcc8] py-2 px-4 hover:bg-[#e2dcc8] hover:text-[black] transition duration-300"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;
{
  /* <div
          className={`absolute inset-0 z-30 transition-opacity duration-2100 pointer-events-none ${
            showEarth ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={EarthGIF}
              alt="Earth GIF"
              className="absolute top-1/2 left-1/2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 object-cover
        min-w-full min-h-full w-auto h-auto max-w-none max-h-none
        sm:max-w-none sm:max-h-none
        md:min-w-full md:min-h-full
        lg:min-w-full lg:min-h-full
        w-[20%] h-[30%] sm:w-auto sm:h-auto"
            />
          </div>
        </div> */
}

{
  /* <div
          className={`absolute inset-0 z-30 transition-opacity duration-2100 pointer-events-none ${
            showEarth ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={EarthGIF}
              alt="Earth GIF"
              className="absolute top-1/2 left-1/2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto max-w-none max-h-none object-cover"
            />
          </div>
        </div> */
}
// import React, { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import EarthGIF from "../../assets/black_global_Video.gif";
// import WavesGIF from "../../assets/waves.gif";
// import Footer from "./Footer";
// import SocialButtons from "./SocialButtons";

// const Contact = () => {
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const [showEarth, setShowEarth] = useState(true);
//   const [showContent, setShowContent] = useState(false);
//   const [animationComplete, setAnimationComplete] = useState(false);

//   useEffect(() => {
//     let earthTimeout, contentTimeout;

//     if (inView && !animationComplete) {
//       setShowEarth(true);
//       setShowContent(false);

//       earthTimeout = setTimeout(() => {
//         setShowEarth(false);
//         contentTimeout = setTimeout(() => {
//           setShowContent(true);
//           setAnimationComplete(true);
//         }, 800);
//       }, 1200);
//     } else if (!inView && animationComplete) {
//       setShowEarth(true);
//       setShowContent(false);
//       setAnimationComplete(false);
//     }

//     return () => {
//       clearTimeout(earthTimeout);
//       clearTimeout(contentTimeout);
//     };
//   }, [inView, animationComplete]);

//   return (
//     <>
//       <div
//         ref={ref}
//         className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
//         style={{
//           backgroundColor: "#000",
//         }}
//       >
//         {/* Base background */}
//         <div
//           className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
//           style={{
//             backgroundImage: `url(${WavesGIF})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         ></div>

//         {/* Waves overlay */}
//         <div
//           className="absolute inset-0 z-10 opacity-50 bg-cover bg-center bg-no-repeat pointer-events-none"
//           style={{
//             backgroundImage: `url(${WavesGIF})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         ></div>

//         {/* Earth Image */}
//         <div
//           className={`absolute inset-0 z-30 transition-opacity duration-1000 pointer-events-none ${
//             showEarth ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="relative w-full h-full">
//             <img
//               src={EarthGIF}
//               alt="Earth GIF"
//               className="absolute top-1/2 left-1/2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto max-w-none max-h-none object-cover"
//             />
//           </div>
//         </div>

//         <header className="mb-10 sm:mb-20 text-center overflow-hidden blend22">
//           <h1 className="blend22 text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block">
//             <span
//               className={`fontmycustom mr-2 blend22 inline-block transition-transform duration-500 ${
//                 showContent ? "translate-x-0" : "-translate-x-full"
//               }`}
//             >
//               CONTACT
//             </span>
//             <span
//               className={`fontmycustom ml-2 blend22 text-stroke bg-abusinees inline-block transition-transform duration-500 ${
//                 showContent ? "translate-x-0" : "translate-x-full"
//               }`}
//               style={{ WebkitTextStrokeColor: "#e2dcc8" }}
//             >
//               US
//             </span>
//           </h1>
//         </header>

//         <div className="container mx-auto px-4 py-8 max-w-6xl relative z-20">
//           <div
//             className={`flex flex-col md:flex-row gap-4 sm:gap-8 bg-black transition-opacity duration-1000 relative z-40 ${
//               showContent ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {/* Map and Address Section */}
//             <div className="w-full md:w-1/3 text-[#e2dcc8] bg-[#2c2b2b] overflow-hidden flex flex-col">
//               <div className="p-4">
//                 <h2 className="font-bold">WEBDADDY</h2>
//                 <p className="text-sm">
//                   22 Sin Ming Ln, #06-76 Midview City,
//                   <br />
//                   Singapore 573969
//                 </p>
//                 <a
//                   href="https://www.google.com/maps/place/Webdaddy/@1.358606,103.833566,1088m/data=!3m1!1e3!4m14!1m7!3m6!1s0x31da17314381ac87:0x17f880b5ad6f542e!2sWebdaddy!8m2!3d1.358606!4d103.833566!16s%2Fg%2F11wc11b3t6!3m5!1s0x31da17314381ac87:0x17f880b5ad6f542e!8m2!3d1.358606!4d103.833566!16s%2Fg%2F11wc11b3t6!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-300 text-sm"
//                 >
//                   Directions
//                 </a>
//               </div>

//               <div className="flex-grow h-48 md:h-auto">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7219.125543886701!2d103.833566!3d1.358606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17314381ac87%3A0x17f880b5ad6f542e!2sWebdaddy!5e1!3m2!1sen!2sin!4v1728825159464!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   allowFullScreen=""
//                   loading="lazy"
//                   style={{
//                     border: 0,
//                     filter: "invert(90%) hue-rotate(180deg)",
//                   }}
//                   className="w-full h-full"
//                 ></iframe>
//               </div>

//               <a
//                 href="https://www.google.com/maps/place/Webdaddy/@1.358606,103.833566,1088m/data=!3m1!1e3!4m14!1m7!3m6!1s0x31da17314381ac87:0x17f880b5ad6f542e!2sWebdaddy!8m2!3d1.358606!4d103.833566!16s%2Fg%2F11wc11b3t6!3m5!1s0x31da17314381ac87:0x17f880b5ad6f542e!8m2!3d1.358606!4d103.833566!16s%2Fg%2F11wc11b3t6!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block p-2 text-center text-blue-300 text-sm"
//               >
//                 View larger map
//               </a>
//             </div>

//             {/* Contact Information Section */}
//             <div className="w-full md:w-1/3 p-8 flex flex-col justify-center items-center bg-[black] text-[#e2dcc8]">
//               {["location", "phone", "email"].map((item, index) => (
//                 <div key={index} className="mb-8">
//                   <svg
//                     className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     {item === "location" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       ></path>
//                     )}
//                     {item === "phone" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       ></path>
//                     )}
//                     {item === "email" && (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       ></path>
//                     )}
//                   </svg>
//                   <p className="text-center text-sm sm:text-base">
//                     {item === "location" &&
//                       "22 Sin Ming Lane, #06-76 Midview City, Singapore 573969."}
//                     {item === "phone" && "+65-88061007"}
//                     {item === "email" && "webdaddy.info@gmail.com"}
//                   </p>
//                 </div>
//               ))}

//               {/* Social Media Buttons */}
//               <SocialButtons />
//             </div>

//             {/* Contact Form Section */}
//             <div className="w-full md:w-1/3 p-4 sm:p-8 text-[#e2dcc8] bg-[#2c2b2b] flex flex-col">
//               <form className="space-y-6 sm:space-y-8 flex-grow flex flex-col justify-between">
//                 <div className="space-y-6 sm:space-y-8 text-[#e2dcc8]">
//                   {["First Name", "Last Name", "Email"].map((field, index) => (
//                     <div key={index} className="mb-4 sm:mb-6">
//                       <input
//                         type={field === "Email" ? "email" : "text"}
//                         placeholder={field}
//                         className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] focus:outline-none focus:border-[#e2dcc8] text-[#e2dcc8] placeholder-[#e2dcc8]"
//                       />
//                     </div>
//                   ))}

//                   <div className="flex flex-col space-y-4 mb-4 sm:mb-6">
//                     <select
//                       className="w-full bg-[#2c2b2b] text-[#e2dcc8] border-b border-[#e2dcc8] pb-2 focus:outline-none focus:ring-2 focus:ring-[#e2dcc8]"
//                       defaultValue="+65"
//                     >
//                       <option value="+65" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +65 (Singapore)
//                       </option>
//                       <option value="+1" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +1 (USA)
//                       </option>
//                       <option value="+44" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +44 (UK)
//                       </option>
//                       <option value="+91" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +91 (India)
//                       </option>
//                       <option value="+61" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +61 (Australia)
//                       </option>
//                       <option value="+81" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +81 (Japan)
//                       </option>
//                       <option value="+49" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +49 (Germany)
//                       </option>
//                       <option value="+33" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +33 (France)
//                       </option>
//                       <option value="+39" className="bg-[#2c2b2b] text-#e2dcc8">
//                         +39 (Italy)
//                       </option>
//                     </select>

//                     <input
//                       type="tel"
//                       placeholder="Phone Number"
//                       className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] pt-4 focus:outline-none text-[#e2dcc8] placeholder-[#e2dcc8] "
//                     />
//                   </div>

//                   <div className="mb-4 sm:mb-6">
//                     <textarea
//                       placeholder="Message"
//                       rows="4"
//                       className="w-full bg-transparent border-b pb-2 border-[#e2dcc8] focus:outline-none focus:border-[#e2dcc8] text-[#e2dcc8] placeholder-[#e2dcc8]"
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full bg-black bg-opacity-20 text-[#e2dcc8] py-2 px-4 hover:bg-[#e2dcc8] hover:text-[black] transition duration-300"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Contact;
