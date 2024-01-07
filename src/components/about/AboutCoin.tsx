"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import AboutMenu from "./AboutMenu";

const AboutCoin: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-8 w-8"
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key="aboutMenu"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 w-52"
          >
            <AboutMenu onClose={() => setIsHovered(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="coin"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <Image
              src="/image/about/coin.svg"
              alt="Coin"
              width={30}
              height={30}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutCoin;
