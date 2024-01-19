"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div
      className="mx-4 flex items-center justify-center sm:mx-10 lg:mx-96"
      style={{ height: "calc(100vh - 77px)" }}
    >
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
