"use client";

import type { HeaderProps } from "@/types/header-type";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Fragment } from "react";
import { hamburgerNavigationSignedOut } from "../../../lib/data/header-data";
import SignOut from "../sign-out";

const Hamburger: React.FC<HeaderProps> = ({ theme }) => {
	const pathname = usePathname();
	const isBlackTheme = theme === "black";

	return (
		<div>
			<Menu as="div" className="relative flex text-left">
				<div className="flex">
					<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
						<Bars3Icon
							className={`h-8 w-8 ${isBlackTheme ? "text-warmGrey3" : "text-charcoal"}`}
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						className={`absolute -right-7 z-50 mt-10 w-44 rounded-md ${
							isBlackTheme ? "bg-warmGrey" : "bg-charcoal"
						} px-8 py-4 shadow-lg`}
					>
						<div className="mr-0 space-y-4 text-center">
							{hamburgerNavigationSignedOut.map((item) => (
								<div key={item.href} className="relative">
									<Link
										href={item.href}
										passHref
										className={`relative text-xs tracking-[0.15em] ${
											pathname === item.href
												? `font-medium ${isBlackTheme ? "text-red border-red" : "text-warmGrey"} border-t-[0.5px] pt-1`
												: `font-medium ${isBlackTheme ? "text-charcoal" : "text-warmGrey"}`
										}`}
									>
										{item.label}
										<div className="">
											<div
												className={`${pathname === item.href ? "active" : ""}`}
											/>
										</div>
									</Link>
								</div>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
			{/* Uncomment and modify the following block if user authentication is needed */}
			{/* {user && (
                <Menu as="div" className="relative flex text-left">
                    <div className="flex">
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
                            <div className="mr-5">
                                <SignOut textColor={isBlackTheme ? "red" : "warmGrey"} hoverTextColor={"warmGrey"} />
                            </div>
                            <Bars3Icon className={`h-8 w-8 ${isBlackTheme ? "text-warmGrey3" : "text-charcoal"}`} aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className={`absolute -right-7 z-10 mt-10 w-44 rounded-md ${isBlackTheme ? "bg-warmGrey" : "bg-charcoal"} px-8 py-4 shadow-lg`}>
                            <div className="mr-0 space-y-2 text-right">
                                {hamburgerNavigationSignedIn.map((item) => (
                                    <div key={item.href} className="relative">
                                        <Link
                                            href={item.href}
                                            passHref
                                            className={`relative text-xs tracking-[0.15em] ${
                                                pathname === item.href
                                                    ? "font-semibold text-warmGrey"
                                                    : "font-medium text-warmGrey3"
                                            }`}
                                        >
                                            {item.label}
                                            <div className="">
                                                <div className={`${pathname === item.href ? "active" : ""}`} />
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )} */}
		</div>
	);
};

export default Hamburger;
