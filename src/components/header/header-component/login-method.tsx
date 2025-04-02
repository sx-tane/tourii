import type React from "react";
import Image from "next/image";
import type { LoginComponents } from "@/types/header-type";

const LoginComponent: React.FC<LoginComponents> = ({ loginlabel, image }) => (
	<button
		type="button"
		className="grid grid-cols-3 items-center w-[70%] h-16 bg-warmGrey2 rounded-full border-white border-2 hover:bg-yellow-400"
	>
		<Image
			src={image ?? ""}
			alt={loginlabel ?? ""}
			width={50}
			height={50}
			quality={100}
			className="relative left-5"
			priority
		/>
		<div className="justify-center font-medium text-xl text-red">
			{loginlabel}
		</div>
	</button>
);

export default LoginComponent;
