import React from "react";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["700"],
  preload: true,
  display: "block",
});

interface PassportCardProps {
  passportType: string;
  characters: string[];
  avatarUrl: string;
}

export const PassportCard: React.FC<PassportCardProps> = ({
  characters,
  avatarUrl,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics for smooth return to center
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform mouse/touch movement into rotation
  const rotateX = useTransform(ySpring, [-20, 20], [5, -5]);
  const rotateY = useTransform(xSpring, [-20, 20], [-5, 5]);

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center md:w-[320px] md:h-[500px] w-[280px] h-[450px]">
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0.6, 0.05, 0.01, 0.9],
        }}
        style={{
          perspective: 1500,
        }}
      >
        <motion.div
          className="w-full h-full"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.3}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          onDragEnd={handleDragEnd}
          style={{
            x: xSpring,
            y: ySpring,
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-full h-full rounded-[50px] bg-red relative overflow-hidden"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              margin: "4px",
              outline: "1px solid #D4AF37",
              outlineOffset: "-10px",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Chinese characters on the left */}
            <div className="absolute left-9 top-9 flex flex-col gap-3">
              {characters.map((char, index) => (
                <span
                  key={index}
                  className={`text-mustard text-2xl font-bold ${notoSerifJP.className}`}
                  style={{ writingMode: "vertical-lr" }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Avatar circle in the middle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="md:w-[160px] md:h-[160px] w-[120px] h-[120px] rounded-full border-2 border-mustard overflow-hidden z-10">
                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    width={160}
                    height={160}
                    className="object-cover z-50"
                    draggable={false}
                  />
                )}
              </div>
            </div>

            {/* Characters on the bottom right */}
            <div className="absolute bottom-9 right-9 flex flex-col items-end gap-3">
              {[...characters].reverse().map((char, index) => (
                <span
                  key={index}
                  className={`text-mustard text-2xl font-bold ${notoSerifJP.className}`}
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-lr",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
