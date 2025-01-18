"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import type { DescriptionProps } from "@/types/about-type";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import ReactMarkdown from "react-markdown";
import Line from "./divider-line/line";
import { useInView } from "react-intersection-observer";

const Description: React.FC<DescriptionProps> = ({
	smallTitle,
	title,
	content,
}) => {
	return (
		<div className="my-10 items-center text-center text-red">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="font-bold uppercase">
						<h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-wide">
							{smallTitle}
						</h3>
						<h2 className="whitespace-break-spaces break-all text-3xl tracking-wide md:text-6xl md:tracking-widest">
							{title}
						</h2>
					</div>
					<div className="mt-8 whitespace-pre-line px-2 text-sm font-medium md:text-base">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Description;

export const DescriptionWithImages: React.FC<DescriptionProps> = ({
	smallTitle,
	title,
	content,
	images = [],
}) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.5,
	});

	return (
		<div ref={ref} className="my-10 items-center text-center text-red">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="font-bold uppercase">
						<h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-wide">
							{smallTitle}
						</h3>
						<h2 className="whitespace-break-spaces break-all text-3xl tracking-wide md:text-6xl md:tracking-widest">
							{title}
						</h2>
					</div>
					<div className="mt-8 grid gap-3 md:gap-10 grid-cols-3">
						{images.map(
							(image, index) =>
								inView && (
									<div key={image}>
										<motion.div
											key={image}
											initial="hidden"
											animate="visible"
											variants={{
												hidden: { opacity: 0, y: 20 },
												visible: { opacity: 1, y: 0 },
											}}
											transition={{
												duration: 0.5,
												delay: index * 0.2,
												ease: [0, 0.71, 0.2, 1.01],
											}}
										>
											<Image
												src={image}
												alt={title ?? ""}
												className="w-full rounded-full"
												unoptimized={true}
												width={200}
												height={200}
												priority
											/>
										</motion.div>
									</div>
								),
						)}
					</div>
					<div className="mt-8 whitespace-pre-line px-2 text-sm font-medium md:text-base">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export const DescriptionWithImage: React.FC<DescriptionProps> = ({
	smallTitle,
	title,
	content,
	images = [],
}) => {
	return (
		<div className="items-center text-center text-red">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="font-bold uppercase">
						<h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-wide">
							{smallTitle}
						</h3>
						<h2 className="whitespace-break-spaces break-all text-3xl tracking-wide md:text-6xl md:tracking-widest">
							{title}
						</h2>
					</div>
					<div className="mt-8 hidden md:flex">
						<Image
							src={images[0] ?? ""}
							alt={title ?? ""}
							className="w-full"
							width={800}
							height={600}
							priority
						/>
					</div>
					<div className="mt-8 md:hidden">
						<Image
							src={images[1] ?? ""}
							alt={title ?? ""}
							className="w-full"
							width={800}
							height={600}
							priority
						/>
					</div>
					<div className="mt-8 whitespace-pre-line px-2 text-sm font-medium md:text-base">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export const DescriptionStory: React.FC<DescriptionProps> = ({
	smallTitle,
	title,
	content,
}) => {
	return (
		<div className="my-10 items-center text-center text-red">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="font-bold uppercase">
						<h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-widest">
							{smallTitle}
						</h3>
						<h2 className="mt-5 text-lg tracking-wide md:text-2xl md:tracking-widest">
							{title}
						</h2>
						<div className="-my-2">
							<Line />
						</div>
					</div>
					<div className="mt-8 whitespace-pre-line px-2 text-xs font-medium md:text-base">
						<ReactMarkdown className="leading-loose">{content}</ReactMarkdown>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export const DescriptionCharacter: React.FC<DescriptionProps> = ({
	smallTitle,
	title,
	content,
}) => {
	return (
		<div className="my-10 items-center text-center text-red">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="uppercase">
						<h2 className="whitespace-break-spaces font-bold break-all text-3xl tracking-wide md:text-5xl md:tracking-widest my-3">
							{title}
						</h2>
						<h3 className="leading-normal font-semibold text-base tracking-widest">
							{smallTitle}
						</h3>
					</div>
					<div className="mt-8 whitespace-pre-line px-2 text-xs font-medium md:text-base">
						<ReactMarkdown className="leading-loose">{content}</ReactMarkdown>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
