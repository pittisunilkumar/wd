import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProgressBar from "./components/ProgressBar";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import About from "./components/About";
import Page5 from "./components/Page5";
import Loader from "./components/Loader";
import "./styles/App.css";

function AppContent() {
  const containerRef = useRef(null);
  const page5Ref = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [verticalScrollPosition, setVerticalScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollMultiplier, setScrollMultiplier] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInServicesSection, setIsInServicesSection] = useState(false);
  const [cursorOverRightSide, setCursorOverRightSide] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    const updateScrollLimits = () => {
      setMaxScroll(containerRef.current.scrollWidth - window.innerWidth);
    };

    updateScrollLimits();
    window.addEventListener("resize", updateScrollLimits);

    return () => {
      window.removeEventListener("resize", updateScrollLimits);
    };
  }, []);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  useEffect(() => {
    const handleVerticalScroll = () => {
      if (page5Ref.current) {
        setVerticalScrollPosition(page5Ref.current.scrollTop);

        const servicesSection =
          page5Ref.current.querySelector("#services-section");
        if (servicesSection) {
          const servicesSectionTop =
            servicesSection.offsetTop - page5Ref.current.offsetTop;
          const servicesSectionBottom =
            servicesSectionTop + servicesSection.offsetHeight;
          setIsInServicesSection(
            page5Ref.current.scrollTop >= servicesSectionTop &&
              page5Ref.current.scrollTop < servicesSectionBottom
          );
        }
      }
    };

    if (page5Ref.current) {
      page5Ref.current.addEventListener("scroll", handleVerticalScroll);
    }

    return () => {
      if (page5Ref.current) {
        page5Ref.current.removeEventListener("scroll", handleVerticalScroll);
      }
    };
  }, []);

  const smoothScroll = (delta) => {
    const oldPosition = scrollPosition;
    const newPosition = Math.max(
      0,
      Math.min(scrollPosition + delta * scrollMultiplier, maxScroll)
    );

    if (oldPosition !== newPosition) {
      setScrollPosition(newPosition);
      return true;
    }
    return false;
  };

  const scrollToPage = (pageNumber) => {
    let newPosition;
    switch (pageNumber) {
      case "home":
        newPosition = 0;
        break;
      case "about":
        newPosition = window.innerWidth * 4.9;
        break;
      case "services":
        newPosition = maxScroll;
        // console.log('Scrolling to services, newPosition:', newPosition);
        setTimeout(() => {
          if (page5Ref.current) {
            const servicesSection =
              page5Ref.current.querySelector("#services-section");
            // console.log('Services section found:', servicesSection);
            if (servicesSection) {
              const scrollTop =
                servicesSection.offsetTop - page5Ref.current.offsetTop;
              // console.log('Scrolling to:', scrollTop);
              page5Ref.current.scrollTop = scrollTop;

              const rightSideContent =
                servicesSection.querySelector(".custom-scrollbar");
              if (rightSideContent) {
                // console.log('Scrolling right side content to top');
                rightSideContent.scrollTop = 0;
              }
            }
          }
        }, 500);
        break;
      case "portfolio":
      case "blog":
        newPosition = maxScroll;
        setTimeout(() => {
          if (page5Ref.current) {
            const targetSection = page5Ref.current.querySelector(
              `#${pageNumber}-section`
            );
            if (targetSection) {
              page5Ref.current.scrollTop =
                targetSection.offsetTop - page5Ref.current.offsetTop;
            }
          }
        }, 100);
        break;
      case "last":
        newPosition = maxScroll;
        setTimeout(() => {
          if (page5Ref.current) {
            page5Ref.current.scrollTop = 0;
          }
        }, 100);
        break;
      case "last-vertical":
        newPosition = maxScroll;
        setTimeout(() => {
          if (page5Ref.current) {
            page5Ref.current.scrollTop =
              page5Ref.current.scrollHeight - page5Ref.current.clientHeight;
          }
        }, 100);
        break;
      default:
        if (typeof pageNumber === "number") {
          newPosition = Math.min(
            (pageNumber - 1) * window.innerWidth,
            maxScroll
          );
        } else {
          newPosition = 0;
        }
    }

    setScrollPosition(newPosition);
    setScrollMultiplier(3);
    setTimeout(() => setScrollMultiplier(1), 2000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (page5Ref.current && isInServicesSection) {
        const servicesSection =
          page5Ref.current.querySelector("#services-section");
        if (servicesSection) {
          const rightSideContent =
            servicesSection.querySelector(".custom-scrollbar");
          if (rightSideContent) {
            const rect = rightSideContent.getBoundingClientRect();
            setCursorOverRightSide(
              e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
          }
        }
      } else {
        setCursorOverRightSide(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInServicesSection]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const isLastPage = scrollPosition >= maxScroll - 10;

      if (isLastPage && page5Ref.current) {
        const servicesSection =
          page5Ref.current.querySelector("#services-section");
        const rightSideContent =
          servicesSection?.querySelector(".custom-scrollbar");

        if (isInServicesSection && rightSideContent && cursorOverRightSide) {
          const isScrollingUp = e.deltaY < 0;
          const isScrollingDown = e.deltaY > 0;
          const isAtTopOfServices = rightSideContent.scrollTop === 0;
          const isAtBottomOfServices =
            rightSideContent.scrollTop + rightSideContent.clientHeight >=
            rightSideContent.scrollHeight;

          if (isScrollingDown && !isAtBottomOfServices) {
            // Scrolling down within services
            rightSideContent.scrollTop += e.deltaY;
          } else if (isScrollingUp && !isAtTopOfServices) {
            // Scrolling up within services
            rightSideContent.scrollTop += e.deltaY;
          } else if (
            (isScrollingUp && isAtTopOfServices) ||
            (isScrollingDown && isAtBottomOfServices)
          ) {
            // Allow Page5 to scroll when at the edges of services
            const newScrollTop = page5Ref.current.scrollTop + e.deltaY;
            if (
              newScrollTop >= 0 &&
              newScrollTop <=
                page5Ref.current.scrollHeight - page5Ref.current.clientHeight
            ) {
              page5Ref.current.scrollTop = newScrollTop;
            }
          }
        } else {
          // Normal vertical scrolling in Page5
          const newScrollTop = page5Ref.current.scrollTop + e.deltaY;
          if (newScrollTop <= 0 && e.deltaY < 0) {
            // At the top of Page5 and trying to scroll up further
            smoothScroll(-100);
          } else if (
            newScrollTop >= 0 &&
            newScrollTop <=
              page5Ref.current.scrollHeight - page5Ref.current.clientHeight
          ) {
            page5Ref.current.scrollTop = newScrollTop;
          }
        }
      } else {
        smoothScroll(e.deltaY);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [
    scrollPosition,
    maxScroll,
    scrollMultiplier,
    isInServicesSection,
    cursorOverRightSide,
  ]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (touchStartX === null || touchStartY === null) {
        return;
      }

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Determine if the user is scrolling horizontally or vertically
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal scrolling
        e.preventDefault();
        smoothScroll(deltaX);
      } else {
        // Vertical scrolling
        if (scrollPosition >= maxScroll - 10 && page5Ref.current) {
          const newScrollTop = page5Ref.current.scrollTop + deltaY;
          if (
            newScrollTop >= 0 &&
            newScrollTop <=
              page5Ref.current.scrollHeight - page5Ref.current.clientHeight
          ) {
            page5Ref.current.scrollTop = newScrollTop;
          }
        }
      }

      setTouchStartX(touchEndX);
      setTouchStartY(touchEndY);
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
      setTouchStartY(null);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      containerRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      containerRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [scrollPosition, maxScroll, touchStartX, touchStartY]);

  return (
    <Router>
      <div className="font-sans overflow-hidden flex h-full bg-[#f7f7f7]">
        <Sidebar scrollToPage={scrollToPage} />
        <ProgressBar
          scrollPosition={scrollPosition}
          verticalScrollPosition={verticalScrollPosition}
          maxScroll={maxScroll}
          page5Ref={page5Ref}
        />
        <div className="flex-grow overflow-hidden">
          <div
            ref={containerRef}
            className={`flex w-[600vw] h-screen ${
              isInitialRender
                ? ""
                : "transition-transform duration-500 ease-out"
            }`}
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
            <About />
            <Page5 ref={page5Ref} />
          </div>
        </div>
      </div>
    </Router>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : <AppContent />}</>;
}

export default App;
