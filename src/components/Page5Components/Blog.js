import React, { useRef, useEffect, useState } from "react";
import "../../styles/Blog.css";

import BLOG from "../../assets/Rectangle 1084BLOGBAR.svg";
import BLOG1 from "../../assets/Rectangle 1070BLOG1.svg";
import BLOG2 from "../../assets/Rectangle 1070BLOG2.svg";
import BLOG3 from "../../assets/Rectangle 1070BLOG3.svg";
import BLOG4 from "../../assets/Rectangle 1070BLOG4.svg";
import BLOG5 from "../../assets/Rectangle 1070BLOG5.svg";
import BLOG6 from "../../assets/Rectangle 1070BLOG6.svg";

import AnimatedHeader from "./AnimatedHeader.js";



const BlogPost = ({ number, date, content, imagePosition, image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const postRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, []);

  const imageClass = imagePosition === "left" ? "md:order-1" : "md:order-2";
  const contentClass = imagePosition === "left" ? "md:order-2" : "md:order-1";

  return (
    <article
      ref={postRef}
      className={`bg-[#333333] custom-textcolorb overflow-hidden card ${
        isVisible ? "in-view" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div
          className={`md:w-1/3 mt-4 md:mt-0 ${imageClass} blogpage-blog-image-container`}
        >
          <img
            src={image}
            alt="Blog post"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div
          className={`md:w-2/3 p-6 ${contentClass} blogpage-blog-text-container custom-textcolorb`}
        >
          <div className="blog-card-title">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 custom-textcolorb">
              <span
                className="fontmycustom"
                style={{
                  WebkitTextStroke: "1px #e3ddc8", // Apply stroke color
                  color: "transparent", // Hide original text color
                  fontSize: "4xl md:5xl", // Responsive font sizes
                }}
              >
                {number}
              </span>{" "}
              Blog Title
            </h2>
          </div>
          <p className="text-sm text-[#e3ddc8] mb-2">{date}</p>
          <img src={BLOG} alt="Blog Bar" className="mb-4 text-[#e3ddc8]" />

          <p className="text-[#e3ddc8] custom-textcolorb">{content}</p>
        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const blogPosts = [
    {
      number: "01",
      date: "DECEMBER 27, 2022",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      imagePosition: "left",
      image: BLOG1,
    },
    {
      number: "02",
      date: "DECEMBER 27, 2022",
      content:
        "is simply dummy text of the printing and typesetting industry...",
      imagePosition: "right",
      image: BLOG2,
    },
    {
      number: "03",
      date: "DECEMBER 27, 2022",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      imagePosition: "left",
      image: BLOG3,
    },
    {
      number: "04",
      date: "DECEMBER 27, 2022",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      imagePosition: "right",
      image: BLOG4,
    },
    {
      number: "05",
      date: "DECEMBER 27, 2022",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      imagePosition: "left",
      image: BLOG5,
    },
    {
      number: "06",
      date: "DECEMBER 27, 2022",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      imagePosition: "right",
      image: BLOG6,
    },
  ];

  return (
    <div
      id="blog-section"
      className="blogpage-container min-h-screen flex flex-col justify-center items-center p-8 bg-[#1c1c1c] text-[#e3ddc8]"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <AnimatedHeader />

        <main className="space-y-8">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Blog;
