"use client";

import type { HeaderProps } from "@/types/header-type";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationSignedOut } from "../../../lib/data/header-data";
import Dropdown from "../dropdown";
import LoginModal from "./login-modal";

const HeaderList: React.FC<HeaderProps> = ({ theme, textColor }) => {
	const [connectClicked, setConnectClicked] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleclick = (menu: string) => {
		setConnectClicked(menu);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const pathname = usePathname();
	const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
	const isBlackTheme = theme === "black";

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

	return (
		<div>
			<nav
				className={`header-nav-${isBlackTheme ? "black" : "white"} md:flex md:space-x-5 lg:space-x-10`}
				ref={dropdownRef}
			>
				<motion.button
					className={`relative top-[0.1em] text-xs font-semibold tracking-widest text-${textColor} ${
						pathname === "" ? "active" : ""
					} `}
					onClick={() => handleclick(" ")}
					type="button"
				>
					LOGIN
					<div className={`upperline ${pathname === "" ? "active" : ""}`} />
				</motion.button>

				{navigationSignedOut.map((item) => {
					return item.dropdown ? (
						<div key={item.href} className="relative">
							<motion.button
								className={`relative text-xs font-semibold tracking-widest text-${textColor} ${
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
								backgroundColor={isBlackTheme ? "charcoal" : "warmGrey"}
								textColor={isBlackTheme ? "warmGrey" : "charcoal"}
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
			{connectClicked && (
				<LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
			)}

			{/* {user && (
                <div className="flex space-x-5">
                    <nav
                        className={`header-nav-${isBlackTheme ? "black" : "white"} md:flex md:space-x-5 lg:space-x-10`}
                        ref={dropdownRef}
                    >
                        {navigationSignedIn.map((item) => {
                            return item.dropdown ? (
                                <div key={item.href} className="relative">
                                    <motion.button
                                        className={`relative text-xs font-semibold tracking-widest text-${textColor} ${
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
                                        backgroundColor={isBlackTheme ? "charcoal" : "warmGrey"}
                                        textColor={isBlackTheme ? "warmGrey" : "charcoal"}
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
                    <SignOut textColor={isBlackTheme ? "warmGrey3" : "charcoal"} hoverTextColor={isBlackTheme ? "charcoal" : "warmGrey"} />
                </div>
            )} */}
		</div>
	);
};

export default HeaderList;
