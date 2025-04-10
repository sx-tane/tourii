import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle: string[];
  title: string[];
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
}) => {
  return (
    <motion.div
      className="pt-4 p-12 text-center text-red"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <div className="font-bold relative">
        <motion.div>
          <motion.h3 className="text-sm leading-normal tracking-widest sm:text-lg relative z-10">
            {subtitle.map((word, i) => (
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
                {i < subtitle.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.h3>
        </motion.div>
        <motion.h2
          className="mt-2 text-charcoal whitespace-break-spaces text-xl sm:text-3xl lg:text-4xl tracking-widest"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.6, 0.05, 0.01, 0.9],
          }}
        >
          {title.map((word, i) => (
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
              {i < title.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </motion.div>
  );
};
