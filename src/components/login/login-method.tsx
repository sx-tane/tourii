import type React from "react";
import Image from "next/image";
import type { LoginComponents } from "@/types/login-type";

const LoginComponent: React.FC<LoginComponents> = ({
	loginlabel,
	image,
	onClick,
}) => (
	<button
		type="button"
		className="grid grid-cols-3 items-center w-full h-16

		 bg-warmGrey2 rounded-full border-white border-2 hover:bg-yellow-400"
		onClick={onClick}
	>
		<Image
			src={image ?? ""}
			alt={loginlabel ?? ""}
			width={40}
			height={40}
			quality={100}
			className="relative left-5"
			priority
		/>
		<div className="justify-center font-medium text-lg text-red">
			{loginlabel}
		</div>
	</button>
);

export default LoginComponent;
