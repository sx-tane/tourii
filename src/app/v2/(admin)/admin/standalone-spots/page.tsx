"use client";

import { useState } from "react";
import StandaloneSpotsManager from "@/components/admin/standalone-spots/standalone-spots-manager";
import RouteMatchingComponent from "@/components/admin/standalone-spots/route-matching-component";
import UserRouteCreator from "@/components/admin/standalone-spots/user-route-creator";

export default function StandaloneSpotsPage() {
	const [activeTab, setActiveTab] = useState<"manage" | "matching" | "create-routes">("manage");

	return (
		<div className="min-h-screen bg-warmGrey bg-opacity-25">
			<div className="mx-auto max-w-7xl px-4 py-8">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-charcoal">Standalone Tourist Spots</h1>
					<p className="text-warmGrey3 mt-2">
						Manage tourist spots independently of routes. Create standalone spots and match them to routes as needed.
					</p>
				</div>

				{/* Tab Navigation */}
				<div className="mb-6 border-b border-warmGrey2">
					<nav className="-mb-px flex space-x-8">
						<button
							onClick={() => setActiveTab("manage")}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === "manage"
									? "border-red text-red"
									: "border-transparent text-warmGrey3 hover:text-charcoal hover:border-warmGrey2"
							}`}
						>
							Manage Spots
						</button>
						<button
							onClick={() => setActiveTab("matching")}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === "matching"
									? "border-red text-red"
									: "border-transparent text-warmGrey3 hover:text-charcoal hover:border-warmGrey2"
							}`}
						>
							Route Matching
						</button>
						<button
							onClick={() => setActiveTab("create-routes")}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === "create-routes"
									? "border-red text-red"
									: "border-transparent text-warmGrey3 hover:text-charcoal hover:border-warmGrey2"
							}`}
						>
							Create User Routes
						</button>
					</nav>
				</div>

				{/* Tab Content */}
				<div className="min-h-[600px]">
					{activeTab === "manage" && (
						<div>
							<StandaloneSpotsManager />
						</div>
					)}
					{activeTab === "matching" && (
						<div>
							<RouteMatchingComponent />
						</div>
					)}
					{activeTab === "create-routes" && (
						<div>
							<UserRouteCreator />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}