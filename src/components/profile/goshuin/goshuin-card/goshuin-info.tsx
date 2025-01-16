import type { TravelGoshuin } from "@/types/profile-type";
import DateUtils from "@/utils/DateUtils";
import Image from "next/image";
import { useState } from "react";
import RedeemDialog from "./redeem-dialog";

interface GoshuinInfoProps {
	goshuin: TravelGoshuin | undefined;
}

const GoshuinInfo: React.FC<GoshuinInfoProps> = ({ goshuin }) => {
	const [goshuinState, setGoshuinState] = useState<TravelGoshuin | undefined>(
		undefined,
	);

	const handleRedeemSuccess = () => {
		if (goshuin) {
			const now = new Date();
			const formattedRedeemDate = DateUtils.formatDate(now); // Format the current date

			setGoshuinState({
				...goshuin,
				redeemed: true,
				goshuinRedeemDate: formattedRedeemDate,
			});
		}
	};

	return (
		<div className="relative flex w-full">
			{goshuinState?.redeemed ? (
				<Image
					src={goshuin?.goshuinImage ?? ""}
					alt="goshuin"
					width={1000}
					height={1000}
					priority
					className="absolute right-1/2 top-10 aspect-square h-1/4 w-auto rotate-12 object-cover"
				/>
			) : null}
			<div className="relative flex h-full w-8/12 flex-col p-8">
				<div className="text-xs font-bold uppercase tracking-wider text-red">
					goshuin details
				</div>

				<div className="mt-20 flex text-lg font-medium tracking-wider">
					{goshuin?.goshuinId}
					{goshuinState?.redeemed ? <div /> : null}
				</div>
				<div className="w-11/12 text-wrap text-5xl font-bold uppercase leading-tight tracking-widest">
					{goshuin?.goshuinName}
				</div>
				<div className="mt-16 w-1/2 text-lg font-semibold capitalize tracking-wider">
					{goshuin?.goshuinLocation}
				</div>
				<div className=" mt-3 columns-2 gap-10 text-wrap leading-relaxed tracking-wider">
					{goshuin?.goshuinDescription}
				</div>
				{/* This is the new container for dates and redeem button aligned at the bottom */}
				<div className="mt-auto flex w-full justify-between">
					<div className="space-y-2 text-sm italic tracking-wider">
						<div>
							<span className="font-medium">Acquired On:</span>{" "}
							{goshuin?.goshuinDate}
						</div>
						<div>
							<span className="font-medium">Expiring On:</span>{" "}
							{goshuin?.goshuinExpiryDate}
						</div>
					</div>
					<RedeemDialog
						goshuinId={goshuin?.goshuinId}
						goshuinName={goshuin?.goshuinName}
						goshuinRedeemDate={goshuinState?.goshuinRedeemDate}
						onRedeemSuccess={handleRedeemSuccess}
					/>
				</div>
			</div>
			<div className="h-full w-4/12">
				<Image
					src={goshuin?.perksImage ?? ""}
					alt="perks"
					width={1000}
					height={1000}
					priority
					className="aspect-square h-full w-full object-cover"
				/>
			</div>
		</div>
	);
};

export default GoshuinInfo;
