import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/ui/hoverCard";
import { type TravelGoshuin } from "@/types/interfaceProfile";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface GoshuinGridProps {
  goshuin: TravelGoshuin[];
}

const GoshuinGrid: React.FC<GoshuinGridProps> = ({ goshuin }) => {
  const goshuinList = goshuin
    ? new Array(20).fill(undefined).map((_, index) => goshuin[index])
    : new Array(20).fill(undefined);
  return (
    <div className="h-full w-1/3  rounded-s-xl p-8">
      <div>
        <div className="flex justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-red">
            Travel Goshuin
          </div>
          <Link href={`/profile`}>
            <ArrowUturnLeftIcon className="h-6 w-6 text-warmGrey3" />
          </Link>
        </div>
        <div className="mt-24 grid grid-cols-4 gap-4 gap-y-10 overflow-y-scroll">
          {goshuinList.map((goshuin, index) =>
            goshuin ? (
              <div
                key={goshuin.goshuinId}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white"
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center justify-center">
                      <Image
                        src={goshuin.goshuinImage}
                        alt={goshuin.goshuinName}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full"
                      />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="relative h-fit w-64 animate-fadeIn bg-charcoal text-warmGrey">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold uppercase leading-relaxed tracking-widest">
                          {goshuin.goshuinName}
                        </h4>

                        <span className="mt-5 text-xs italic tracking-widest">
                          {goshuin.goshuinLocation}
                        </span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ) : (
              <div
                key={index}
                className="h-20 w-20 rounded-full bg-warmGrey2 shadow-inner"
              />
            ),
          )}
        </div>
      </div>
      <div className="mt-10 flex w-full cursor-not-allowed items-center justify-center rounded-full border-2 border-white bg-warmGrey3 py-3 text-sm font-bold tracking-wider text-charcoal">
        Coming Soon!
      </div>
    </div>
  );
};

export default GoshuinGrid;
