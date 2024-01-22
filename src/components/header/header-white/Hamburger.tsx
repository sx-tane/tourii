"use client";

import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import {
  hamburgerNavigationSignedIn,
  hamburgerNavigationSignedOut,
} from "../headerData";
import { usePathname } from "next/navigation";
import SignOut from "../SignOut";
import { useUser } from "@auth0/nextjs-auth0/client";

const Hamburger: React.FC = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div>
      {!user && (
        <Menu as="div" className="relative flex text-left">
          <div className="flex">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
              <Bars3Icon className="h-8 w-8 text-charcoal" aria-hidden="true" />
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
            <Menu.Items className="absolute -right-7 z-10 mt-10 w-44 rounded-md bg-charcoal px-8 py-4 shadow-lg">
              <div className=" mr-0 space-y-2 text-right">
                {hamburgerNavigationSignedOut.map((item) => (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href}
                      passHref
                      className={`relative text-xs tracking-[0.15em]  ${
                        pathname === item.href
                          ? "font-semibold text-warmGrey"
                          : "font-medium text-warmGrey3"
                      }`}
                    >
                      {item.label}
                      <div className="">
                        <div
                          className={`  ${
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
      )}
      {user && (
        <Menu as="div" className="relative flex text-left">
          <div className="flex">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md">
              <div className="mr-5">
                <SignOut textColor={"red"} hoverTextColor={"warmGrey"} />
              </div>
              <Bars3Icon className="h-8 w-8 text-charcoal" aria-hidden="true" />
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
            <Menu.Items className="absolute -right-7 z-10 mt-10 w-44 rounded-md bg-charcoal px-8 py-4 shadow-lg">
              <div className=" mr-0 space-y-2 text-right">
                {hamburgerNavigationSignedIn.map((item) => (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href}
                      passHref
                      className={`relative text-xs tracking-[0.15em]  ${
                        pathname === item.href
                          ? "font-semibold text-warmGrey"
                          : "font-medium text-warmGrey3"
                      }`}
                    >
                      {item.label}
                      <div className="">
                        <div
                          className={`  ${
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
      )}
    </div>
  );
};

export default Hamburger;
