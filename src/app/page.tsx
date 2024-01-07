"use client";

import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import React from "react";
import Header from "@/components/header/Header";
import MainImage from "@/components/homepage/MainImage";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen overflow-hidden"
    >
      <Header />
      <div className="relative flex items-end justify-between">
        <div className="left-0 ml-10">
          <Headline />
        </div>
        <div className="mr-28">
          <MainImage />
        </div>
        <div className="absolute -bottom-14 right-0 z-10 flex">
          <NFTEmblem />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
