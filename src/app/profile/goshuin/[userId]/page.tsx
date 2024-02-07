"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import GoshuinGrid from "@/components/profile/goshuin/GoshuinCard/GoshuinGrid";
import { profileList } from "@/lib/data/user/profileList";
import { TravelGoshuin } from "@/types/interfaceProfile";
import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: {
    userId: string;
  };
};

const TravelGoshuin: NextPage<Props> = ({ params }) => {
  const [goshuin, setGoshuin] = useState<TravelGoshuin[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State to hold any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const foundUser = profileList.profile.find(
          (p) => p.userId === params.userId,
        );
        if (foundUser?.travelGoshuin) {
          setGoshuin(foundUser.travelGoshuin); // set directly to the goshuin array
        } else {
          setGoshuin(null); // or handle this scenario appropriately
        }
      } catch (e) {
        setError("Failed to fetch goshuin data"); // Set the error state
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
  }, [params.userId]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!goshuin) {
    return (
      <div>
        <NotFoundComponent />
      </div>
    );
  }

  return (
    <div className="absolute right-0 flex h-[90vh] w-[95vw] animate-fadeIn rounded-s-xl bg-warmGrey ">
      <GoshuinGrid goshuin={goshuin} />
      <div className="flex h-full w-2/3 border-l-2 border-red">
        <div className="h-full w-8/12"></div>
        <div className="h-full w-4/12 bg-slate-600">
          <Image
            src={"/image/profile/goshuin/perks/perks1.jpg"}
            alt="perks"
            width={1000}
            height={1000}
            priority={true}
            className="aspect-square h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelGoshuin;

/* {goshuin?.map((goshuin) => (
        <div key={goshuin.goshuinId} className="text-charcoal">
          {goshuin.goshuinId}
        </div>
      ))} */
