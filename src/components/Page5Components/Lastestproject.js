import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// Import your images here
import LP1 from "../../assets/interior-web.png";
import LP2 from "../../assets/kiteche.png";
import LP3 from "../../assets/funtuire.png";
import LP4 from "../../assets/arcwebsite.png";
import LP5 from "../../assets/engwebsite.png";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      {children}
    </div>,
    document.body
  );
};

const LatestProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const componentRef = useRef(null);
  const [countryCode, setCountryCode] = useState("+65");

  const projects = [
    {
      number: "01",
      type: "Interior Design website",
      title: "Interior Design",
      image: LP1,
      url: "https://interior-design-by-jack.netlify.app/",
    },
    {
      number: "02",
      type: "Kitchen Interior Design",
      title: "Inox - Kitchen Interior website",
      image: LP2,
      url: "http://kitchen-interior-demo.netlify.app",
    },
    {
      number: "03",
      type: "Manufacturing website",
      title: "Boston - Custom furniture",
      image: LP3,
      url: "https://furniture-website-demowd.netlify.app/",
    },
    {
      number: "04",
      type: "Architecture Designs",
      title: "ARK - Architecture website",
      image: LP4,
      url: "https://architecture-website-demo.netlify.app",
    },
    {
      number: "05",
      type: "Engineering Design",
      title: "Quintus - Engineering website",
      image: LP5,
      url: "https://engineering-website-demo.netlify.app/",
    },
  ];

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const formData = new FormData(formRef.current);
    const formObject = Object.fromEntries(formData);
    formObject.phone = `${countryCode} ${formObject.phone}`;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbx0RJHdo_gqHBKgLSgYVyN1kdTHfpze3GJfFfACjxBiYvW0_n_FCi37Q7U7g_H8sYFT/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        }
      );

      if (formRef.current) {
        formRef.current.reset();
      }

      setTimeout(() => {
        setIsModalOpen(false);
        setFormSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const slideInLeft = `
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  const slideInRight = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  const fadeInUp = `
    @keyframes fadeInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  return (
    <div
      ref={componentRef}
      className="bg-[#282828] text-[#e2dcc8] flex flex-col items-center justify-start w-full min-h-screen py-12 mt-[5%] font-montserrat"
    >
      <style>
        {slideInLeft}
        {slideInRight}
        {fadeInUp}
      </style>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fontmycustom flex flex-col sm:flex-row justify-center items-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl pb-12 pt-5">
          <h1
            className={`px-2 sm:px-5 transition-all duration-1000 ${
              animate
                ? "animate-[slideInLeft_1s_forwards]"
                : "opacity-0 -translate-x-full"
            }`}
          >
            LATEST
          </h1>
          <h1
            className={`px-2 sm:px-5 text-transparent transition-all duration-1000 ${
              animate
                ? "animate-[slideInRight_1s_forwards]"
                : "opacity-0 translate-x-full"
            }`}
            style={{ WebkitTextStroke: "1px #e2dcc8" }}
          >
            PROJECTS
          </h1>
        </div>

        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-center max-w-4xl mx-auto px-4 sm:px-5 mb-12 sm:mb-20 transition-all duration-1000 ${
            animate
              ? "animate-[fadeInUp_1s_forwards_0.5s]"
              : "opacity-0 translate-y-10"
          }`}
        >
          These projects are our relentless pursuit of the latest design trends
          in web development. We push the limits, staying agile where others
          hesitate.
        </p>

        <button
          onClick={handleModalToggle}
          className={`border-2 sm:border-4 border-[#e2dcc8] bg-transparent text-[#e2dcc8] py-2 sm:py-4 px-4 sm:px-8 text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat cursor-pointer rounded-md mx-auto block mt-8 sm:mt-20 mb-12 sm:mb-20 transition-all duration-1000 hover:bg-[#e2dcc8] hover:text-[#282828] ${
            animate
              ? "animate-[fadeInUp_1s_forwards_0.7s]"
              : "opacity-0 translate-y-10"
          }`}
        >
          If these designs speak to you, let's talk about making them yours.
        </button>
        <div className="space-y-12 sm:space-y-24">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-container group relative flex flex-col sm:flex-row items-start sm:items-center justify-center mt-8 sm:mt-20 pb-8 sm:pb-24 w-full transition-all duration-1000 ${
                animate
                  ? `animate-[fadeInUp_1s_forwards_${0.9 + index * 0.2}s]`
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-start w-full sm:w-auto z-10">
                <h1
                  className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mr-4 sm:mr-16 text-transparent transition-all duration-1000 group-hover:text-[#e2dcc8] ${
                    animate
                      ? `animate-[slideInLeft_1s_forwards_${
                          1.1 + index * 0.2
                        }s]`
                      : "opacity-0 -translate-x-full"
                  }`}
                  style={{ WebkitTextStroke: "1px #e2dcc8" }}
                >
                  {project.number}/
                </h1>
                <div
                  className={`flex-1 transition-all duration-1000 group-hover:text-[#26d3b4] ${
                    animate
                      ? `animate-[slideInRight_1s_forwards_${
                          1.1 + index * 0.2
                        }s]`
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">
                    {project.type}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="absolute right-0 sm:right-[10%] top-full sm:top-1/2 sm:-translate-y-1/2 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[calc(100%+1rem)] sm:group-hover:top-1/2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-[200px] h-[170px] sm:w-[350px] sm:h-[300px] object-cover"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <div className="bg-[#1b1b1b] rounded-3xl lg:rounded-full w-full max-w-[95%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[600px] lg:h-[600px] xl:h-[550px] aspect-auto lg:aspect-square flex flex-col items-center justify-around p-4 sm:p-6 md:p-8 relative overflow-y-auto lg:overflow-hidden">
          <button
            onClick={handleModalToggle}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent text-[#e2dcc8] w-10 h-10 rounded-full text-2xl hover:bg-[#e2dcc8] hover:text-black transition duration-300"
          >
            X
          </button>
          <h2 className="text-[#e2dcc8] text-2xl sm:text-3xl mb-4 sm:mb-6">
            Contact Us
          </h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-[90%] lg:max-w-[70%] flex flex-col items-center"
          >
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="text"
                name="firstName"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="First Name"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="text"
                name="lastName"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Last Name"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="email"
                name="email"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Email"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative flex flex-col sm:flex-row">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] py-2 px-2 focus:outline-none mb-2 sm:mb-0 sm:mr-2 text-base sm:text-lg sm:w-1/4"
              >
                <option value="+65" className="bg-[#2c2b2b] text-#e2dcc8 ">
                  +65 (Singapore)
                </option>
                <option value="+1" className="bg-[#2c2b2b] text-#e2dcc8">
                  +1 (USA)
                </option>
                <option value="+44" className="bg-[#2c2b2b] text-#e2dcc8">
                  +44 (UK)
                </option>
                <option value="+91" className="bg-[#2c2b2b] text-#e2dcc8">
                  +91 (India)
                </option>
                <option value="+61" className="bg-[#2c2b2b] text-#e2dcc8">
                  +61 (Australia)
                </option>
                <option value="+81" className="bg-[#2c2b2b] text-#e2dcc8">
                  +81 (Japan)
                </option>
                <option value="+49" className="bg-[#2c2b2b] text-#e2dcc8">
                  +49 (Germany)
                </option>
                <option value="+33" className="bg-[#2c2b2b] text-#e2dcc8">
                  +33 (France)
                </option>
                <option value="+39" className="bg-[#2c2b2b] text-#e2dcc8">
                  +39 (Italy)
                </option>
              </select>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{7,15}"
                className="modal-input flex-grow bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <textarea
                name="message"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none resize-none text-base sm:text-lg placeholder-center"
                rows="3"
                placeholder="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-[#e2dcc8] px-6 py-2 rounded-full hover:bg-[#e2dcc8] hover:text-black transition duration-300 text-base sm:text-lg mt-0 lg:mt-0"
            >
              Submit
            </button>
          </form>
          {formSubmitted && (
            <p className="text-[#e2dcc8] text-base sm:text-lg mt-4">
              Thank you for contacting us!
            </p>
          )}
        </div>
      </Modal>

      {/* <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <div className="bg-[#1b1b1b] rounded-3xl lg:rounded-full w-full max-w-[95%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[650px] lg:h-[650px] aspect-auto lg:aspect-square flex flex-col items-center justify-around p-4 sm:p-6 md:p-8 relative overflow-y-auto lg:overflow-hidden">
          <button
            onClick={handleModalToggle}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent text-[#e2dcc8] w-10 h-10 rounded-full text-2xl hover:bg-[#e2dcc8] hover:text-black transition duration-300"
          >
            X
          </button>
          <h2 className="text-[#e2dcc8] text-2xl sm:text-3xl mb-4 sm:mb-6">
            Contact Us
          </h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-[90%] lg:max-w-[70%] flex flex-col items-center"
          >
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="text"
                name="firstName"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="First Name"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="text"
                name="lastName"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Last Name"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <input
                type="email"
                name="email"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Email"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative flex flex-col sm:flex-row">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] py-2 px-2 focus:outline-none mb-2 sm:mb-0 sm:mr-2 text-base sm:text-lg sm:w-1/4"
              >
                <option value="+65" className="bg-[#2c2b2b] text-#e2dcc8 ">
                  +65 (Singapore)
                </option>
                <option value="+1" className="bg-[#2c2b2b] text-#e2dcc8">
                  +1 (USA)
                </option>
                <option value="+44" className="bg-[#2c2b2b] text-#e2dcc8">
                  +44 (UK)
                </option>
                <option value="+91" className="bg-[#2c2b2b] text-#e2dcc8">
                  +91 (India)
                </option>
                <option value="+61" className="bg-[#2c2b2b] text-#e2dcc8">
                  +61 (Australia)
                </option>
                <option value="+81" className="bg-[#2c2b2b] text-#e2dcc8">
                  +81 (Japan)
                </option>
                <option value="+49" className="bg-[#2c2b2b] text-#e2dcc8">
                  +49 (Germany)
                </option>
                <option value="+33" className="bg-[#2c2b2b] text-#e2dcc8">
                  +33 (France)
                </option>
                <option value="+39" className="bg-[#2c2b2b] text-#e2dcc8">
                  +39 (Italy)
                </option>
              </select>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{7,15}"
                className="modal-input flex-grow bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-full mb-4 sm:mb-6 relative">
              <textarea
                name="message"
                required
                className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none resize-none text-base sm:text-lg placeholder-center"
                rows="3"
                placeholder="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-[#e2dcc8] px-6 py-3 rounded-full hover:bg-[#e2dcc8] hover:text-black transition duration-300 text-base sm:text-lg"
            >
              Submit
            </button>
          </form>
          {formSubmitted && (
            <p className="text-[#e2dcc8] text-base sm:text-lg mt-4">
              Thank you for contacting us!
            </p>
          )}
        </div>
      </Modal> */}
    </div>
  );
};

export default LatestProjects;

// import React, { useState, useRef, useEffect } from "react";

// import LP1 from "../../assets/interior-web.png";
// import LP2 from "../../assets/kiteche.png";
// import LP3 from "../../assets/funtuire.png";
// import LP4 from "../../assets/arcwebsite.png";
// import LP5 from "../../assets/engwebsite.png";

// const LatestProjects = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const formRef = useRef(null);
//   const [animate, setAnimate] = useState(false);
//   const componentRef = useRef(null);

//   const projects = [
//     {
//       number: "01",
//       type: "Interior Design website",
//       title: "Interior Design",
//       image: LP1,
//       url: "https://interior-design-by-jack.netlify.app/",
//     },
//     {
//       number: "02",
//       type: "Kitchen Interior Design",
//       title: "Inox - Kitchen Interior website",
//       image: LP2,
//       url: "http://kitchen-interior-demo.netlify.app",
//     },
//     {
//       number: "03",
//       type: "Manufacturing website",
//       title: "Boston - Custom furniture",
//       image: LP3,
//       url: "https://furniture-website-demowd.netlify.app/",
//     },
//     {
//       number: "04",
//       type: "Architecture Designs",
//       title: "ARK - Architecture website",
//       image: LP4,
//       url: "https://architecture-website-demo.netlify.app",
//     },
//     {
//       number: "05",
//       type: "Engineering Design",
//       title: "Quintus - Engineering website",
//       image: LP5,
//       url: "https://engineering-website-demo.netlify.app/",
//     },
//   ];

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//     document.body.style.overflow = isModalOpen ? "" : "hidden";
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);
//     // Form submission logic here
//     setTimeout(() => {
//       setIsModalOpen(false);
//       setFormSubmitted(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setAnimate(true);
//         } else {
//           setAnimate(false);
//         }
//       },
//       {
//         threshold: 0.1, // Trigger when 10% of the component is visible
//       }
//     );

//     if (componentRef.current) {
//       observer.observe(componentRef.current);
//     }

//     return () => {
//       if (componentRef.current) {
//         observer.unobserve(componentRef.current);
//       }
//     };
//   }, []);

//   const slideInLeft = `
//     @keyframes slideInLeft {
//       from {
//         transform: translateX(-100%);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//   `;

//   const slideInRight = `
//     @keyframes slideInRight {
//       from {
//         transform: translateX(100%);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//   `;

//   const fadeInUp = `
//     @keyframes fadeInUp {
//       from {
//         transform: translateY(20px);
//         opacity: 0;
//       }
//       to {
//         transform: translateY(0);
//         opacity: 1;
//       }
//     }
//   `;

//   return (
//     <div
//       ref={componentRef}
//       className="bg-[#282828] text-[#e2dcc8] flex flex-col items-center justify-start w-full min-h-screen py-12 mt-[5%] font-montserrat"
//     >
//       <style>
//         {slideInLeft}
//         {slideInRight}
//         {fadeInUp}
//       </style>
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="fontmycustom flex flex-col sm:flex-row justify-center items-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl pb-12 pt-5">
//           <h1
//             className={`px-2 sm:px-5 transition-all duration-1000 ${
//               animate
//                 ? "animate-[slideInLeft_1s_forwards]"
//                 : "opacity-0 -translate-x-full"
//             }`}
//           >
//             LATEST
//           </h1>
//           <h1
//             className={`px-2 sm:px-5 text-transparent transition-all duration-1000 ${
//               animate
//                 ? "animate-[slideInRight_1s_forwards]"
//                 : "opacity-0 translate-x-full"
//             }`}
//             style={{ WebkitTextStroke: "1px #e2dcc8" }}
//           >
//             PROJECTS
//           </h1>
//         </div>

//         <p
//           className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-center max-w-4xl mx-auto px-4 sm:px-5 mb-12 sm:mb-20 transition-all duration-1000 ${
//             animate
//               ? "animate-[fadeInUp_1s_forwards_0.5s]"
//               : "opacity-0 translate-y-10"
//           }`}
//         >
//           These projects are our relentless pursuit of the latest design trends
//           in web development. We push the limits, staying agile where others
//           hesitate.
//         </p>

//         <button
//           onClick={handleModalToggle}
//           className={`border-2 sm:border-4 border-[#e2dcc8] bg-transparent text-[#e2dcc8] py-2 sm:py-4 px-4 sm:px-8 text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat cursor-pointer rounded-md mx-auto block mt-8 sm:mt-20 mb-12 sm:mb-20 transition-all duration-1000 hover:bg-[#e2dcc8] hover:text-[#282828] ${
//             animate
//               ? "animate-[fadeInUp_1s_forwards_0.7s]"
//               : "opacity-0 translate-y-10"
//           }`}
//         >
//           If these designs speak to you, let's talk about making them yours.
//         </button>
//         <div className="space-y-12 sm:space-y-24">
//           {projects.map((project, index) => (
//             <a
//               key={index}
//               href={project.url} // Use the url here
//               target="_blank" // Opens in a new tab
//               rel="noopener noreferrer" // Security best practice
//               className={`project-container group relative flex flex-col sm:flex-row items-start sm:items-center justify-center mt-8 sm:mt-20 pb-8 sm:pb-24 w-full transition-all duration-1000 ${
//                 animate
//                   ? `animate-[fadeInUp_1s_forwards_${0.9 + index * 0.2}s]`
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               <div className="flex items-start w-full sm:w-auto z-10">
//                 <h1
//                   className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mr-4 sm:mr-16 text-transparent transition-all duration-1000 group-hover:text-[#e2dcc8] ${
//                     animate
//                       ? `animate-[slideInLeft_1s_forwards_${
//                           1.1 + index * 0.2
//                         }s]`
//                       : "opacity-0 -translate-x-full"
//                   }`}
//                   style={{ WebkitTextStroke: "1px #e2dcc8" }}
//                 >
//                   {project.number}/
//                 </h1>
//                 <div
//                   className={`flex-1 transition-all duration-1000 group-hover:text-[#26d3b4] ${
//                     animate
//                       ? `animate-[slideInRight_1s_forwards_${
//                           1.1 + index * 0.2
//                         }s]`
//                       : "opacity-0 translate-x-full"
//                   }`}
//                 >
//                   <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">
//                     {project.type}
//                   </p>
//                   <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
//                     {project.title}
//                   </h3>
//                 </div>
//               </div>
//               <div className="absolute right-0 sm:right-[10%] top-full sm:top-1/2 sm:-translate-y-1/2 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[calc(100%+1rem)] sm:group-hover:top-1/2">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-[200px] h-[170px] sm:w-[350px] sm:h-[300px] object-cover"
//                 />
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#1b1b1b] p-6 sm:p-10 rounded-3xl sm:rounded-full w-full max-w-[90vw] sm:max-w-[600px] h-auto sm:h-[600px] shadow-lg flex flex-col items-center justify-around relative">
//             <h2 className="text-2xl sm:text-3xl text-[#e2dcc8] mb-4 sm:mb-5">
//               Contact Us
//             </h2>
//             <form
//               ref={formRef}
//               onSubmit={handleSubmit}
//               className="w-full flex flex-col items-center"
//             >
//               {[
//                 "First Name",
//                 "Last Name",
//                 "Email",
//                 "Phone Number",
//                 "Message",
//               ].map((label, index) => (
//                 <div
//                   key={index}
//                   className="relative mb-4 sm:mb-5 w-full sm:w-4/5 mt-2 flex justify-center"
//                 >
//                   {label === "Message" ? (
//                     <textarea
//                       name={label.toLowerCase().replace(" ", "_")}
//                       className="w-full sm:w-1/2 p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none"
//                       required
//                     />
//                   ) : (
//                     <input
//                       type={
//                         label === "Email"
//                           ? "email"
//                           : label === "Phone Number"
//                           ? "tel"
//                           : "text"
//                       }
//                       name={label.toLowerCase().replace(" ", "_")}
//                       className={`w-full sm:w-${
//                         index === 0 ? "1/2" : index === 1 ? "7/10" : "full"
//                       } p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none`}
//                       required
//                     />
//                   )}
//                   <label className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#e2dcc8] text-sm sm:text-lg pointer-events-none transition-all duration-300">
//                     {label}
//                   </label>
//                 </div>
//               ))}
//               <button
//                 type="submit"
//                 className="mt-4 sm:mt-5 px-4 sm:px-5 py-2 bg-black text-[#e2dcc8] rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#e2dcc8] hover:text-black"
//               >
//                 Submit
//               </button>
//             </form>
//             {formSubmitted && (
//               <p className="text-green-500 mt-4">
//                 Thank you for contacting us!
//               </p>
//             )}
//             <button
//               onClick={handleModalToggle}
//               className="absolute -top-2 sm:-top-4 right-2 sm:left-1/2 transform sm:-translate-x-1/2 bg-transparent rounded-full p-2 text-[#e2dcc8] text-xl sm:text-2xl cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#e2dcc8] hover:text-black transition-colors duration-300"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LatestProjects;

// {isModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-[#1b1b1b] p-6 sm:p-10 rounded-3xl sm:rounded-full w-full max-w-[90vw] sm:max-w-[600px] h-auto sm:h-[600px] shadow-lg flex flex-col items-center justify-around relative">
//       <h2 className="text-2xl sm:text-3xl text-[#e2dcc8] mb-4 sm:mb-5">
//         Contact Us
//       </h2>
//       <form
//         ref={formRef}
//         onSubmit={handleSubmit}
//         className="w-full flex flex-col items-center"
//       >
//         {[
//           "First Name",
//           "Last Name",
//           "Email",
//           "Phone Number",
//           "Message",
//         ].map((label, index) => (
//           <div
//             key={index}
//             className="relative mb-4 sm:mb-5 w-full sm:w-4/5 mt-2 flex justify-center"
//           >
//             {label === "Message" ? (
//               <textarea
//                 name={label.toLowerCase().replace(" ", "_")}
//                 className="w-full sm:w-1/2 p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none"
//                 required
//               />
//             ) : (
//               <input
//                 type={
//                   label === "Email"
//                     ? "email"
//                     : label === "Phone Number"
//                     ? "tel"
//                     : "text"
//                 }
//                 name={label.toLowerCase().replace(" ", "_")}
//                 className={`w-full sm:w-${
//                   index === 0 ? "1/2" : index === 1 ? "7/10" : "full"
//                 } p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none`}
//                 required
//               />
//             )}
//             <label className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#e2dcc8] text-sm sm:text-lg pointer-events-none transition-all duration-300">
//               {label}
//             </label>
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="mt-4 sm:mt-5 px-4 sm:px-5 py-2 bg-black text-[#e2dcc8] rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#e2dcc8] hover:text-black"
//         >
//           Submit
//         </button>
//       </form>
//       {formSubmitted && (
//         <p className="text-green-500 mt-4">
//           Thank you for contacting us!
//         </p>
//       )}
//       <button
//         onClick={handleModalToggle}
//         className="absolute -top-2 sm:-top-4 right-2 sm:left-1/2 transform sm:-translate-x-1/2 bg-transparent rounded-full p-2 text-[#e2dcc8] text-xl sm:text-2xl cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#e2dcc8] hover:text-black transition-colors duration-300"
//       >
//         &times;
//       </button>
//     </div>
//   </div>
// )}

// import React, { useState, useRef, useEffect } from 'react';

// // Import your images here
// import portfolioImage1 from "../../assets/Rectangle 1071 portfolioimgaes1.svg";
// import portfolioImage2 from "../../assets/Rectangle 1070portfolioimgaes2.svg";
// import portfolioImage3 from "../../assets/Rectangle 1069portfolioimgaes3.svg";
// import portfolioImage4 from "../../assets/Rectangle 1068portfolioimgaes4.svg";
// import portfolioImage5 from "../../assets/Rectangle 1076portfolioimgaes6.svg";

// const LatestProjects = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const formRef = useRef(null);
//   const [animate, setAnimate] = useState(false);
//   const componentRef = useRef(null);

//   const projects = [
//     { number: "01", type: "Saas Landing Page", title: "Taskio - Task Management", image: portfolioImage1 },
//     { number: "02", type: "E-commerce Platform", title: "ShopEase - Online Store", image: portfolioImage2 },
//     { number: "03", type: "Social Media App", title: "ConnectHub - Social Network", image: portfolioImage3 },
//     { number: "04", type: "Fitness Tracking App", title: "FitTrack - Health Monitor", image: portfolioImage4 },
//     { number: "05", type: "Educational Platform", title: "LearnQuest - Online Courses", image: portfolioImage5 },
//   ];

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//     document.body.style.overflow = isModalOpen ? '' : 'hidden';
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);
//     // Form submission logic here
//     setTimeout(() => {
//       setIsModalOpen(false);
//       setFormSubmitted(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setAnimate(true);
//         } else {
//           setAnimate(false);
//         }
//       },
//       {
//         threshold: 0.1, // Trigger when 10% of the component is visible
//       }
//     );

//     if (componentRef.current) {
//       observer.observe(componentRef.current);
//     }

//     return () => {
//       if (componentRef.current) {
//         observer.unobserve(componentRef.current);
//       }
//     };
//   }, []);

//   const slideInLeft = `
//     @keyframes slideInLeft {
//       from {
//         transform: translateX(-100%);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//   `;

//   const slideInRight = `
//     @keyframes slideInRight {
//       from {
//         transform: translateX(100%);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
//   `;

//   const fadeInUp = `
//     @keyframes fadeInUp {
//       from {
//         transform: translateY(20px);
//         opacity: 0;
//       }
//       to {
//         transform: translateY(0);
//         opacity: 1;
//       }
//     }
//   `;

//   return (
//     <div ref={componentRef} className="bg-[#282828] text-[#e2dcc8] flex flex-col items-center justify-start w-full min-h-screen py-12 mt-[5%] font-montserrat">
//       <style>
//         {slideInLeft}
//         {slideInRight}
//         {fadeInUp}
//       </style>
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="fontmycustom flex flex-col sm:flex-row justify-center items-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl pb-12 pt-5">
//           <h1
//             className={`px-2 sm:px-5 transition-all duration-1000 ${animate ? 'animate-[slideInLeft_1s_forwards]' : 'opacity-0 -translate-x-full'}`}
//           >
//             LATEST
//           </h1>
//           <h1
//             className={`px-2 sm:px-5 text-transparent transition-all duration-1000 ${animate ? 'animate-[slideInRight_1s_forwards]' : 'opacity-0 translate-x-full'}`}
//             style={{ WebkitTextStroke: '1px #e2dcc8' }}
//           >
//             PROJECTS
//           </h1>
//         </div>

//         <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-center max-w-4xl mx-auto px-4 sm:px-5 mb-12 sm:mb-20 transition-all duration-1000 ${animate ? 'animate-[fadeInUp_1s_forwards_0.5s]' : 'opacity-0 translate-y-10'}`}>
//           These projects are our relentless pursuit of the latest design trends
//           in web development. We push the limits, staying agile where others
//           hesitate.
//         </p>

//         <button
//           onClick={handleModalToggle}
//           className={`border-2 sm:border-4 border-[#e2dcc8] bg-transparent text-[#e2dcc8] py-2 sm:py-4 px-4 sm:px-8 text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat cursor-pointer rounded-md mx-auto block mt-8 sm:mt-20 mb-12 sm:mb-20 transition-all duration-1000 hover:bg-[#e2dcc8] hover:text-[#282828] ${animate ? 'animate-[fadeInUp_1s_forwards_0.7s]' : 'opacity-0 translate-y-10'}`}
//         >
//           If these designs speak to you, let's talk about making them yours.
//         </button>

//         <div className="space-y-12 sm:space-y-24">
//           {projects.map((project, index) => (
//             <div key={index} className={`project-container group relative flex flex-col sm:flex-row items-start sm:items-center justify-center mt-8 sm:mt-20 pb-8 sm:pb-24 w-full transition-all duration-1000 ${animate ? `animate-[fadeInUp_1s_forwards_${0.9 + index * 0.2}s]` : 'opacity-0 translate-y-10'}`}>
//               <div className="flex items-start w-full sm:w-auto z-10">
//                 <h1
//                   className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mr-4 sm:mr-16 text-transparent transition-all duration-1000 group-hover:text-[#26d3b4] ${animate ? `animate-[slideInLeft_1s_forwards_${1.1 + index * 0.2}s]` : 'opacity-0 -translate-x-full'}`}
//                   style={{ WebkitTextStroke: '1px #e2dcc8' }}
//                 >
//                   {project.number}/
//                 </h1>
//                 <div className={`flex-1 transition-all duration-1000 ${animate ? `animate-[slideInRight_1s_forwards_${1.1 + index * 0.2}s]` : 'opacity-0 translate-x-full'}`}>
//                   <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">{project.type}</p>
//                   <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{project.title}</h3>
//                 </div>
//               </div>
//               <div className="absolute right-0 sm:right-[10%] top-full sm:top-1/2 sm:-translate-y-1/2 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-[calc(100%+1rem)] sm:group-hover:top-1/2">
//                 <img src={project.image} alt={project.title} className="w-[200px] h-[170px] sm:w-[350px] sm:h-[300px] object-cover" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#1b1b1b] p-6 sm:p-10 rounded-3xl sm:rounded-full w-full max-w-[90vw] sm:max-w-[600px] h-auto sm:h-[600px] shadow-lg flex flex-col items-center justify-around relative">
//             <h2 className="text-2xl sm:text-3xl text-[#e2dcc8] mb-4 sm:mb-5">Contact Us</h2>
//             <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col items-center">
//               {['First Name', 'Last Name', 'Email', 'Phone Number', 'Message'].map((label, index) => (
//                 <div key={index} className="relative mb-4 sm:mb-5 w-full sm:w-4/5 mt-2 flex justify-center">
//                   {label === 'Message' ? (
//                     <textarea
//                       name={label.toLowerCase().replace(' ', '_')}
//                       className="w-full sm:w-1/2 p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none"
//                       required
//                     />
//                   ) : (
//                     <input
//                       type={label === 'Email' ? 'email' : label === 'Phone Number' ? 'tel' : 'text'}
//                       name={label.toLowerCase().replace(' ', '_')}
//                       className={`w-full sm:w-${index === 0 ? '1/2' : index === 1 ? '7/10' : 'full'} p-2 bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center focus:outline-none`}
//                       required
//                     />
//                   )}
//                   <label className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#e2dcc8] text-sm sm:text-lg pointer-events-none transition-all duration-300">
//                     {label}
//                   </label>
//                 </div>
//               ))}
//               <button type="submit" className="mt-4 sm:mt-5 px-4 sm:px-5 py-2 bg-black text-[#e2dcc8] rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#e2dcc8] hover:text-black">
//                 Submit
//               </button>
//             </form>
//             {formSubmitted && (
//               <p className="text-green-500 mt-4">Thank you for contacting us!</p>
//             )}
//             <button onClick={handleModalToggle} className="absolute -top-2 sm:-top-4 right-2 sm:left-1/2 transform sm:-translate-x-1/2 bg-transparent rounded-full p-2 text-[#e2dcc8] text-xl sm:text-2xl cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#e2dcc8] hover:text-black transition-colors duration-300">
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LatestProjects;
