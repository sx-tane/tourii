import React from "react";
import { LucideIcon } from "lucide-react";

export interface StatCard {
	label: string;
	value: string | number;
	icon?: string | LucideIcon;
	color?: string;
	className?: string;
}

interface StatsCardsProps {
	stats: StatCard[];
	className?: string;
}

export function StatsCards({ stats, className = "" }: StatsCardsProps) {
	return (
		<div className={`mb-6 grid grid-cols-2 gap-4 md:grid-cols-6 ${className}`}>
			{stats.map((stat, index) => (
				<div key={index} className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2">
						{typeof stat.icon === "string" ? (
							<span className="text-sm">{stat.icon}</span>
						) : stat.icon ? (
							<stat.icon size={16} className={stat.color || "text-blue-600"} />
						) : null}
						<span className="text-sm font-medium text-warmGrey3">
							{stat.label}
						</span>
					</div>
					<div
						className={`text-2xl font-bold ${
							stat.className || "text-charcoal"
						}`}
					>
						{stat.value}
					</div>
				</div>
			))}
		</div>
	);
}