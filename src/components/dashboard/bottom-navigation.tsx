"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, MapPin, Target, ShoppingBag } from "lucide-react";
import { useState } from "react";

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
}

const navigationButtons: NavigationButton[] = [
	{
		id: "story",
		label: "Story",
		icon: BookOpen,
		route: "/v2/touriiverse",
		description: "Continue your mythological journey",
		color: "text-purple-600",
		bgColor: "bg-purple-50 hover:bg-purple-100",
	},
	{
		id: "route",
		label: "Route",
		icon: MapPin,
		route: "/v2/region",
		description: "Explore model routes and destinations",
		color: "text-green-600",
		bgColor: "bg-green-50 hover:bg-green-100",
	},
	{
		id: "quest",
		label: "Quest",
		icon: Target,
		route: "/v2/quests",
		description: "Take on exciting challenges",
		color: "text-blue-600",
		bgColor: "bg-blue-50 hover:bg-blue-100",
	},
	{
		id: "shop",
		label: "Shop",
		icon: ShoppingBag,
		route: "/v2/shop",
		description: "Browse digital collectibles",
		color: "text-indigo-600",
		bgColor: "bg-indigo-50 hover:bg-indigo-100",
	},
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
	className = "",
}) => {
	const router = useRouter();
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const handleNavigation = (route: string) => {
		router.push(route);
	};

	return (
		<motion.div
			className={`bg-white shadow-sm rounded-lg p-6 ${className}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
				<div className="text-xs text-gray-500">
					{hoveredButton
						? navigationButtons.find((btn) => btn.id === hoveredButton)
								?.description
						: "Choose your next adventure"}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{navigationButtons.map((button) => {
					const IconComponent = button.icon;
					return (
						<motion.button
							key={button.id}
							type="button"
							className={`group relative flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-100 transition-all duration-200 hover:border-gray-200 hover:shadow-md ${button.bgColor}`}
							onClick={() => handleNavigation(button.route)}
							onMouseEnter={() => setHoveredButton(button.id)}
							onMouseLeave={() => setHoveredButton(null)}
							whileHover={{ 
								y: -2,
								transition: { type: "spring", stiffness: 400, damping: 25 }
							}}
							whileTap={{ 
								scale: 0.98,
								transition: { type: "spring", stiffness: 400, damping: 25 }
							}}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ 
								delay: 0.1 * navigationButtons.indexOf(button),
								duration: 0.3,
								type: "spring",
								stiffness: 300,
								damping: 20
							}}
						>
							{/* Icon */}
							<motion.div
								className={`mb-3 p-3 rounded-full ${button.bgColor.replace('hover:', '')}`}
								whileHover={{ 
									scale: 1.1,
									transition: { type: "spring", stiffness: 400, damping: 25 }
								}}
							>
								<IconComponent 
									className={`w-6 h-6 ${button.color} transition-colors duration-200`} 
								/>
							</motion.div>

							{/* Label */}
							<h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-700 transition-colors duration-200">
								{button.label}
							</h3>

							{/* Hover indicator */}
							<motion.div
								className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gray-400 rounded-full"
								initial={{ width: 0, x: "-50%" }}
								whileHover={{ 
									width: "60%",
									transition: { duration: 0.2 }
								}}
							/>

							{/* Active indicator for keyboard navigation */}
							<div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-focus:ring-indigo-500 group-focus:ring-offset-2 transition-all duration-200" />
						</motion.button>
					);
				})}
			</div>

			{/* Footer hint */}
			<motion.div
				className="mt-4 pt-4 border-t border-gray-100 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.3 }}
			>
				<p className="text-xs text-gray-500">
					Quickly navigate to main sections
				</p>
			</motion.div>
		</motion.div>
	);
};

export default BottomNavigation;