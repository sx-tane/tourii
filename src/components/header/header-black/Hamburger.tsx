"use client";

import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  hamburgerNavigationSignedIn,
  hamburgerNavigationSignedOut,
} from "../headerData";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignOut from "../SignOut";

const HamburgerBlack: React.FC = () => {
  const pathname = usePathname();

  return (
    <div>
      <SignedIn>
        <Menu as="div" className="relative flex text-left">
          <SignOut textColor={"warmGrey3"} hoverTextColor={"charcoal"} />
          <div className="flex">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
              <Bars3Icon
                className="h-8 w-8 text-warmGrey3"
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
            <Menu.Items className="absolute -right-7 z-10 mt-10 w-44 rounded-md bg-warmGrey3 px-8 py-4 shadow-lg">
              <div className=" mr-0 space-y-2 text-right">
                {hamburgerNavigationSignedIn.map((item) => (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href}
                      passHref
                      className={`relative text-xs tracking-[0.15em]  ${
                        pathname === item.href
                          ? "font-semibold text-red"
                          : "font-medium text-charcoal"
                      }`}
                    >
                      {item.label}
                      <div className="">
                        <div
                          className={`  ${pathname === item.href ? "active" : ""}`}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </SignedIn>
      <SignedOut>
        <Menu as="div" className="relative flex text-left">
          <div className="flex">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
              <Bars3Icon
                className="h-8 w-8 text-warmGrey3"
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
            <Menu.Items className="absolute -right-7 z-10 mt-10 w-44 rounded-md bg-warmGrey px-8 py-4 shadow-lg">
              <div className=" mr-0 space-y-2 text-right">
                {hamburgerNavigationSignedOut.map((item) => (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href}
                      passHref
                      className={`relative text-xs tracking-[0.15em]  ${
                        pathname === item.href
                          ? "font-semibold text-red"
                          : "font-medium text-charcoal"
                      }`}
                    >
                      {item.label}
                      <div className="">
                        <div
                          className={`  ${pathname === item.href ? "active" : ""}`}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </SignedOut>
    </div>
  );
};

export default HamburgerBlack;
