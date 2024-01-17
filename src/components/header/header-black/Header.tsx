"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";

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
  {
    href: "/social",
    label: "SOCIAL MEDIA",
    dropdown: [
      { href: "https://twitter.com/TouriiJP", label: "X" },
      { href: "https://discord.com/invite/SAuAgYtCcr", label: "DISCORD" },
    ],
  },
  // { href: "/connect", label: "CONNECT" },
];

const HeaderBlack: React.FC = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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
    <div className="flex w-full items-center justify-between py-4">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/">
          <Image
            src="/image/header/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>
      <nav className="header-nav-black space-x-10 md:flex" ref={dropdownRef}>
        {navigation.map((item) =>
          item.dropdown ? (
            <div key={item.href} className="relative">
              <motion.button
                className={`relative text-sm font-semibold tracking-widest text-warmGrey3  ${
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
              />
            </div>
          ) : (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                passHref
                className={`text-sm font-semibold tracking-widest text-warmGrey3 ${
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
  );
};

export default HeaderBlack;
