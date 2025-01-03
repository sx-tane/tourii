"use client";

import Image from "next/image";
import Link from "next/link";
import Beta from "../beta";
import HamburgerBlack from "./hamburger-black";
import HeaderListBlack from "./header-list-black";

const HeaderBlack: React.FC = () => {
	return (
		<div className="flex w-full items-center justify-between py-4">
			<div className="flex justify-start lg:w-0 lg:flex-1">
				<Link href="/">
					<Image
						src="/image/header/logo.svg"
						alt="Logo"
						width={50}
						height={50}
						priority={true}
						className="h-10 w-10 sm:h-12 sm:w-12"
					/>
				</Link>
				<div className="ml-3 mt-2">
					<Beta textColor={"warmGrey3"} />
				</div>
			</div>
			<div className="hidden lg:flex">
				<HeaderListBlack />
			</div>
			<div className="lg:hidden">
				<HamburgerBlack />
			</div>
		</div>
	);
};

export default HeaderBlack;
