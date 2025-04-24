"use client";
import { useRouter } from "next/navigation";

const RegionRoutesPage = () => {
	const router = useRouter();
	const routes = [
		{
			id: "kyoto-temples",
			name: "Kyoto Temple Tour",
			description: "Visit the most iconic temples in Kyoto",
			duration: "6 hours",
			distance: "5.2 km",
			spots: 8,
			difficulty: "Medium",
		},
		{
			id: "gion-night",
			name: "Gion Night Walk",
			description: "Experience the magic of Gion after dark",
			duration: "3 hours",
			distance: "2.8 km",
			spots: 5,
			difficulty: "Easy",
		},
		{
			id: "arashiyama",
			name: "Arashiyama Explorer",
			description: "Bamboo forests and traditional gardens",
			duration: "5 hours",
			distance: "4.5 km",
			spots: 6,
			difficulty: "Easy",
		},
	];

	return (
		<div className="space-y-6">
			{/* Region Overview */}
			<div className="bg-white shadow-sm rounded-lg p-6">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Kansai Region</h2>
						<p className="mt-1 text-gray-500">12 curated routes available</p>
					</div>
					<div className="text-right">
						<div className="text-sm text-gray-500">Current Weather</div>
						<div className="text-lg font-medium">22°C, Partly Cloudy</div>
					</div>
				</div>
			</div>

			{/* Map Overview */}
			<div className="bg-white shadow-sm rounded-lg p-4">
				<div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
					<div className="flex items-center justify-center">
						<span className="text-gray-400">Region Map Coming Soon</span>
					</div>
				</div>
			</div>

			{/* Routes List */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{routes.map((route) => (
					<div
						key={route.id}
						className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-xl font-semibold text-gray-900">
									{route.name}
								</h3>
								<span
									className={`px-2 py-1 text-xs font-medium rounded ${
										route.difficulty === "Easy"
											? "bg-green-100 text-green-800"
											: route.difficulty === "Medium"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
									}`}
								>
									{route.difficulty}
								</span>
							</div>
							<p className="text-gray-600 mb-4">{route.description}</p>
							<div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
								<div>
									<span className="block font-medium">Duration</span>
									{route.duration}
								</div>
								<div>
									<span className="block font-medium">Distance</span>
									{route.distance}
								</div>
								<div>
									<span className="block font-medium">Spots</span>
									{route.spots} locations
								</div>
							</div>
							<div className="mt-4 pt-4 border-t">
								<button
									type="button"
									onClick={() => router.push(`/v2/routes/kyoto/${route.id}`)}
									className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
								>
									View Route Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RegionRoutesPage;
