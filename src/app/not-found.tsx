"use client";

import Header from "@/components/header/header-component/header";
import Image from "next/image";


const NotFound: React.FC = () => {
	return (
		<div className="max-h-screen animate-fadeIn overflow-hidden px-6">
			<Header theme={"white"} />
			<div
				className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
				style={{ height: "calc(100vh - 77px)" }}
			>
				<Image
					src={"/image/other/ninigi.png"}
					width={600}
					height={600}
					alt={"404"}
					className="h-44 w-44  md:h-60 md:w-60 xl:h-72 xl:w-72"
					priority
				/>
				<h1 className="py-5 text-4xl font-extrabold tracking-widest text-red md:text-6xl">
					NOT FOUND
				</h1>
				<h2 className="text-center text-base font-bold uppercase tracking-wider text-charcoal md:text-lg">
					Ninigi got lost in the middle of nowhere. <br />
					The street sign suggests heading back where he came from.
				</h2>
			</div>
		</div>
	);
};

export default NotFound;

export function NotFoundComponent() {
	return (
		<div className="animate-fadeIn overflow-hidden px-6 lg:h-[90vh]">
			<div
				className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
				style={{ height: "calc(100vh - 77px)" }}
			>
				<Image
					src={"/image/other/ninigi.png"}
					width={600}
					height={600}
					alt={"404"}
					className="h-44 w-44  md:h-60 md:w-60 xl:h-72 xl:w-72"
					priority
				/>
				<h1 className="py-5 text-4xl font-extrabold tracking-widest text-warmGrey md:text-6xl">
					NOT FOUND
				</h1>
				<h2 className="text-center text-base font-bold uppercase tracking-wider text-warmGrey md:text-lg">
					Ninigi got lost in the middle of nowhere. <br />
					The street sign suggests heading back where he came from.
				</h2>
			</div>
		</div>
	);
}
