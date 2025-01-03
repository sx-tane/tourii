import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/lib/ui/hoverCard";
import type { TravelGoshuin } from "@/types/profile-type";
import Image from "next/image";
import type React from "react";

interface GoshuinProps {
	goshuin: TravelGoshuin;
}

const Goshuin: React.FC<GoshuinProps> = ({ goshuin }) => {
	return (
		<div
			key={goshuin.goshuinId}
			className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:h-16 hover:w-16 hover:bg-white"
		>
			<HoverCard>
				<HoverCardTrigger asChild>
					<div className="flex items-center justify-center">
						<Image
							src={goshuin.goshuinImage}
							alt={goshuin.goshuinName}
							width={64}
							height={64}
							className="h-16 w-16 rounded-full"
						/>
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="relative h-fit w-64 animate-fadeIn bg-charcoal text-warmGrey">
					<div className="flex justify-between space-x-4">
						<div className="space-y-2">
							<h4 className="text-sm font-bold uppercase leading-relaxed tracking-widest">
								{goshuin.goshuinName}
							</h4>

							<span className="mt-5 text-xs italic tracking-widest">
								{goshuin.goshuinLocation}
							</span>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};

export default Goshuin;
