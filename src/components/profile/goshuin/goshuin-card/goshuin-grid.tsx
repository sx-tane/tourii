import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/lib/ui/hoverCard";
import type { GoshuinGridProps } from "@/types/profile-type";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

const GoshuinGrid: React.FC<GoshuinGridProps> = ({
	goshuin,
	selectedGoshuin,
	handleGoshuinChange,
}) => {
	const goshuinList = goshuin
		? new Array(24).fill(undefined).map((_, index) => goshuin[index])
		: new Array(24).fill(undefined);
	return (
		<div className="flex h-full w-1/3 flex-col overflow-hidden rounded-s-xl p-8">
			<div className="flex justify-between">
				<div className="text-xs font-bold uppercase tracking-wider text-red">
					Goshuin
				</div>
				<Link href={"/profile"}>
					<ArrowUturnLeftIcon className="h-6 w-6 text-warmGrey3" />
				</Link>
			</div>
			<div className="mt-12 flex-grow overflow-y-scroll">
				<div className="grid grid-cols-4 gap-4 gap-y-10">
					{goshuinList.map((goshuin, index) => {
						return goshuin ? (
							<div
								key={goshuin.goshuinId}
								className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white ${selectedGoshuin?.goshuinId === goshuin?.goshuinId ? " bg-white transition-all" : ""} `}
							>
								<HoverCard>
									<HoverCardTrigger asChild>
										<div className="flex items-center justify-center">
											<Image
												src={goshuin.goshuinImage}
												alt={goshuin.goshuinName}
												width={64}
												height={64}
												onClick={() => handleGoshuinChange(goshuin.goshuinId)}
												className={"h-16 w-16 rounded-full"}
												priority
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
						) : (
							<div
								key={`goshuin-${index}-${Math.random().toString(36).substr(2, 9)}`}
								className="h-20 w-20 rounded-full bg-warmGrey2 shadow-inner"
							/>
						);
					})}
				</div>
			</div>
			<div className="mt-4 flex w-full justify-center">
				<div className="w-full cursor-not-allowed rounded-full border-2 border-white bg-warmGrey3 py-3 text-center text-sm font-bold tracking-wider text-charcoal">
					Coming Soon!
				</div>
			</div>
		</div>
	);
};

export default GoshuinGrid;
