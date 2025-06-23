import Section from "@/components/world/place/section";
import DescriptionWorld from "@/components/world/text/description";
import Title from "@/components/world/text/title";
import Prologue from "@/components/world/video/prologue";
import DividerWhite from "@/components/world/white-divider";
import WhiteLine from "@/components/world/white-line";
import { titleData, worldData } from "@/lib/data/world/world-data";
import type { NextPage } from "next";

const World: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
			<Title
				smallTitle={titleData[0]?.smallTitle}
				title={titleData[0]?.title}
			/>
			<Section />
			<div className="my-4">
				<DescriptionWorld data={worldData[0]?.description ?? ""} />
			</div>
			{/* <div className="-mx-6 md:mx-0 -my-10">
				<WhiteLine />
			</div> */}
			{/* <Title
				smallTitle={titleData[1]?.smallTitle}
				title={titleData[1]?.title}
			/>
			<div className="-mt-10 md:-mt-20">
				<DescriptionWorld data={worldData[1]?.description ?? ""} />
			</div>
			<div className="mx-20 lg:mx-0 my-10">
				<Prologue />
			</div> */}
			<DividerWhite />
		</div>
	);
};

export default World;
