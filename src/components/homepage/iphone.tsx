import type React from "react";

interface Iphone15Props {
	children: React.ReactNode;
}

const Iphone15: React.FC<Iphone15Props> = ({ children }) => {
	return (
		<div className="relative mx-auto border-black dark:border-black bg-black border-[12px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
			{/* Dynamic Island */}
			<div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-full z-10" />

			{/* Side buttons */}
			<div className="h-[46px] w-[3px] bg-black absolute -left-[14px] top-[124px] rounded-l-lg" />
			<div className="h-[46px] w-[3px] bg-black absolute -left-[14px] top-[178px] rounded-l-lg" />
			<div className="h-[64px] w-[3px] bg-black absolute -right-[14px] top-[142px] rounded-r-lg" />

			{/* Action button (new to iPhone 15 Pro) */}
			<div className="h-[30px] w-[5px] bg-black absolute -left-[14px] top-[80px] rounded-l-lg" />

			{/* Screen */}
			<div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
				{children}
			</div>
		</div>
	);
};

export default Iphone15;
