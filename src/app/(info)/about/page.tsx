import AboutImage from "@/components/about/about-image";
import AboutCoin from "@/components/about/about-menu/about-coin";
import BackToTop from "@/components/about/back-to-top";
import CrewGrid from "@/components/about/crew/crew-grid";
import Description from "@/components/about/description";
import Divider from "@/components/about/divider-line/divider";
import Line from "@/components/about/divider-line/line";
import TouriiEcosystem from "@/components/about/tourii-ecosystem/tourii-ecosystem";
import TouriiIdentity from "@/components/about/tourii-ecosystem/tourii-identity";
import { descriptionData } from "@/lib/data/about/description-data";
import type { Metadata, NextPage } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "About",
};

const About: NextPage = async () => {
	return (
		<div>
			<div className="fixed right-6 top-28 z-10 hidden md:flex ">
				<AboutCoin />
			</div>
			<div className="z-50 flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
				<div id="who-is-tourii" className=" ">
					<div className="hidden md:flex">
						<Description {...descriptionData[0]} />
					</div>
					<div className="md:hidden">
						<Description
							{...descriptionData[0]}
							smallTitle="what"
							title="is tourii"
						/>
					</div>
				</div>
				<div className="-mx-6 -my-10 w-full md:mx-0 md:my-0">
					<Line />
				</div>
				<div id="our-objectives">
					<Description {...descriptionData[1]} />
				</div>
				<div className="-mx-6 -mt-10">
					<AboutImage />
				</div>
				<div className="-mx-6 -mt-10 w-full md:mx-0 md:my-0">
					<Line />
				</div>
				<div id="tourii-ecosystem" className="md:my-10">
					<TouriiEcosystem />
				</div>
				<div className="-mx-6 my-10 h-full items-center bg-warmGrey3 md:mx-0">
					<TouriiIdentity />
				</div>
				<div className="-mx-6 pb-10 md:mx-0 md:mt-5">
					<Divider />
				</div>
				<h3
					id="meet-our-crew"
					className="mb-10 text-center text-xl font-bold uppercase tracking-widest text-red"
				>
					Meet our crew
				</h3>
				<CrewGrid />
			</div>
			<div className="-mx-6 mt-10 md:mx-0 md:pb-10">
				<Divider />
				<BackToTop />
			</div>
		</div>
	);
};

export default About;
