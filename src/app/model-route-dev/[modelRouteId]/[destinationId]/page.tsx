"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { DescriptionStory } from "@/components/about/description";
import { routeDestinations1 } from "@/lib/data/model-route/model-route-data-1";
import { routeDestinations2 } from "@/lib/data/model-route/model-route-data-2";
import { routeDestinations3 } from "@/lib/data/model-route/model-route-data-3";
import { routeDestinations4 } from "@/lib/data/model-route/model-route-data-4";
import type { RouteDestinations } from "@/types/model-route-type";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const VisualNovelModelRoute: React.FC = () => {
	const { destinationId } = useParams(); // Access the dynamic route parameter
	const [destination, setDestination] = useState<RouteDestinations | null>(
		null,
	);
	const [modelRouteNumber, setModelRouteNumber] = useState<number>(1);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const destinationNumber = destinationId
					? Number.parseInt(
							(destinationId as string).replace("destination", ""),
						)
					: 0;

				let foundDestination: RouteDestinations | undefined;
				let routeNumber = 1; // Default to "1"

				if (destinationNumber >= 1 && destinationNumber <= 8) {
					foundDestination = routeDestinations1.find(
						(p) => p.destinationId === destinationId,
					);
					routeNumber = 1;
				} else if (destinationNumber >= 9 && destinationNumber <= 14) {
					foundDestination = routeDestinations2.find(
						(p) => p.destinationId === destinationId,
					);
					routeNumber = 2;
				} else if (destinationNumber >= 15 && destinationNumber <= 21) {
					foundDestination = routeDestinations3.find(
						(p) => p.destinationId === destinationId,
					);
					routeNumber = 3;
				} else if (destinationNumber >= 22 && destinationNumber <= 31) {
					foundDestination = routeDestinations4.find(
						(p) => p.destinationId === destinationId,
					);
					routeNumber = 4;
				}

				setDestination(
					foundDestination
						? {
								...foundDestination,
							}
						: null,
				);
				setModelRouteNumber(routeNumber); // Set the model route number here
			} catch (e) {
				setError("Failed to fetch destination data"); // Set the error state
			} finally {
				setIsLoading(false);
			}
		};

		fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
	}, [destinationId]);

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

	if (!destination) {
		return (
			<div>
				<NotFoundComponent />
			</div>
		);
	}

	return (
		<div className="absolute right-0 h-[90vh] w-[87vw] animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey text-charcoal">
			{destination.modelRouteLink ? (
				<iframe
					src={destination.modelRouteLink}
					title={destination.destinationName}
					className="absolute left-0 top-0 h-full w-full rounded-bl-xl rounded-tl-xl"
				/>
			) : (
				<div className="flex h-full w-full justify-between overflow-hidden rounded-bl-xl rounded-tl-xl">
					<div className="my-auto h-[90vh] w-1/2 overflow-y-auto p-10">
						<DescriptionStory
							smallTitle={destination.stopId}
							title={destination.destinationName}
							content={destination.destinationDescription}
						/>
						<Link
							href={`/model-route/${modelRouteNumber}`}
							className="mx-auto h-fit w-fit rounded-full border-[1.5px] border-red px-8 py-2 text-center font-medium uppercase tracking-widest text-red transition hover:bg-red hover:text-warmGrey md:flex"
						>
							CLOSE
						</Link>
					</div>

					<div className="w-1/2">
						<Image
							src={destination.destinationImage ?? ""}
							alt={destination.destinationName ?? ""}
							height={500}
							width={500}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default VisualNovelModelRoute;
