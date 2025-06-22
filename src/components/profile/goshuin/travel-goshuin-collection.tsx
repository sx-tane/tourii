import type { UserProfile } from "@/types/profile-type";
import Image from "next/image";
import Link from "next/link";

import Goshuin from "./goshuin";

interface TravelGoshuinCollectionProps {
	userProfile: UserProfile;
}

const TravelGoshuinCollection: React.FC<TravelGoshuinCollectionProps> = ({
	userProfile,
}) => {
	// Determine the number of items to display, or placeholders if no items
	const goshuinList =
		userProfile?.travelGoshuin && userProfile.travelGoshuin.length > 0
			? [...userProfile.travelGoshuin, undefined]
			: new Array(4).fill(undefined);

	return (
		<div className="relative flex h-[30%] flex-col justify-between rounded-xl bg-warmGrey p-8">
			<div className="flex items-start justify-between">
				<div className="text-xs font-bold uppercase tracking-wider text-red">
					Goshuin
				</div>
				<Link
					href={`/profile-dev/goshuin/${userProfile.userId}`}
					className="text-xs font-medium text-red underline"
				>
					View All
				</Link>
			</div>
			<div className="relative flex flex-grow items-center justify-center">
				{/* Left Arrow TODO:src\components\about\about-tourii-nft\benefit-modal\BenefitDetail.tsx */}
				<div className="absolute left-0 z-10">
					<Image
						src="/image/about/left.svg"
						alt="left"
						width={20}
						height={20}
						priority
					/>
				</div>
				{/* Goshuin Items */}
				<div className="flex items-center justify-center space-x-4">
					{goshuinList.map((goshuin, index) =>
						goshuin ? ( // Check if goshuin is not null
							<Goshuin key={goshuin.id || index} goshuin={goshuin} />
						) : (
							// This is the placeholder
							<div
								key={`travelGoshuin-${index}-${Math.random().toString(36).substr(2, 9)}`}
								className="h-12 w-12 rounded-full bg-warmGrey2 shadow-inner"
							/>
						),
					)}
				</div>
				<div className="absolute right-0 z-10">
					<Image
						src="/image/about/right.svg"
						alt="left"
						width={20}
						height={20}
						priority
					/>
				</div>
			</div>
			<div className="flex w-full cursor-not-allowed items-center justify-center rounded-full border-2 border-white bg-warmGrey3 py-3 text-sm font-bold tracking-wider text-charcoal">
				Coming Soon!
			</div>
		</div>
	);
};

export default TravelGoshuinCollection;
