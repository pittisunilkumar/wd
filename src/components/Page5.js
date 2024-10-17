import React, { forwardRef } from "react";
import OurTeam from "./Page5Components/OurTeam";
import TransitionSection from "./Page5Components/TransitionSection";
import Services from "./Page5Components/Services";
import Lastestproject from "./Page5Components/Lastestproject";
import Portfolio from "./Page5Components/Portfolio";
import Blog from "./Page5Components/Blog";
import Contact from "./Page5Components/Contact";
import Addpage from "./Page5Components/Addpage";
import Transition from "./Page5Components/Transition";
import Footer from "./Page5Components/Footer";

const Page5 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      id="page5"
      className="flex-none w-screen h-screen overflow-y-auto bg-[#292929] text-[#e0e0e0]"
    >
      <div className="w-full">
        <OurTeam id="team-section" />
        <TransitionSection />
        <div id="services-section">
          <Services />
        </div>
        <Addpage />
        <Lastestproject />
        <Portfolio id="portfolio-section" />
        <Transition />
        <Blog id="blog-section" />
        <Contact id="contact-section" />
        {/* <Footer/> */}
      </div>
    </div>
  );
});

export default Page5;
