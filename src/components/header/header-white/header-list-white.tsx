import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
	navigationSignedIn,
	navigationSignedOut,
} from "../../../lib/data/header-data";
import Dropdown from "../dropdown";
import SignOut from "../sign-out";

const HeaderList: React.FC<{ textColor: string }> = ({ textColor }) => {
	const pathname = usePathname();
	const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
	const { user } = useUser();

	const toggleDropdown = (href: string) => {
		if (dropdownOpen === href) {
			setDropdownOpen(null);
		} else {
			setDropdownOpen(href);
		}
	};

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	//TODO: remove reusable code to a separate file go with headerlist black and white, and hamburger menu white and black.
	return (
		<div>
			{!user && (
				<nav
					className="header-nav md:flex md:space-x-5 lg:space-x-10"
					ref={dropdownRef}
				>
					{navigationSignedOut.map((item, index) => {
						return item.dropdown ? (
							<div key={item.href} className="relative">
								<motion.button
									className={`relative text-xs font-semibold tracking-widest text-${textColor}  ${
										pathname === item.href ? "active" : ""
									}`}
									onClick={() => toggleDropdown(item.href)}
								>
									{item.label}
									<div
										className={`upperline ${
											pathname === item.href ? "active" : ""
										}`}
									/>
								</motion.button>
								<Dropdown
									isOpen={dropdownOpen === item.href}
									items={item.dropdown}
									backgroundColor={"charcoal"}
									textColor={"warmGrey"}
								/>
							</div>
						) : (
							<div key={item.href} className="relative">
								<Link
									href={item.href}
									passHref
									className={`relative text-xs font-semibold tracking-widest text-${textColor} ${
										pathname === item.href ? "active" : ""
									}`}
								>
									{item.label}
									<div
										className={`upperline ${
											pathname === item.href ? "active" : ""
										}`}
									/>
								</Link>
							</div>
						);
					})}
				</nav>
			)}
			{user && (
				<div className="flex space-x-5">
					<nav
						className="header-nav md:flex md:space-x-5 lg:space-x-10"
						ref={dropdownRef}
					>
						{navigationSignedIn.map((item) => {
							return item.dropdown ? (
								<div key={item.href} className="relative">
									<motion.button
										className={`relative text-xs font-semibold tracking-widest text-${textColor}  ${
											pathname === item.href ? "active" : ""
										}`}
										onClick={() => toggleDropdown(item.href)}
									>
										{item.label}
										<div
											className={`upperline ${
												pathname === item.href ? "active" : ""
											}`}
										/>
									</motion.button>
									<Dropdown
										isOpen={dropdownOpen === item.href}
										items={item.dropdown}
										backgroundColor={"charcoal"}
										textColor={"warmGrey"}
									/>
								</div>
							) : (
								<div key={item.href} className="relative">
									<Link
										href={item.href}
										passHref
										className={`relative text-xs font-semibold tracking-widest text-${textColor} ${
											pathname === item.href ? "active" : ""
										}`}
									>
										{item.label}
										<div
											className={`upperline ${
												pathname === item.href ? "active" : ""
											}`}
										/>
									</Link>
								</div>
							);
						})}
					</nav>
					<SignOut textColor={"red"} hoverTextColor={"warmGrey"} />
				</div>
			)}
		</div>
	);
};

export default HeaderList;
