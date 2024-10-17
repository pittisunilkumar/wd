import React, { useState, useRef, useEffect } from "react";

const Services = React.forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [visibleSection, setVisibleSection] = useState(0);
  const rightSideRef = useRef(null);
  const serviceSectionRefs = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headingRef.current.classList.add("animate-left");
        } else {
          headingRef.current.classList.remove("animate-left");
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-in-left");
        } else {
          entry.target.classList.remove("animate-slide-in-left");
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleRightSideScroll = () => {
      if (!rightSideRef.current) return;

      const scrollPosition = rightSideRef.current.scrollTop;
      let newVisibleSection = 0;
      serviceSectionRefs.current.forEach((ref, index) => {
        if (ref && scrollPosition >= ref.offsetTop - 250) {
          newVisibleSection = index;
        }
      });
      setVisibleSection(newVisibleSection);
    };

    const rightSide = rightSideRef.current;
    if (rightSide) {
      rightSide.addEventListener("scroll", handleRightSideScroll);
    }

    return () => {
      if (rightSide) {
        rightSide.removeEventListener("scroll", handleRightSideScroll);
      }
    };
  }, []);

  const handleAccordionToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleServiceClick = (index) => {
    setActiveService(index);
    const targetSection = serviceSectionRefs.current[index];
    if (targetSection && rightSideRef.current) {
      rightSideRef.current.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const services = [
    {
      title: "Website Design",
      description:
        "The time when designers were sidelined in website development discussions is history. Today creative websites start with design and is the backbone of your online experience marketing.",
      accordionItems: [
        {
          id: 1,
          title: "Art Direction",
          content: [
            "We blend visual storytelling with strategic design to align with your brand's voice and balance creativity with functionality.",
          ],
        },
        {
          id: 2,
          title: "Experience focused",
          content: [
            "We create cohesive, striking websites where every element - from layout to color - enhances user experience and drives meaningful engagement.",
          ],
        },
        {
          id: 3,
          title: "UI & UX Design",
          content: [
            "Our focus on UI/UX design centres around creating intuitive and engaging digital experiences. We sculpt and fine-tune every interface detail to ensure seamless navigation and a superior user experience.",
          ],
        },
        {
          id: 4,
          title: "Branding & Branding strategy",
          content: [
            "Branding and branding strategy for us involve crafting a unique identity that resonates with your target audience.",
            "We develop a comprehensive strategy that defines your brand's voice, visual style, and messaging, ensuring consistency across all touchpoints and building a strong, memorable presence online.",
          ],
        },
        {
          id: 5,
          title: "Corporate Website Development",
          content: [
            "We create professional, tailored websites that reflect your company's values and meet your business objectives.",
          ],
        },
        {
          id: 6,
          title: "Interactive design",
          content: [
            "We design engaging, interactive elements that captivate users and enhance their overall experience on your website.",
          ],
        },
        {
          id: 7,
          title: "Ecommerce/Shopify",
          content: [
            "We build robust, user-friendly online stores that drive sales and provide seamless shopping experiences.",
          ],
        },
        {
          id: 8,
          title: "WEB 3.0 / NFT Website",
          content: [
            "We develop cutting-edge websites leveraging Web 3.0 technologies and supporting NFT functionalities.",
          ],
        },
        {
          id: 9,
          title: "Motion graphics and video",
          content: [
            "We create dynamic visual content that brings your website to life and effectively communicates your message.",
          ],
        },
        {
          id: 10,
          title: "Backend & CMS Development",
          content: [
            "We build powerful, scalable backend systems and user-friendly content management solutions.",
          ],
        },
        {
          id: 11,
          title: "Frontend development",
          content: [
            "We craft responsive, intuitive user interfaces that provide exceptional user experiences across all devices.",
          ],
        },
        {
          id: 12,
          title: "ERP integration",
          content: [
            "We seamlessly integrate your website with ERP systems to streamline your business processes.",
          ],
        },
        {
          id: 13,
          title: "CRM development",
          content: [
            "We develop custom CRM solutions that help you manage customer relationships effectively.",
          ],
        },
        {
          id: 14,
          title: "Block Chain / Smart Contracts",
          content: [
            "We implement blockchain technologies and smart contracts to enhance security and automate processes.",
          ],
        },
      ],
    },
    {
      title: "Digital Marketing",
      description:
        "A perfect digital marketing strategy should be invisible to the audience. It should feel natural and orchestrate a rich, fun, and learning experience for the visitors through all the sensory medium.",
      accordionItems: [
        {
          id: 1,
          title: "SEO – Search Engine Optimization",
          content: [
            "Improve website visibility in search engine results",
            "Keyword research and optimization",
            "On-page and off-page SEO techniques",
            "Link building and content strategy",
          ],
        },
        {
          id: 2,
          title: "GMB/GBP – Google Business Profile",
          content: [
            "Optimize and manage Google Business Profile",
            "Improve local search visibility",
            "Manage customer reviews and ratings",
            "Enhance online presence for local businesses",
          ],
        },
        {
          id: 3,
          title: "SEM – Search Engine Marketing",
          content: [
            "Create and manage Google Ads campaigns",
            "Develop targeted ad copy and landing pages",
            "Optimize bidding strategies for maximum ROI",
            "Conduct A/B testing for ad performance",
          ],
        },
        {
          id: 4,
          title: "SMM – Social Media Marketing",
          content: [
            "Develop and execute social media strategies",
            "Create engaging content for various platforms",
            "Manage social media advertising campaigns",
            "Analyze social media performance and engagement",
          ],
        },
        {
          id: 5,
          title: "Content Marketing",
          content: [
            "Develop comprehensive content strategies",
            "Create valuable and engaging content across formats",
            "Implement content distribution tactics",
            "Measure content performance and ROI",
          ],
        },
        {
          id: 6,
          title: "Video Creation/Editing /Marketing",
          content: [
            "Produce high-quality video content",
            "Edit and optimize videos for different platforms",
            "Develop video marketing strategies",
            "Analyze video performance and engagement",
          ],
        },
        {
          id: 7,
          title: "Influencer Marketing",
          content: [
            "Identify and partner with relevant influencers",
            "Develop influencer campaign strategies",
            "Manage influencer relationships",
            "Measure influencer campaign effectiveness",
          ],
        },
        {
          id: 8,
          title: "NFT 360",
          content: [
            "Develop NFT marketing strategies",
            "Create and promote NFT collections",
            "Manage NFT community engagement",
            "Analyze NFT market trends and performance",
          ],
        },
      ],
    },
    {
      title: "Reputation Management",
      description:
        "Your reputation online attributes to how successful your business will be in the marketplace. The 24/7 digital environment today determines how customers buy your products or services. 94% of consumers today conduct research online on search engines and social media sites before making a purchase. Therefore, the consensus of the public perception of your company online is of utmost importance.",
      accordionItems: [
        {
          id: 1,
          title: "Content Removal",
          content: [
            "Identify and address negative online content",
            "Implement legal and ethical content removal strategies",
            "Negotiate with content publishers for removal",
            "Provide guidance on preventing future negative content",
          ],
        },
        {
          id: 2,
          title: "Review Management",
          content: [
            "Monitor and respond to customer reviews across platforms",
            "Encourage positive reviews from satisfied customers",
            "Develop strategies to address negative feedback",
            "Analyze review trends to improve products and services",
          ],
        },
        {
          id: 3,
          title: "Google Reviews",
          content: [
            "Optimize Google My Business profile",
            "Implement strategies to increase positive Google reviews",
            "Respond professionally to all Google reviews",
            "Leverage Google reviews for improved local SEO",
          ],
        },
        {
          id: 4,
          title: "FB reviews",
          content: [
            "Manage and monitor Facebook business page reviews",
            "Engage with customers through Facebook reviews",
            "Develop strategies to improve Facebook ratings",
            "Utilize Facebook reviews for social proof and marketing",
          ],
        },
        {
          id: 5,
          title: "Reputation Monitoring",
          content: [
            "Set up comprehensive online reputation monitoring",
            "Track brand mentions across digital channels",
            "Analyze sentiment and trends in brand perception",
            "Provide actionable insights for reputation improvement",
          ],
        },
        {
          id: 6,
          title: "Branding",
          content: [
            "Develop and maintain consistent brand identity",
            "Create brand guidelines and assets",
            "Implement brand building strategies across channels",
            "Monitor and protect brand reputation online",
          ],
        },
      ],
    },
    {
      title: "Mobile App",
      description:
        "Mobile app development creates user-friendly, feature-rich applications for smartphones and tablets, enhancing customer engagement and providing seamless mobile experiences.",
      accordionItems: [
        {
          id: 1,
          title: "App Design and Development",
          content: [
            "Create intuitive and visually appealing app interfaces",
            "Develop native or cross-platform mobile applications",
            "Implement robust features and functionalities",
            "Ensure smooth performance across different devices",
          ],
        },
        {
          id: 2,
          title: "App Store Optimization (ASO)",
          content: [
            "Optimize app store listings for better visibility",
            "Implement keyword strategies for app discovery",
            "Design eye-catching app icons and screenshots",
            "Monitor and improve app store performance metrics",
          ],
        },
        {
          id: 3,
          title: "User Experience (UX) Design",
          content: [
            "Conduct user research and create user personas",
            "Develop intuitive app navigation and information architecture",
            "Design user-friendly interfaces and interactions",
            "Perform usability testing and iterate based on feedback",
          ],
        },
        {
          id: 4,
          title: "App Maintenance and Support",
          content: [
            "Provide ongoing technical support and bug fixes",
            "Implement regular app updates and improvements",
            "Monitor app performance and user feedback",
            "Ensure compatibility with new OS versions and devices",
          ],
        },
        {
          id: 5,
          title: "App Marketing and Promotion",
          content: [
            "Develop app launch and growth strategies",
            "Implement app install campaigns across channels",
            "Utilize in-app marketing and push notifications",
            "Analyze user acquisition and retention metrics",
          ],
        },
      ],
    },
  ];

  return (
    <div
      ref={ref}
      id="services-section"
      className="bg-[#2c2b2b] text-[#e2dcc8] p-4 sm:p-6 md:p-10 font-['Montserrat',_sans-serif] h-[150vh] overflow-hidden relative"
    >
      <style jsx>{`
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
        .animate-left {
          animation: slideInLeft 1s ease-out forwards;
        }
        .animate-right {
          animation: slideInRight 1s ease-out forwards;
        }

        @keyframes zoom-in {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2c2b2b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2dcc8;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c5b99d;
        }
        .service-title::before {
          content: attr(data-number);
          display: inline-block;
          margin-right: 10px;
          color: transparent;
          -webkit-text-stroke: 1px #e2dcc8;
          padding: 0 10px;
        }
      `}</style>

      <h1 className="fontmycustom text-4xl sm:text-6xl lg:text-9xl mb-8 sm:mb-16 text-center text-[#e2dcc8] flex justify-center items-center">
        <span ref={headingRef} className="inline-block">
          SERVICES
        </span>
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 md:sticky md:top-10 self-start pl-2 sm:pl-4 md:pl-[75px] pt-4 md:pt-[100px] h-auto md:h-[calc(100vh-140px)] mb-8 md:mb-0 overflow-y-auto md:overflow-y-visible">
          {services.map((service, index) => (
            <h2
              key={index}
              onClick={() => handleServiceClick(index)}
              className={`service-title text-xl md:text-[2vw] mb-6 md:mb-20 cursor-pointer transition-all duration-300 hover:text-[#e2dcc8] hover:scale-105 
                ${visibleSection === index ? "animate-zoom-in" : ""}`}
              data-number={`0${index + 1}/`}
            >
              {service.title}
            </h2>
          ))}
        </div>
        <div
          className="md:w-2/3 h-[calc(150vh-275px)] overflow-y-auto pr-2 sm:pr-4 md:pr-10 pl-2 sm:pl-4 md:pl-8 custom-scrollbar"
          ref={rightSideRef}
        >
          {services.map((service, serviceIndex) => (
            <div
              key={serviceIndex}
              className="mb-16 md:mb-32"
              ref={(el) => (serviceSectionRefs.current[serviceIndex] = el)}
            >
              <h2
                className="text-3xl md:text-[4vw] font-bold mb-2 text-transparent bg-clip-text from-[#e2dcc8] to-[#e2dcc8] text-center p-2"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #e3ddc8",
                  textStroke: "1px #e3ddc8",
                }}
              >
                {service.title.split(" ")[0]}
              </h2>
              <h2
                className="text-3xl md:text-[4vw] font-bold mb-4 md:mb-6 text-transparent bg-clip-text from-[#e2dcc8] to-[#e2dcc8] text-center p-4"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #e3ddc8",
                  textStroke: "1px #e3ddc8",
                }}
              >
                {service.title.split(" ").slice(1).join(" ")}
              </h2>
              <div className="mb-6 md:mb-8 text-base md:text-[1.5vw]">
                {Array.isArray(service.description) ? (
                  <ul className="list-square list-inside space-y-2">
                    {service.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{service.description}</p>
                )}
              </div>

              <div className="space-y-4">
                {service.accordionItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-b-2 border-[#e2dcc8] rounded-b bg-[#2c2b2b] mb-2"
                  >
                    <button
                      className={`w-full text-left py-3 sm:py-4 flex items-center`}
                      onClick={() =>
                        handleAccordionToggle(`${serviceIndex}-${item.id}`)
                      }
                    >
                      <span className="flex items-center justify-between w-full font-semibold">
                        <span
                          className="text-xl md:text-[4vw] text-transparent bg-clip-text from-[#e2dcc8] to-[#e2dcc8] p-2 text-start"
                          style={{
                            color:
                              activeIndex === `${serviceIndex}-${item.id}`
                                ? "#e2dcc8"
                                : "transparent",
                            WebkitTextStroke:
                              activeIndex === `${serviceIndex}-${item.id}`
                                ? "none"
                                : "1px #e3ddc8",
                            textStroke:
                              activeIndex === `${serviceIndex}-${item.id}`
                                ? "none"
                                : "1px #e3ddc8",
                            transition: "color 0.3s, WebkitTextStroke 0.3s",
                          }}
                        >
                          {item.id < 10 ? `0${item.id}` : item.id}
                        </span>
                        <span className="flex-grow text-lg md:text-[1.5vw] text-transparent bg-clip-text bg-gradient-to-r from-[#e2dcc8] to-[#e2dcc8] text-center">
                          {item.title}
                        </span>
                      </span>

                      <span
                        className={`transform transition-transform duration-300 ${
                          activeIndex === `${serviceIndex}-${item.id}`
                            ? "rotate-180"
                            : ""
                        }`}
                      >
                        &#9660;
                      </span>
                    </button>
                    {activeIndex === `${serviceIndex}-${item.id}` && (
                      <div className="p-3 sm:p-4 ">
                        <ul className="list-disc list-inside space-y-2 text-sm md:text-[1.2vw]">
                          {item.content.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Services;
