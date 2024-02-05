import { type UserProfile } from "@/types/interfaceProfile";
import Link from "next/link";
import React from "react";
import Goshunin from "./Goshunin";

interface TravelGoshuinCollectionProps {
  userProfile: UserProfile;
}

const TravelGoshuinCollection: React.FC<TravelGoshuinCollectionProps> = ({
  userProfile,
}) => {
  // Determine the number of items to display, or placeholders if no items
  const goshuinList =
    userProfile?.travelGoshuin && userProfile.travelGoshuin.length > 0
      ? [...userProfile.travelGoshuin, undefined]
      : new Array(4).fill(undefined);

  return (
    <div className="relative flex h-[30%] flex-col justify-between rounded-xl bg-warmGrey p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-bold uppercase tracking-wider text-red">
          Travel Goshuin
        </div>
        <Link
          href={`/profile/goshuin`}
          className="text-xs font-medium text-red underline"
        >
          View All
        </Link>
      </div>
      <div className="relative flex flex-grow items-center justify-center">
        {/* Left Arrow */}
        <div className="absolute left-0 z-10">
          <button
            type="button"
            className=" p-2 text-charcoal focus:outline-none"
            aria-label="Previous"
          >
            &#9664;
          </button>
        </div>

        {/* Goshuin Items */}
        <div className="flex items-center justify-center space-x-4">
          {goshuinList.map((goshuin, index) =>
            goshuin ? ( // Check if goshuin is not null
              <Goshunin goshuin={goshuin} />
            ) : (
              // This is the placeholder
              <div
                key={index}
                className="h-16 w-16  rounded-full bg-warmGrey3 shadow-inner"
              />
            ),
          )}
        </div>
        {/* Right Arrow */}
        <div className="absolute right-0 z-10">
          <button
            type="button"
            className=" p-2 text-black focus:outline-none"
            aria-label="Next"
          >
            {/* Replace with an actual arrow icon */}
            &#9654;
          </button>
        </div>
      </div>
      <div className="flex w-full cursor-not-allowed items-center justify-center rounded-full border-2 border-white bg-warmGrey3 py-3 text-sm font-bold tracking-wider text-charcoal">
        Get More Goshuin!
      </div>
    </div>
  );
};

export default TravelGoshuinCollection;
