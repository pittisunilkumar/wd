import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      {children}
    </div>,
    document.body
  );
};

const Transition = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef(null);
  const [countryCode, setCountryCode] = useState("+65");
  const [isVisible, setIsVisible] = useState(false);
  const transitionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => {
      if (transitionRef.current) {
        observer.unobserve(transitionRef.current);
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

  return (
    <div
      ref={transitionRef}
      className="relative py-16 bg-[#2b2a2a] min-h-[400px] flex items-center overflow-hidden"
    >
      {/* Background lines */}
      <div className="absolute inset-0 -rotate-45 scale-[2.5]">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute w-px h-[200%] bg-white/10 -top-1/2"
            style={{ left: `${index * 5}%` }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div
            className={`md:w-2/3 mb-8 md:mb-0 pr-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <p className="text-[#e2dcc8] text-2xl md:text-3xl lg:text-4xl font-light">
              Did you know sites with top-notch design and content are 53% more
              likely to hit Google's first page? Ready to boost your rankings?
            </p>
          </div>
          <div
            className={`md:w-1/3 flex justify-center md:justify-end transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <button
              onClick={handleModalToggle}
              className="bg-transparent border-2 border-gray-500 text-[#e2dcc8] py-3 px-8 hover:bg-[#e2dcc8] hover:text-black transition duration-300 text-xl font-bold"
            >
              Talk To Us
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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

export default Transition;
