import Image from "next/image";
import type React from "react";

const Divider: React.FC = () => {
	return (
		<div>
			{
				<div className="z-60 absolute left-0 w-full items-center justify-center">
					<Image
						src="/image/about/double-line.svg"
						alt="divider"
						width={10000}
						height={3000}
						className="h-3 object-cover"
						priority
					/>
				</div>
			}
		</div>
	);
};

export default Divider;
