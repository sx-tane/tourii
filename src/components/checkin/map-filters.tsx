"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface MapFiltersProps {
	activeFilter: "all" | "story" | "quest";
	onFilterChange: (filter: "all" | "story" | "quest") => void;
	className?: string;
}

const filterOptions = [
	{ value: "all", label: "All", icon: "📍" },
	{ value: "story", label: "Story", icon: "📚" },
	{ value: "quest", label: "Quest", icon: "🎯" },
] as const;

const MapFilters: React.FC<MapFiltersProps> = ({
	activeFilter,
	onFilterChange,
	className = "",
}) => {
	return (
		<motion.div
			className={`w-full ${className}`}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
			<Tabs
				value={activeFilter}
				onValueChange={(value) =>
					onFilterChange(value as "all" | "story" | "quest")
				}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 shadow-sm">
					{filterOptions.map((option, index) => (
						<TabsTrigger
							key={option.value}
							value={option.value}
							className="relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
						>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: index * 0.1, duration: 0.2 }}
								className="flex items-center gap-2"
							>
								<span className="text-base">{option.icon}</span>
								<span>{option.label}</span>
							</motion.div>

							{activeFilter === option.value && (
								<motion.div
									layoutId="activeFilterIndicator"
									className="absolute inset-0 rounded-md bg-indigo-100 -z-10"
									initial={false}
									transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</motion.div>
	);
};

export default MapFilters;
