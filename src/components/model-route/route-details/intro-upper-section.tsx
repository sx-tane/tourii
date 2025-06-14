import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import Image from "next/image";
import Link from "next/link";

interface IntroUpperSectionProps {
	modelRoute: ModelRouteResponseDto;
}

const IntroUpperSection: React.FC<IntroUpperSectionProps> = ({
	modelRoute,
}) => {
	return (
		<div className="mt-20">
			<div className="mb-2 text-sm font-medium uppercase tracking-widest">
				{modelRoute.routeDetailList[0].stop}
			</div>
			{/* <Markdown className="mx-auto mb-5 flex h-16 w-16 items-center justify-center whitespace-pre-wrap rounded-full border-[1.5px] border-red text-sm font-bold leading-none text-red">
        {routeDetails.routeDetailTime}
      </Markdown> */}
			<div className="text-3xl font-bold uppercase tracking-widest">
				{modelRoute.routeDetailList[0].routeDetailName}
			</div>
			<div className="mt-2 text-base font-medium tracking-widest">
				{modelRoute.routeDetailList[0].routeDetailStoryTitle}
			</div>
			<div className="relative mt-10">
				{modelRoute.routeDetailList[0].routeDetailBigImage &&
				modelRoute.routeDetailList[0].routeDetailBigImage.trim() !== "" ? (
					<Image
						src={modelRoute.routeDetailList[0].routeDetailBigImage}
						alt={modelRoute.routeDetailList[0].routeDetailName}
						width={500}
						height={500}
						priority
						className="mx-auto h-[30vh] w-8/12 rounded-full object-cover brightness-90 xl:w-4/12"
					/>
				) : (
					<div className="mx-auto h-[30vh] w-8/12 rounded-full bg-gray-200 flex items-center justify-center xl:w-4/12">
						<span className="text-gray-400">No Image</span>
					</div>
				)}
				{modelRoute.routeDetailList[0]?.visualNovelLink && (
					<Link
						className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold tracking-widest text-warmGrey transition-all duration-300 hover:bg-red"
						href={modelRoute.routeDetailList[0].visualNovelLink}
					>
						Revisit the story
					</Link>
				)}
			</div>
		</div>
	);
};

export default IntroUpperSection;
