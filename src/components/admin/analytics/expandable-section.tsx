import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableSectionProps {
	title: string;
	icon: React.ComponentType<{ size?: number }>;
	isExpanded: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

export default function ExpandableSection({
	title,
	icon: Icon,
	isExpanded,
	onToggle,
	children,
}: ExpandableSectionProps) {
	return (
		<div className="mb-8">
			<button
				type="button"
				onClick={onToggle}
				className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
			>
				<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
					<Icon size={20} />
					{title}
				</h2>
				{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
			</button>
			{isExpanded && children}
		</div>
	);
}
