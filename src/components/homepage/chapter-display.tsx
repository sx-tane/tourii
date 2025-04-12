import type React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionTitle } from "@/components/common/section-title";

const ChapterDisplay: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { chapterNumber, storyTitle, imageUrl } = useSelector(
        (state: RootState) => state.chapter
    );

    return (
        <section className="w-full mx-auto">
            <div className="container mx-auto px-4">
                <motion.div
                    className="w-full relative overflow-hidden rounded-[50px]"
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    <div className="aspect-video relative">
                        <Image
                            src={imageUrl}
                            alt={storyTitle}
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                        <motion.div
                            className="absolute bottom-4 left-5 p-3 text-warmGrey uppercase"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                        >
                            <h2 className="tracking-widest font-bold lg:text-2xl">{chapterNumber}</h2>
                            <p className="text-base italic tracking-widest mt-2">{storyTitle}</p>
                        </motion.div>
                        <motion.div
                            className="absolute bottom-4 right-5 p-3"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.6, 0.05, 0.01, 0.9],
                            }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <motion.button
                                className="border-[1px] border-warmGrey rounded-full font-medium overflow-hidden whitespace-nowrap text-lg"
                                initial={{
                                    width: "52px",
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                    backgroundColor: "transparent"
                                }}
                                animate={{
                                    width: isHovered ? "200px" : "52px",
                                    paddingLeft: isHovered ? "20px" : "0",
                                    paddingRight: isHovered ? "20px" : "0",
                                    backgroundColor: isHovered ? "#ECECDC" : "transparent"
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="h-12 flex items-center justify-center relative">
                                    <motion.span
                                        className="absolute text-xl"
                                        animate={{
                                            opacity: isHovered ? 0 : 1,
                                            scale: isHovered ? 0.5 : 1,
                                            color: isHovered ? "#21211B" : "#ECECDC"
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        ➞
                                    </motion.span>
                                    <motion.span
                                        className="absolute font-light tracking-widest italic"
                                        animate={{
                                            opacity: isHovered ? 1 : 0,
                                            scale: isHovered ? 1 : 0.5,
                                            color: isHovered ? "#21211B" : "#ECECDC"
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        READ NOW
                                    </motion.span>
                                </div>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ChapterDisplay;
