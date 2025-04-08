"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Line from "../about/divider-line/line";
import Iphone15 from "./iphone";

interface HowTouriiWorksProps {
  sections: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }[];
  currentImage: string;
  setCurrentImage: (image: string) => void;
  sectionRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const HowTouriiWorks: React.FC<HowTouriiWorksProps> = ({
  sections,
  currentImage,
  setCurrentImage,
  sectionRefs,
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (index: number) => {
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;
    setCurrentSectionIndex(index);
    setCurrentImage(sections[index]?.image ?? "/image/default-image.jpg");

    const target = document.getElementById(`section-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;
    e.preventDefault();

    const direction = Math.sign(e.deltaY);
    const newIndex = Math.max(
      0,
      Math.min(sections.length - 1, currentSectionIndex + direction)
    );

    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
    }
  };

  // Touch handling for mobile devices
  useEffect(() => {
    const leftSection = document.querySelector(".w-full.md\\:w-1\\/2");
    if (!leftSection) return;

    let touchStartY = 0;
    const TOUCH_THRESHOLD = 100;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0]?.clientY;
      if (touchY === undefined) return;

      const diff = touchStartY - touchY;
      if (Math.abs(diff) > TOUCH_THRESHOLD) {
        const direction = Math.sign(diff);
        const newIndex = Math.max(
          0,
          Math.min(sections.length - 1, currentSectionIndex + direction)
        );

        if (newIndex !== currentSectionIndex) {
          e.preventDefault();
          scrollToSection(newIndex);
        }
      }
    };

    leftSection.addEventListener(
      "touchstart",
      handleTouchStart as EventListener
    );
    leftSection.addEventListener("touchmove", handleTouchMove as EventListener);

    return () => {
      leftSection.removeEventListener(
        "touchstart",
        handleTouchStart as EventListener
      );
      leftSection.removeEventListener(
        "touchmove",
        handleTouchMove as EventListener
      );
    };
  }, [currentSectionIndex, sections.length]);

  // Use Intersection Observer for section detection
  useEffect(() => {
    if (!sectionRefs.current) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id) {
          const idParts = entry.target.id.split("-");
          const index = idParts[1] ? Number.parseInt(idParts[1]) : Number.NaN;
          if (!Number.isNaN(index) && index >= 0 && index < sections.length) {
            setCurrentSectionIndex(index);
            setCurrentImage(
              sections[index]?.image ?? "/image/default-image.jpg"
            );
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    for (let i = 0; i < sectionRefs.current.length; i++) {
      const ref = sectionRefs.current[i];
      if (ref) {
        observer.observe(ref);
      }
    }

    return () => observer.disconnect();
  }, [sections, setCurrentImage, sectionRefs]);

  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
  };

  return (
    <section className="relative mt-20">
      <div className="flex justify-center w-full px-5">
        <div className="w-full max-w-screen-md">
          <Line />
        </div>
      </div>
      <div className="z-20">
        <motion.div
          className="py-12 text-center text-red"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-bold uppercase relative">
            <motion.div {...textAnimation}>
              <motion.h3 className="text-base lg:text-lg leading-normal tracking-widest md:text-lg relative z-10">
                {["How", "Tourii", "Works"].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.1,
                      ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                  >
                    {word}
                    {i < 2 ? " " : ""}
                  </motion.span>
                ))}
              </motion.h3>
            </motion.div>
            <motion.h2
              className="mt-2 text-black whitespace-break-spaces break-all text-3xl lg:text-5xl tracking-widest"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
            >
              {["IN", "THREE", "SIMPLE", "WAYS"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.1,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                >
                  {word}
                  {i < 3 ? " " : ""}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        </motion.div>

        <div className="flex lg:flex-row flex-col z-20 relative">
          {/* Content Section */}
          <div
            className="w-full lg:w-1/2"
            onWheel={(e) => {
              if (window.innerWidth >= 1024) {
                // Only apply wheel handler for lg and above
                handleWheel(e);
              }
            }}
          >
            {sections.map((section, index) => (
              <motion.div
                id={`section-${index}`}
                key={section.title}
                className="lg:h-[80vh] flex items-center justify-center overflow-hidden"
                ref={(el) => {
                  if (!sectionRefs.current) sectionRefs.current = [];
                  sectionRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
              >
                <motion.div
                  className="w-10/12 text-left lg:pl-8 flex flex-col items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                >
                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden w-full flex flex-col items-center">
                    {/* Title and Subtitle */}
                    <motion.div
                      className="w-full max-w-md rounded-lg p-8 mb-8 flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.6, 0.05, 0.01, 0.9],
                      }}
                    >
                      <motion.h2
                        className="text-lg font-bold uppercase text-warmGrey border-red border-2 bg-red rounded-full tracking-widest w-32 h-32 flex items-center justify-center text-center my-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3,
                          ease: [0.6, 0.05, 0.01, 0.9],
                        }}
                      >
                        {section.title}
                      </motion.h2>
                      <motion.h3
                        className="text-base md:text-lg text-red tracking-widest font-bold uppercase mb-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4,
                          ease: [0.6, 0.05, 0.01, 0.9],
                        }}
                      >
                        {section.subtitle}
                      </motion.h3>
                      <motion.p
                        className="text-black tracking-widest font-normal text-pretty text-center w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.6,
                          delay: 0.5,
                          ease: [0.6, 0.05, 0.01, 0.9],
                        }}
                      >
                        {section.description}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block w-full pl-12 text-left">
                    <motion.h2
                      className="lg:text-6xl font-bold uppercase text-black tracking-widest"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: [0.6, 0.05, 0.01, 0.9],
                      }}
                    >
                      {section.title}
                    </motion.h2>
                    <motion.h3
                      className="text-lg text-red tracking-widest font-bold uppercase my-5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.6, 0.05, 0.01, 0.9],
                      }}
                    >
                      {section.subtitle}
                    </motion.h3>
                    <motion.p
                      className="text-black tracking-widest font-light text-pretty"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5,
                        ease: [0.6, 0.05, 0.01, 0.9],
                      }}
                    >
                      {section.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Phone Section */}
          <div className="hidden lg:block w-full lg:w-1/2 lg:min-h-screen">
            <div className="sticky top-1/2 lg:top-10 -translate-y-1/2 lg:translate-y-0 h-[80vh] z-30 flex justify-center items-center">
              <div className="w-[320px]">
                <Iphone15>
                  <div className="relative w-full h-full bg-warmGrey overflow-hidden">
                    {sections.map((section, index) => (
                      <motion.div
                        key={`phone-${section.title}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                          opacity: currentImage === section.image ? 1 : 0,
                          scale: currentImage === section.image ? 1 : 0.95,
                          backgroundColor:
                            currentImage === section.image
                              ? index === 0
                                ? "#FFD8CC"
                                : index === 1
                                ? "#CCFFDB"
                                : "#CCE8FF"
                              : "transparent",
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.6, 0.05, 0.01, 0.9],
                        }}
                      >
                        <motion.div
                          className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: currentImage === section.image ? 1 : 0,
                            y: currentImage === section.image ? 0 : 20,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: [0.6, 0.05, 0.01, 0.9],
                          }}
                        >
                          <motion.h3
                            className="text-2xl font-bold mb-4 text-gray-800"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: currentImage === section.image ? 1 : 0,
                              y: currentImage === section.image ? 0 : 20,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3,
                              ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                          >
                            {section.title}
                          </motion.h3>
                          <motion.div
                            className="w-16 h-16 rounded-full bg-white/50 mb-4 flex items-center justify-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: currentImage === section.image ? 1 : 0.8,
                              opacity: currentImage === section.image ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4,
                              ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                          >
                            <span className="text-3xl">
                              {index === 0 ? "🌍" : index === 1 ? "🏆" : "👥"}
                            </span>
                          </motion.div>
                          <motion.p
                            className="text-sm text-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: currentImage === section.image ? 1 : 0,
                              y: currentImage === section.image ? 0 : 20,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5,
                              ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                          >
                            {section.subtitle}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    ))}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full" />
                  </div>
                </Iphone15>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTouriiWorks;
