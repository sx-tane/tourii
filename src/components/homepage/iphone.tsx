interface Iphone15Props {
	children: React.ReactNode;
}

const Iphone15: React.FC<Iphone15Props> = ({ children }) => {
	return (
		<div className="relative mx-auto border-gray-900 dark:border-gray-900 bg-gray-900 border-[12px] rounded-[3.5rem] h-[700px] w-[340px] shadow-2xl">
			{/* Dynamic Island with Camera */}
			<div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-10 flex items-center justify-between px-3">
				<div className="w-[12px] h-[12px] bg-gray-800 rounded-full" />
			</div>

			{/* Side buttons */}
			<div className="h-[50px] w-[3px] bg-gray-900 absolute -left-[12px] top-[124px] rounded-l-lg" />
			<div className="h-[50px] w-[3px] bg-gray-900 absolute -left-[12px] top-[178px] rounded-l-lg" />
			<div className="h-[70px] w-[3px] bg-gray-900 absolute -right-[12px] top-[142px] rounded-r-lg" />

			{/* Action button (new to iPhone 15 Pro) */}
			<div className="h-[35px] w-[5px] bg-gray-900 absolute -left-[12px] top-[80px] rounded-l-lg" />

			{/* Screen */}
			<div className="rounded-[2.5rem] overflow-hidden w-full h-full bg-white">
				{children}
			</div>

			{/* Home Indicator */}
			<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-black rounded-full opacity-20" />
		</div>
	);
};

export default Iphone15;
