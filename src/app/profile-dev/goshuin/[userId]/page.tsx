"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import GoshuinGrid from "@/components/profile/goshuin/goshuin-card/goshuin-grid";
import GoshuinInfo from "@/components/profile/goshuin/goshuin-card/goshuin-info";
import { profileList } from "@/lib/data/user/profile-list";
import type { TravelGoshuin } from "@/types/profile-type";
import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TravelGoshuinPage: NextPage = () => {
	const { userId } = useParams();
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
				const foundUser = profileList.profile.find((p) => p.userId === userId);
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
	}, [userId]);

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

export default TravelGoshuinPage;
