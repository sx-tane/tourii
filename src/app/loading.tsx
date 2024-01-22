"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div className="fixed left-1/2 top-1/2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1.0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/image/tourii-loading.svg"
          alt="Loading"
          width={130}
          height={130}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
