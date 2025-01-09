import type { ModelRoute, ModelRouteSelection } from "@/types/model-route-type";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

const ModelRouteSelectionCard: React.FC<{
	modelRouteSelection: ModelRouteSelection;
}> = ({ modelRouteSelection }) => {
	return (
		<div>
			{modelRouteSelection.isOpen ? (
				<div className="flex h-[80vh] w-[30vw] animate-fadeIn flex-col justify-between rounded-xl bg-warmGrey text-charcoal xl:w-[22vw]">
					<div className="mt-5 p-4 text-center text-2xl font-bold tracking-widest">
						{modelRouteSelection.areaName}
					</div>
					<Image
						src={modelRouteSelection.image ?? ""}
						alt={modelRouteSelection.areaName ?? ""}
						width={200}
						height={200}
						priority={true}
						className="mx-12 h-[40vh] w-auto items-center  rounded-full  object-cover"
					/>
					<div>
						<div className="flex items-center justify-center">
							<div className="flex-grow border-t-[1.5px] border-charcoal" />
							<span className="mx-4 text-xs font-semibold tracking-wider text-charcoal">
								MODEL ROUTES
							</span>
							<div className="flex-grow border-t-[1.5px] border-charcoal" />
						</div>
						<div className="flex justify-center space-x-2 py-8">
							{modelRouteSelection.modelRoute?.map((route: ModelRoute) => (
								<Link
									href={`/model-route-dev/${route.modelRouteId}`}
									key={route.modelRouteId}
									className="cursor-pointer rounded-full border-[1.5px] border-charcoal px-4 py-2 text-base font-semibold tracking-widest transition-all hover:bg-charcoal hover:text-warmGrey 2xl:px-8 2xl:py-2"
								>
									{route.modelRouteId}
								</Link>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className="flex h-[80vh] w-[30vw] flex-col items-center justify-center rounded-xl bg-warmGrey3 text-xl font-medium italic tracking-widest text-warmGrey xl:w-[22vw]">
					Coming soon
				</div>
			)}
		</div>
	);
};

export default ModelRouteSelectionCard;
