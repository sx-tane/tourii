import type React from "react";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface TouriiLogoAnimationProps {
  onAnimationComplete?: () => void;
}

const TouriiLogoAnimation: React.FC<TouriiLogoAnimationProps> = ({
  onAnimationComplete,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const animateLogo = async () => {
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.6, 0.05, 0.01, 0.9],
        },
      });

      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    animateLogo();
  }, [controls, onAnimationComplete]);

  return (
    <div>
      <motion.object
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        type="image/svg+xml"
        data="/image/homepage/tourii.svg"
        className="w-6/12 sm:w-8/12 h-full"
        aria-label="Tourii Logo"
      />

      <motion.div
        className="mt-5 text-sm md:text-xl lg:text-3xl text-red tracking-[6px] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["EXPLORE", "EARN", "CONNECT."].map((word, index) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.2,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
            className="inline-block"
          >
            {word}
            {index < 2 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + index * 0.2,
                }}
              >
                .&nbsp;
              </motion.span>
            )}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default TouriiLogoAnimation;
