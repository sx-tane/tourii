import React from "react";

const chapterSelectionMobileButton = () => {
	return (
		<div>
			<div className="relative flex items-center justify-center w-12 h-fit border-2 border-red rounded-full hover:bg-red group transition-all duration-300 cursor">
				<div className="flex flex-col items-center space-y-2 my-4">
					{/* Red dots */}
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
				</div>
			</div>
			;
		</div>
	);
};

export default chapterSelectionMobileButton;
