"use client";

import type { HeaderProps } from "@/types/header-type";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./hamburger";
import HeaderList from "./header-list";
import { ClientOnly } from "@/components/common";

const HeaderApp: React.FC<HeaderProps> = ({ theme }) => {
	const isBlackTheme = theme === "black";
	return (
		<div className="w-full z-10">
			<div className="flex w-full items-center justify-between py-4 px-6">
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<Link href="/v2">
						<Image
							src="/image/header/logo.svg"
							alt="Logo"
							width={50}
							height={50}
							priority
							className="h-10 w-10 sm:h-12 sm:w-12"
						/>
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<div className="hidden lg:flex mr-2">
						<HeaderList
							theme={theme}
							textColor={isBlackTheme ? "warmGrey3" : "charcoal"}
						/>
					</div>
					<Link
						className="border-[1px] text-warmGrey bg-charcoal text-center text-xs tracking-[3px] rounded-full px-4 py-2 hover:bg-red hover:border-red  hover:text-warmGrey transition duration-300 ease-in-out"
						href="/v2/launch-app"
					>
						LAUNCH APP
					</Link>
					<div className="lg:hidden">
						<ClientOnly>
							<Hamburger theme={theme} />
						</ClientOnly>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderApp;
