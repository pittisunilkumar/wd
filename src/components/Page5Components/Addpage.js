import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {children}
    </div>,
    document.body
  );
};

const AnimatedAddpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+65");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef(null);

  const [textRef, textInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [buttonRef, buttonInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <style jsx global>{`
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background-color: #e2dcc8;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #1b1b1b;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .close-button:hover {
          background-color: #1b1b1b;
          color: #e2dcc8;
        }
        @keyframes ripple {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
            transform: translateY(100px);
          }
          100% {
            width: 600px;
            height: 400px;
            opacity: 0;
            transform: translateY(100px);
          }
        }
        .ripple-button {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          border: none;
          background-color: #eff2f5;
          box-shadow: inset 10px 10px 20px #a5a7a9,
            inset -10px -10px 20px #ffffff;
          transition: 0.33s ease-in all;
          opacity: 0;
          margin-bottom: 25%;
        }
        .ripple-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 30px;
          background-color: grey;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .talk-to-us-button:hover {
          color: #26d4b4;
          border: 2px solid black;
        }

        .modal-input::placeholder {
          color: #e2dcc8;
          opacity: 0.7;
        }
      `}</style>
      <div className="ptagfont relative flex flex-col md:flex-row items-center justify-between w-full min-h-[55vh] bg-white text-[#4e4e4e] font-['Montserrat',sans-serif] scroll-smooth overflow-hidden">
        <div className="hidden md:flex absolute top-0 left-0 w-1/2 h-full justify-center items-center overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="ripple-button"
              style={{
                animation: `ripple 5s infinite ${index * 0.5}s`,
              }}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2 p-5 flex flex-col items-center md:items-start text-center md:text-left mt-[10px] md:ml-[50%]">
          <motion.p
            ref={textRef}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            variants={textVariants}
            className="ptagfont text-[6vw] md:text-[2.5vw] mb-[1px] max-w-[90%] md:max-w-full"
          >
            The power of digital marketing carries a compounding ripple effect
            on your online marketing efforts. We aim to 10X your ROI and revenue
            goals.
          </motion.p>

          <motion.div
            ref={buttonRef}
            initial="hidden"
            animate={buttonInView ? "visible" : "hidden"}
            variants={buttonVariants}
            className="flex justify-center w-full mt-[30px]"
          >
            <button
              onClick={handleModalToggle}
              className="ptagfont talk-to-us-button inline-block py-[10px] px-[40px] text-[6vw] md:text-[2vw] text-gray-500 bg-transparent border-[3px] border-gray-500  transition-all duration-300 whitespace-nowrap font-bold cursor-pointer relative"
            >
              <span className="ptagfont z-[2] block absolute w-full h-full"></span>
              Talk To Us
            </button>
          </motion.div>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
          <div className="ptagfont bg-[#1b1b1b] rounded-3xl lg:rounded-full w-full max-w-[95%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[600px] lg:h-[600px] xl:h-[550px] aspect-auto lg:aspect-square flex flex-col items-center justify-around p-4 sm:p-6 md:p-8 relative overflow-y-auto lg:overflow-hidden">
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
      </div>
    </>
  );
};

export default AnimatedAddpage;

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import ReactDOM from "react-dom";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       {children}
//     </div>,
//     document.body
//   );
// };

// const AnimatedAddpage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("+65");
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const formRef = useRef(null);

//   const [textRef, textInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   const [buttonRef, buttonInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isModalOpen]);

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);

//     const formData = new FormData(formRef.current);
//     const formObject = Object.fromEntries(formData);
//     formObject.phone = `${countryCode} ${formObject.phone}`;

//     try {
//       await fetch(
//         "https://script.google.com/macros/s/AKfycbx0RJHdo_gqHBKgLSgYVyN1kdTHfpze3GJfFfACjxBiYvW0_n_FCi37Q7U7g_H8sYFT/exec",
//         {
//           method: "POST",
//           mode: "no-cors",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formObject),
//         }
//       );

//       if (formRef.current) {
//         formRef.current.reset();
//       }

//       setTimeout(() => {
//         setIsModalOpen(false);
//         setFormSubmitted(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <>
//       <style jsx global>{`
//         .close-button {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           width: 30px;
//           height: 30px;
//           background-color: #e2dcc8;
//           border-radius: 50%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 18px;
//           color: #1b1b1b;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           z-index: 10;
//         }

//         .close-button:hover {
//           background-color: #1b1b1b;
//           color: #e2dcc8;
//         }
//         @keyframes ripple {
//           0% {
//             width: 20px;
//             height: 20px;
//             opacity: 1;
//             transform: translateY(100px);
//           }
//           100% {
//             width: 600px;
//             height: 400px;
//             opacity: 0;
//             transform: translateY(100px);
//           }
//         }
//         .ripple-button {
//           position: absolute;
//           width: 20px;
//           height: 20px;
//           border-radius: 100%;
//           border: none;
//           background-color: #eff2f5;
//           box-shadow: inset 10px 10px 20px #a5a7a9,
//             inset -10px -10px 20px #ffffff;
//           transition: 0.33s ease-in all;
//           opacity: 0;
//           margin-bottom: 25%;
//         }
//         .ripple-button::before {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 40px;
//           height: 30px;
//           background-color: grey;
//           border-radius: 50%;
//           transform: translate(-50%, -50%);
//         }

//         .talk-to-us-button:hover {
//           color: #26d4b4;
//           border: 2px solid black;
//         }

//         .modal-input::placeholder {
//           color: #e2dcc8;
//           opacity: 0.7;
//         }
//       `}</style>
//       <div className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[55vh] bg-white text-[#4e4e4e] font-['Montserrat',sans-serif] scroll-smooth overflow-hidden">
//         <div className="hidden md:flex absolute top-0 left-0 w-1/2 h-full justify-center items-center overflow-hidden">
//           {[...Array(5)].map((_, index) => (
//             <div
//               key={index}
//               className="ripple-button"
//               style={{
//                 animation: `ripple 5s infinite ${index * 0.5}s`,
//               }}
//             />
//           ))}
//         </div>
//         <div className="w-full md:w-1/2 p-5 flex flex-col items-center md:items-start text-center md:text-left mt-[10px] md:ml-[50%]">
//           <motion.p
//             ref={textRef}
//             initial="hidden"
//             animate={textInView ? "visible" : "hidden"}
//             variants={textVariants}
//             className="text-[6vw] md:text-[2.5vw] mb-[1px] max-w-[90%] md:max-w-full"
//           >
//             The power of digital marketing carries a compounding ripple effect
//             on your online marketing efforts. We aim to 10X your ROI and revenue
//             goals.
//           </motion.p>

//           <motion.div
//             ref={buttonRef}
//             initial="hidden"
//             animate={buttonInView ? "visible" : "hidden"}
//             variants={buttonVariants}
//             className="flex justify-center w-full mt-[30px]"
//           >
//             <button
//               onClick={handleModalToggle}
//               className="talk-to-us-button inline-block py-[10px] px-[40px] text-[6vw] md:text-[2vw] text-gray-500 bg-transparent border-[3px] border-gray-500  transition-all duration-300 whitespace-nowrap font-bold cursor-pointer relative"
//             >
//               <span className="z-[2] block absolute w-full h-full"></span>
//               Talk To Us
//             </button>
//           </motion.div>
//         </div>

//         <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
//           <div className="bg-[#1b1b1b] rounded-3xl lg:rounded-full w-full max-w-[95%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[600px] lg:h-[600px] xl:h-[550px] aspect-auto lg:aspect-square flex flex-col items-center justify-around p-4 sm:p-6 md:p-8 relative overflow-y-auto lg:overflow-hidden">
//             <button
//               onClick={handleModalToggle}
//               className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent text-[#e2dcc8] w-10 h-10 rounded-full text-2xl hover:bg-[#e2dcc8] hover:text-black transition duration-300"
//             >
//               X
//             </button>
//             <h2 className="text-[#e2dcc8] text-2xl sm:text-3xl mb-4 sm:mb-6">
//               Contact Us
//             </h2>
//             <form
//               ref={formRef}
//               onSubmit={handleSubmit}
//               className="w-full max-w-[90%] lg:max-w-[70%] flex flex-col items-center"
//             >
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="text"
//                   name="firstName"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="text"
//                   name="lastName"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Last Name"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative flex flex-col sm:flex-row">
//                 <select
//                   value={countryCode}
//                   onChange={(e) => setCountryCode(e.target.value)}
//                   className="bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] py-2 px-2 focus:outline-none mb-2 sm:mb-0 sm:mr-2 text-base sm:text-lg sm:w-1/4"
//                 >
//                   <option value="+65" className="bg-[#2c2b2b] text-#e2dcc8 ">
//                     +65 (Singapore)
//                   </option>
//                   <option value="+1" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +1 (USA)
//                   </option>
//                   <option value="+44" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +44 (UK)
//                   </option>
//                   <option value="+91" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +91 (India)
//                   </option>
//                   <option value="+61" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +61 (Australia)
//                   </option>
//                   <option value="+81" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +81 (Japan)
//                   </option>
//                   <option value="+49" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +49 (Germany)
//                   </option>
//                   <option value="+33" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +33 (France)
//                   </option>
//                   <option value="+39" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +39 (Italy)
//                   </option>
//                 </select>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   pattern="[0-9]{7,15}"
//                   className="modal-input flex-grow bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Phone Number"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <textarea
//                   name="message"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none resize-none text-base sm:text-lg placeholder-center"
//                   rows="3"
//                   placeholder="Message"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-black text-[#e2dcc8] px-6 py-3 rounded-full hover:bg-[#e2dcc8] hover:text-black transition duration-300 text-base sm:text-lg"
//               >
//                 Submit
//               </button>
//             </form>
//             {formSubmitted && (
//               <p className="text-[#e2dcc8] text-base sm:text-lg mt-4">
//                 Thank you for contacting us!
//               </p>
//             )}
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default AnimatedAddpage;

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import ReactDOM from "react-dom";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       {children}
//     </div>,
//     document.body
//   );
// };

// const AnimatedAddpage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("+65");
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const formRef = useRef(null);

//   const [textRef, textInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   const [buttonRef, buttonInView] = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isModalOpen]);

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);

//     const formData = new FormData(formRef.current);
//     const formObject = Object.fromEntries(formData);
//     formObject.phone = `${countryCode} ${formObject.phone}`;

//     try {
//       await fetch(
//         "https://script.google.com/macros/s/AKfycbx0RJHdo_gqHBKgLSgYVyN1kdTHfpze3GJfFfACjxBiYvW0_n_FCi37Q7U7g_H8sYFT/exec",
//         {
//           method: "POST",
//           mode: "no-cors",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formObject),
//         }
//       );

//       if (formRef.current) {
//         formRef.current.reset();
//       }

//       setTimeout(() => {
//         setIsModalOpen(false);
//         setFormSubmitted(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <>
//       <style jsx global>{`
//         .close-button {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           width: 30px;
//           height: 30px;
//           background-color: #e2dcc8;
//           border-radius: 50%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 18px;
//           color: #1b1b1b;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           z-index: 10;
//         }

//         .close-button:hover {
//           background-color: #1b1b1b;
//           color: #e2dcc8;
//         }
//         @keyframes ripple {
//           0% {
//             width: 20px;
//             height: 20px;
//             opacity: 1;
//             transform: translateY(100px);
//           }
//           100% {
//             width: 600px;
//             height: 400px;
//             opacity: 0;
//             transform: translateY(100px);
//           }
//         }
//         .ripple-button {
//           position: absolute;
//           width: 20px;
//           height: 20px;
//           border-radius: 100%;
//           border: none;
//           background-color: #eff2f5;
//           box-shadow: inset 10px 10px 20px #a5a7a9,
//             inset -10px -10px 20px #ffffff;
//           transition: 0.33s ease-in all;
//           opacity: 0;
//           margin-bottom: 25%;
//         }
//         .ripple-button::before {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 40px;
//           height: 30px;
//           background-color: grey;
//           border-radius: 50%;
//           transform: translate(-50%, -50%);
//         }

//         .talk-to-us-button:hover {
//           color: #26d4b4;
//           border: 2px solid black;
//         }

//         .modal-input::placeholder {
//           color: #e2dcc8;
//           opacity: 0.7;
//         }
//       `}</style>
//       <div className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[55vh] bg-white text-[#4e4e4e] font-['Montserrat',sans-serif] scroll-smooth overflow-hidden">
//         <div className="hidden md:flex absolute top-0 left-0 w-1/2 h-full justify-center items-center overflow-hidden">
//           {[...Array(5)].map((_, index) => (
//             <div
//               key={index}
//               className="ripple-button"
//               style={{
//                 animation: `ripple 5s infinite ${index * 0.5}s`,
//               }}
//             />
//           ))}
//         </div>
//         <div className="w-full md:w-1/2 p-5 flex flex-col items-center md:items-start text-center md:text-left mt-[10px] md:ml-[50%]">
//           <motion.p
//             ref={textRef}
//             initial="hidden"
//             animate={textInView ? "visible" : "hidden"}
//             variants={textVariants}
//             className="text-[6vw] md:text-[2.5vw] mb-[1px] max-w-[90%] md:max-w-full"
//           >
//             The power of digital marketing carries a compounding ripple effect
//             on your online marketing efforts. We aim to 10X your ROI and revenue
//             goals.
//           </motion.p>

//           <motion.div
//             ref={buttonRef}
//             initial="hidden"
//             animate={buttonInView ? "visible" : "hidden"}
//             variants={buttonVariants}
//             className="flex justify-center w-full mt-[30px]"
//           >
//             <button
//               onClick={handleModalToggle}
//               className="talk-to-us-button inline-block py-[10px] px-[40px] text-[6vw] md:text-[2vw] text-gray-500 bg-transparent border-[3px] border-gray-500  transition-all duration-300 whitespace-nowrap font-bold cursor-pointer relative"
//             >
//               <span className="z-[2] block absolute w-full h-full"></span>
//               Talk To Us
//             </button>
//           </motion.div>
//         </div>

//         <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
//           <div className="bg-[#1b1b1b] rounded-3xl lg:rounded-full w-full max-w-[95%] sm:max-w-[80%] md:max-w-[600px] lg:max-w-[650px] lg:h-[650px] aspect-auto lg:aspect-square flex flex-col items-center justify-around p-4 sm:p-6 md:p-8 relative overflow-y-auto lg:overflow-hidden">
//             <button
//               onClick={handleModalToggle}
//               className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent text-[#e2dcc8] w-10 h-10 rounded-full text-2xl hover:bg-[#e2dcc8] hover:text-black transition duration-300"
//             >
//               X
//             </button>
//             <h2 className="text-[#e2dcc8] text-2xl sm:text-3xl mb-4 sm:mb-6">
//               Contact Us
//             </h2>
//             <form
//               ref={formRef}
//               onSubmit={handleSubmit}
//               className="w-full max-w-[90%] lg:max-w-[70%] flex flex-col items-center"
//             >
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="text"
//                   name="firstName"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="text"
//                   name="lastName"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Last Name"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative flex flex-col sm:flex-row">
//                 <select
//                   value={countryCode}
//                   onChange={(e) => setCountryCode(e.target.value)}
//                   className="bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] py-2 px-2 focus:outline-none mb-2 sm:mb-0 sm:mr-2 text-base sm:text-lg sm:w-1/4"
//                 >
//                   <option value="+65" className="bg-[#2c2b2b] text-#e2dcc8 ">
//                     +65 (Singapore)
//                   </option>
//                   <option value="+1" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +1 (USA)
//                   </option>
//                   <option value="+44" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +44 (UK)
//                   </option>
//                   <option value="+91" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +91 (India)
//                   </option>
//                   <option value="+61" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +61 (Australia)
//                   </option>
//                   <option value="+81" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +81 (Japan)
//                   </option>
//                   <option value="+49" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +49 (Germany)
//                   </option>
//                   <option value="+33" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +33 (France)
//                   </option>
//                   <option value="+39" className="bg-[#2c2b2b] text-#e2dcc8">
//                     +39 (Italy)
//                   </option>
//                 </select>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   pattern="[0-9]{7,15}"
//                   className="modal-input flex-grow bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none text-base sm:text-lg placeholder-center"
//                   placeholder="Phone Number"
//                 />
//               </div>
//               <div className="w-full mb-4 sm:mb-6 relative">
//                 <textarea
//                   name="message"
//                   required
//                   className="modal-input w-full bg-transparent border-b-2 border-[#e2dcc8] text-[#e2dcc8] text-center py-2 px-2 focus:outline-none resize-none text-base sm:text-lg placeholder-center"
//                   rows="3"
//                   placeholder="Message"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-black text-[#e2dcc8] px-6 py-3 rounded-full hover:bg-[#e2dcc8] hover:text-black transition duration-300 text-base sm:text-lg"
//               >
//                 Submit
//               </button>
//             </form>
//             {formSubmitted && (
//               <p className="text-[#e2dcc8] text-base sm:text-lg mt-4">
//                 Thank you for contacting us!
//               </p>
//             )}
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default AnimatedAddpage;
