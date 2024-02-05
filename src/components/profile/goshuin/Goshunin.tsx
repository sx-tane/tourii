import { type TravelGoshuin } from "@/types/interfaceProfile";
import React from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/ui/hoverCard";

interface GoshuinProps {
  goshuin: TravelGoshuin;
}

const Goshunin: React.FC<GoshuinProps> = ({ goshuin }) => {
  return (
    <div
      key={goshuin.goshuinId}
      className=" h-16 w-16 rounded-full px-1 transition-all duration-300 hover:scale-110"
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Image
            src={goshuin.goshuinImage}
            alt={goshuin.goshuinName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
          />
        </HoverCardTrigger>
        <HoverCardContent className="relative h-24 w-64 animate-fadeIn bg-charcoal text-warmGrey">
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
  );
};

export default Goshunin;
