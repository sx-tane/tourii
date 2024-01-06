"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { FC, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
};

type DropdownItem = {
  href: string;
  label: string;
};

const navigation: NavItem[] = [
  { href: "/about", label: "ABOUT" },
  { href: "/world", label: "WORLD" },
  { href: "/story", label: "STORY" },
  // { href: "/model-route", label: "MODEL ROUTE" },
  { href: "https://twitter.com/TouriiJP", label: "X" },
  { href: "https://discord.com/invite/SAuAgYtCcr", label: "DISCORD" },
  // {
  //   href: "/social",
  //   label: "SOCIAL MEDIA",
  //   dropdown: [],
  // },
  { href: "/connect", label: "CONNECT" },
];

const Header: FC = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (href: string) => {
    if (dropdownOpen === href) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(href);
    }
  };

  return (
    <header className="w-full px-5">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <Image
                src="/image/header/logo.svg"
                alt="Logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <nav className="header-nav space-x-10 md:flex">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.href} className="relative">
                  <button
                    className={`relative text-sm font-semibold tracking-widest text-black ${
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
                  </button>
                  {dropdownOpen === item.href && (
                    <div className="absolute z-10 mt-2 w-full rounded-md bg-charcoal p-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          passHref
                        >
                          <div className="block px-2 py-2 text-xs font-semibold tracking-widest text-white hover:text-white">
                            {dropdownItem.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    passHref
                    className={`text-sm font-semibold tracking-widest text-black ${
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
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
