import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AnalyticsSectionProps {
	title: string;
	icon: React.ReactNode;
	isExpanded: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

export function AnalyticsSection({
	title,
	icon,
	isExpanded,
	onToggle,
	children,
}: AnalyticsSectionProps) {
	return (
		<div className="mb-8">
			<button
				type="button"
				onClick={onToggle}
				className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
			>
				<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
					{icon}
					{title}
				</h2>
				{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
			</button>
			{isExpanded && <div>{children}</div>}
		</div>
	);
}