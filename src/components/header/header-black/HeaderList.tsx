"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Dropdown from "../Dropdown";
import { navigation } from "../headerData";

const HeaderListBlack: React.FC = () => {
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
  );
};

export default HeaderListBlack;
