"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Is Dropdown Open:", isOpen);
  }, [isOpen]);

  const toggleDropdown = () => {
    console.log("Dropdown button clicked");
    setIsOpen(!isOpen);
  };

  // Log the current state
  console.log("Is Dropdown Open:", isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-sm font-semibold tracking-widest text-black"
      >
        SOCIAL MEDIA
      </button>
      <div className="absolute mt-2 w-full rounded-md bg-charcoal p-2">
        {items.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <div className="block px-2 py-2 text-xs font-semibold tracking-widest text-white hover:text-white">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
