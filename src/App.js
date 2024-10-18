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
import "./styles/App.css";

function App() {
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
  const [isVerticalScrollingActive, setIsVerticalScrollingActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6; // Assuming 6 pages including Page5

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

        const servicesSection = page5Ref.current.querySelector("#services-section");
        if (servicesSection) {
          const servicesSectionTop = servicesSection.offsetTop - page5Ref.current.offsetTop;
          const servicesSectionBottom = servicesSectionTop + servicesSection.offsetHeight;
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
        setCurrentPage(1);
        break;
      case "about":
        newPosition = window.innerWidth * 4.9;
        setCurrentPage(5);
        break;
      case "services":
        newPosition = maxScroll;
        setCurrentPage(6);
        setTimeout(() => {
          if (page5Ref.current) {
            const servicesSection = page5Ref.current.querySelector("#services-section");
            if (servicesSection) {
              const scrollTop = servicesSection.offsetTop - page5Ref.current.offsetTop;
              page5Ref.current.scrollTop = scrollTop;

              const rightSideContent = servicesSection.querySelector(".custom-scrollbar");
              if (rightSideContent) {
                rightSideContent.scrollTop = 0;
              }
            }
          }
        }, 500);
        break;
      case "portfolio":
      case "blog":
        newPosition = maxScroll;
        setCurrentPage(6);
        setTimeout(() => {
          if (page5Ref.current) {
            const targetSection = page5Ref.current.querySelector(`#${pageNumber}-section`);
            if (targetSection) {
              page5Ref.current.scrollTop = targetSection.offsetTop - page5Ref.current.offsetTop;
            }
          }
        }, 100);
        break;
      case "last":
        newPosition = maxScroll;
        setCurrentPage(6);
        setTimeout(() => {
          if (page5Ref.current) {
            page5Ref.current.scrollTop = 0;
          }
        }, 100);
        break;
      case "last-vertical":
        newPosition = maxScroll;
        setCurrentPage(6);
        setTimeout(() => {
          if (page5Ref.current) {
            page5Ref.current.scrollTop = page5Ref.current.scrollHeight - page5Ref.current.clientHeight;
          }
        }, 100);
        break;
      default:
        if (typeof pageNumber === "number") {
          newPosition = Math.min((pageNumber - 1) * window.innerWidth, maxScroll);
          setCurrentPage(pageNumber);
        } else {
          newPosition = 0;
          setCurrentPage(1);
        }
    }

    setScrollPosition(newPosition);
    setScrollMultiplier(3);
    setTimeout(() => setScrollMultiplier(1), 2000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (page5Ref.current && isInServicesSection) {
        const servicesSection = page5Ref.current.querySelector("#services-section");
        if (servicesSection) {
          const rightSideContent = servicesSection.querySelector(".custom-scrollbar");
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
        const servicesSection = page5Ref.current.querySelector("#services-section");
        const rightSideContent = servicesSection?.querySelector(".custom-scrollbar");

        if (isInServicesSection && rightSideContent && cursorOverRightSide) {
          const isScrollingUp = e.deltaY < 0;
          const isScrollingDown = e.deltaY > 0;
          const isAtTopOfServices = rightSideContent.scrollTop === 0;
          const isAtBottomOfServices =
            rightSideContent.scrollTop + rightSideContent.clientHeight >=
            rightSideContent.scrollHeight;

          if (isScrollingDown && !isAtBottomOfServices) {
            rightSideContent.scrollTop += e.deltaY;
          } else if (isScrollingUp && !isAtTopOfServices) {
            rightSideContent.scrollTop += e.deltaY;
          } else if (
            (isScrollingUp && isAtTopOfServices) ||
            (isScrollingDown && isAtBottomOfServices)
          ) {
            const newScrollTop = page5Ref.current.scrollTop + e.deltaY;
            if (
              newScrollTop >= 0 &&
              newScrollTop <= page5Ref.current.scrollHeight - page5Ref.current.clientHeight
            ) {
              page5Ref.current.scrollTop = newScrollTop;
            }
          }
        } else {
          const newScrollTop = page5Ref.current.scrollTop + e.deltaY;
          if (newScrollTop <= 0 && e.deltaY < 0) {
            smoothScroll(-100);
          } else if (
            newScrollTop >= 0 &&
            newScrollTop <= page5Ref.current.scrollHeight - page5Ref.current.clientHeight
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
  }, [scrollPosition, maxScroll, scrollMultiplier, isInServicesSection, cursorOverRightSide]);

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

      // Determine if it's a horizontal swipe (more horizontal than vertical movement)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault(); // Prevent default scrolling behavior

        // Determine if it's a significant swipe (e.g., more than 50px)
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0 && currentPage < totalPages) {
            // Swipe left, go to next page
            setCurrentPage(currentPage + 1);
          } else if (deltaX < 0 && currentPage > 1) {
            // Swipe right, go to previous page
            setCurrentPage(currentPage - 1);
          }
        }
      } else {
        // Vertical scrolling logic for the last page
        const isLastPage = currentPage === totalPages;

        if (isLastPage && page5Ref.current) {
          if (page5Ref.current.scrollTop > 0 || deltaY > 0) {
            setIsVerticalScrollingActive(true);
            page5Ref.current.scrollTop += deltaY;
          } else if (page5Ref.current.scrollTop === 0 && deltaY < 0) {
            setIsVerticalScrollingActive(false);
            smoothScroll(deltaY);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
      setTouchStartY(null);
      setIsVerticalScrollingActive(false);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: false });
      containerRef.current.addEventListener("touchmove", handleTouchMove, { passive: false });
      containerRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchstart", handleTouchStart);
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentPage, totalPages, touchStartX, touchStartY, isVerticalScrollingActive]);

  useEffect(() => {
    // Update scroll position when currentPage changes
    setScrollPosition((currentPage - 1) * window.innerWidth);
  }, [currentPage]);

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
              isInitialRender ? "" : "transition-transform duration-500 ease-out"
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

export default App;