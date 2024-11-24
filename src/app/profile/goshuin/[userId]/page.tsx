"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import GoshuinGrid from "@/components/profile/goshuin/GoshuinCard/GoshuinGrid";
import GoshuinInfo from "@/components/profile/goshuin/GoshuinCard/GoshuinInfo";
import { profileList } from "@/lib/data/user/profileList";
import type { TravelGoshuin } from "@/types/interfaceProfile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

type Props = {
	params: {
		userId: string;
	};
};

const TravelGoshuinPage: NextPage<Props> = ({ params }) => {
	const [goshuin, setGoshuin] = useState<TravelGoshuin[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null); // State to hold any errors
	const [selectedGoshuin, setSelectedGoshuin] = useState<
		TravelGoshuin | undefined
	>(undefined);
	const handleGoshuinChange = (goshuinId: string) => {
		const newSelectedGoshuin = goshuin?.find((g) => g.goshuinId === goshuinId);
		setSelectedGoshuin(newSelectedGoshuin ?? undefined);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const foundUser = profileList.profile.find(
					(p) => p.userId === params.userId,
				);
				if (foundUser?.travelGoshuin) {
					setGoshuin(foundUser.travelGoshuin); // set directly to the goshuin array
					setSelectedGoshuin(foundUser.travelGoshuin[0]); // Select the first goshuin by default
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
			<GoshuinGrid
				goshuin={goshuin}
				selectedGoshuin={selectedGoshuin}
				handleGoshuinChange={handleGoshuinChange}
			/>
			<div className="flex h-full w-2/3 border-l-2 border-red">
				<GoshuinInfo goshuin={selectedGoshuin} />
			</div>
		</div>
	);
};

export default withPageAuthRequired(TravelGoshuinPage);
