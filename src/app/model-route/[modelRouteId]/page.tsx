"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import ModelRouteIntro from "@/components/model-route/route-component/ModelRouteIntro";
import RouteDestination from "@/components/model-route/route-component/RouteDestination";
import IntroUpperSection from "@/components/model-route/route-component/route-details/IntroUpperSection";
import BottomSection from "@/components/model-route/route-component/route-details/bottom-section/BottomSection";
import { modelRouteData } from "@/lib/data/model-route/modelRouteSelectionData";
import type { ModelRoute } from "@/types/interfaceModelRoute";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams

const Route: NextPage = () => {
	const params = useParams(); // Retrieve params asynchronously
	const [modelRoute, setModelRoute] = useState<ModelRoute | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const foundModelRoute = modelRouteData.find(
					(p) => p.modelRouteId === params.modelRouteId,
				);
				if (foundModelRoute) {
					setModelRoute(foundModelRoute);
				} else {
					setModelRoute(null);
				}
			} catch (e) {
				setError("Failed to fetch model route data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [params.modelRouteId]);

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

	if (!modelRoute) {
		return (
			<div>
				<NotFoundComponent />
			</div>
		);
	}

	return (
		<div className="absolute -right-0 mt-10 w-[95vw] animate-fadeIn space-y-2 py-10">
			<ModelRouteIntro
				modelRouteId={modelRoute.modelRouteId}
				placeName={modelRoute.placeName}
				modelRouteName={modelRoute.modelRouteName}
				recommendation={modelRoute.recommendation}
			/>
			<RouteDestination routeDestination={modelRoute.routeDestinations ?? []} />
			<div className="h-fit w-[95vw] rounded-bl-xl rounded-tl-xl bg-warmGrey py-8 text-center">
				<span className="mx-4 text-sm font-bold capitalize tracking-wider text-charcoal">
					route details
				</span>
				{modelRoute.routeDetails?.map((routeDetail, index, array) => (
					<div key={routeDetail.routeDetailId}>
						<IntroUpperSection
							key={routeDetail.routeDetailId}
							routeDetails={routeDetail}
						/>
						<BottomSection
							key={routeDetail.routeDetailId}
							routeDetails={routeDetail}
						/>
						{index < array.length - 1 && (
							<div className="mx-auto w-8/12 border-t-4 border-red" />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default withPageAuthRequired(Route);
