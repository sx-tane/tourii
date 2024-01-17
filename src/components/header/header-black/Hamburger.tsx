"use client";

import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import { hamburgerNavigation } from "../headerData";

const HamburgerBlack: React.FC = () => {
  const pathname = usePathname();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
          <Bars3Icon className="h-8 w-8 text-warmGrey" aria-hidden="true" />
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
        <Menu.Items className="header-hamburger-white item-start absolute -right-7 z-10 mt-2 w-36 rounded-md bg-warmGrey p-8 shadow-lg">
          <div className=" mr-0 space-y-5 text-right">
            {hamburgerNavigation.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  passHref
                  className={`relative text-sm font-medium tracking-[0.15em] text-charcoal ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  {item.label}
                  <div className="">
                    <div
                      className={`upperline ${
                        pathname === item.href ? "active" : ""
                      }`}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HamburgerBlack;
