"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, MapPin, Target, ShoppingBag } from "lucide-react";
import { useState, useMemo } from "react";

export interface BottomNavigationProps {
	className?: string;
}

interface NavigationButton {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	route: string;
	description: string;
	color: string;
	bgColor: string;
	disabled?: boolean;
	comingSoon?: boolean;
}

const navigationButtons: NavigationButton[] = [
	{
		id: "story",
		label: "Story",
		icon: BookOpen,
		route: "/v2/touriiverse",
		description: "Continue your mythological journey",
		color: "text-charcoal",
		bgColor: "bg-warmGrey hover:bg-warmGrey2",
	},
	{
		id: "route",
		label: "Route",
		icon: MapPin,
		route: "/v2/region",
		description: "Explore model routes and destinations",
		color: "text-charcoal",
		bgColor: "bg-warmGrey hover:bg-warmGrey2",
	},
	{
		id: "quest",
		label: "Quest",
		icon: Target,
		route: "/v2/quests",
		description: "Take on exciting challenges",
		color: "text-red",
		bgColor: "bg-warmGrey hover:bg-warmGrey2",
	},
	{
		id: "shop",
		label: "Shop",
		icon: ShoppingBag,
		route: "/v2/shop",
		description: "Coming soon - Digital collectibles and exclusive items",
		color: "text-charcoal",
		bgColor: "bg-warmGrey hover:bg-warmGrey2",
		disabled: true,
		comingSoon: true,
	},
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
	className = "",
}) => {
	const router = useRouter();
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const hoveredDescription = useMemo(() => {
		return hoveredButton
			? navigationButtons.find((btn) => btn.id === hoveredButton)?.description
			: "Choose your next adventure";
	}, [hoveredButton]);

	const handleNavigation = (route: string, disabled?: boolean) => {
		if (disabled) {
			// Don't navigate if the button is disabled
			return;
		}

		try {
			router.push(route);
		} catch (error) {
			console.error("Navigation failed:", error);
			// Optional: Could add user-friendly error notification here
		}
	};

	return (
		<motion.div
			className={`bg-white shadow-sm rounded-lg p-6 ${className}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-medium text-charcoal">Quick Actions</h2>
				<div className="text-xs text-charcoal/70">{hoveredDescription}</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{navigationButtons.map((button) => {
					const IconComponent = button.icon;
					return (
						<motion.button
							key={button.id}
							type="button"
							className={`group relative flex flex-col items-center justify-center p-6 rounded-lg border-2 border-warmGrey2 transition-all duration-200 ${
								button.disabled
									? "opacity-60 cursor-not-allowed"
									: "hover:border-warmGrey3 hover:shadow-md cursor-pointer"
							} ${button.bgColor}`}
							onClick={() => handleNavigation(button.route, button.disabled)}
							onMouseEnter={() => setHoveredButton(button.id)}
							onMouseLeave={() => setHoveredButton(null)}
							whileHover={
								button.disabled
									? {}
									: {
											y: -2,
											transition: {
												type: "spring",
												stiffness: 400,
												damping: 25,
											},
										}
							}
							whileTap={
								button.disabled
									? {}
									: {
											scale: 0.98,
											transition: {
												type: "spring",
												stiffness: 400,
												damping: 25,
											},
										}
							}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: 0.1 * navigationButtons.indexOf(button),
								duration: 0.3,
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						>
							{/* Icon */}
							<motion.div
								className={`mb-3 p-3 rounded-full ${button.bgColor.replace("hover:", "")} relative`}
								whileHover={
									button.disabled
										? {}
										: {
												scale: 1.1,
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 25,
												},
											}
								}
							>
								<IconComponent
									className={`w-6 h-6 ${button.color} transition-colors duration-200`}
								/>
								{button.comingSoon && (
									<div className="absolute -top-1 -right-1 bg-red text-white text-xs px-1.5 py-0.5 rounded-full">
										Soon
									</div>
								)}
							</motion.div>

							{/* Label */}
							<h3 className="font-semibold text-charcoal text-sm mb-1 group-hover:text-charcoal/80 transition-colors duration-200">
								{button.label}
							</h3>

							{/* Hover indicator */}
							{!button.disabled && (
								<motion.div
									className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-charcoal/50 rounded-full"
									initial={{ width: 0, x: "-50%" }}
									whileHover={{
										width: "60%",
										transition: { duration: 0.2 },
									}}
								/>
							)}

							{/* Active indicator for keyboard navigation */}
							<div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-focus:ring-red group-focus:ring-offset-2 transition-all duration-200" />
						</motion.button>
					);
				})}
			</div>

			{/* Footer hint */}
			<motion.div
				className="mt-4 pt-4 border-t border-warmGrey2 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.3 }}
			>
				<p className="text-xs text-charcoal/70">
					Quickly navigate to main sections
				</p>
			</motion.div>
		</motion.div>
	);
};

export default BottomNavigation;
