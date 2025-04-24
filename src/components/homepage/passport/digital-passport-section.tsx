import { SectionTitle } from "@/components/common/section-title";
import type { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { PassportCard } from "./passport-card";
export const DigitalPassportSection: React.FC = () => {
	const passport = useSelector((state: RootState) => state.passport);

	return (
		<section className="w-11/12 mx-auto">
			<div className="container mx-auto px-4">
				<SectionTitle
					subtitle={["TOURII", "DIGITAL", "PASSPORT"]}
					title={["WHERE", "EVERY", "STEP", "IS", "VERIFIED"]}
				/>

				<motion.div
					className="flex flex-col items-center lg:items-end rounded-[50px] lg:bg-warmGrey2 md:p-8 relative w-full"
					initial={{ opacity: 0, y: 40, scale: 0.98 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: false, amount: 0.3 }}
					transition={{
						duration: 1,
						ease: [0.25, 0.1, 0.25, 1],
					}}
				>
					{/* Passport card - appears first on mobile */}
					<div className="mb-8 lg:mb-0 lg:mr-2 z-30 relative">
						<PassportCard
							passportType={passport.passportType}
							characters={passport.chineseCharacters}
							avatarUrl={passport.userAvatar}
						/>
					</div>

					{/* Content section */}
					<div className="items-center text-left lg:text-left lg:items-start pb-6 lg:pb-0 lg:pr-0 z-20">
						<motion.h2
							className="lg:font-extrabold text-center lg:text-charcoal lg:text-left tracking-widest lg:absolute lg:top-8 lg:left-8 text-base md:text-lg lg:text-2xl text-red font-bold uppercase mt-10 lg:mt-0 "
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							A PASSPORT THAT
							<br className="hidden lg:block" /> REMEMBERS EVERYTHING
						</motion.h2>
						<motion.p
							className="text-black leading-relaxed text-sm text-center lg:text-left tracking-widest font-normal  w-full text-pretty mt-6 lg:absolute lg:bottom-8 lg:left-8 lg:max-w-xl lg:pr-40 xl:pr-0"
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							Your blockchain-secured Digital Passport tracks your journey,
							unlocks location-based stories, and verifies your travel history.
							Complete quests, earn Tourii Points, and redeem them for exclusive
							perks—while connecting with others through shared, verified
							adventures.
						</motion.p>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
