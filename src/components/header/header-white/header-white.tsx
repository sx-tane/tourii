"use client";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./hamburger-white";
import HeaderList from "./header-list-white";

const Header: React.FC = () => {
	return (
		<div>
			<div className="z-10 flex w-full items-center justify-between py-4 md:mx-0">
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<Link href="/">
						<Image
							src="/image/header/logo.svg"
							alt="Logo"
							width={50}
							height={50}
							priority
							className="h-10 w-10 sm:h-12 sm:w-12"
						/>
					</Link>
					{/* <div className="ml-3 mt-2">
						<Beta textColor={"red"} />
					</div> */}
				</div>
				<div className="hidden lg:flex">
					<HeaderList textColor={"charcoal"} />
				</div>
				<div className=" lg:hidden">
					<Hamburger />
				</div>
			</div>
		</div>
	);
};

export default Header;
