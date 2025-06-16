"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	SearchIcon,
	FilterIcon,
	AlertCircleIcon,
} from "lucide-react";
import { getMoments } from "@/hooks/moments/getMoments";
import type { Moment, MomentsResponse, MomentsFilters } from "../types";

// Mock data for development - will be replaced with real API calls
const mockMomentsData: MomentsResponse = {
	moments: [
		{
			id: "1",
			title: "Temple Visit Memory",
			description:
				"Beautiful golden hour at Kiyomizu Temple. The cherry blossoms were in full bloom and the view of Kyoto from the wooden stage was breathtaking.",
			imageUrl: "/image/model-route/1/kashima-shrine/1.jpg",
			rewardText: "Earned 50 Tourii Points + Temple Explorer Badge",
			questName: "Temple Discovery Quest",
			location: "Kyoto",
			createdAt: "2024-06-15T10:30:00Z",
			userId: "user1",
			userName: "Sakura Explorer",
			userAvatar: "/image/profile/nft/100.png",
		},
		{
			id: "2",
			title: "Shrine Ceremony Experience",
			description:
				"Witnessed a traditional wedding ceremony at Meiji Shrine. The peaceful atmosphere and traditional music created an unforgettable moment.",
			imageUrl: "/image/model-route/1/anamori-shrine/1.jpg",
			rewardText: "Earned 75 Tourii Points + Cultural Observer Badge",
			questName: "Cultural Immersion Quest",
			location: "Tokyo",
			createdAt: "2024-06-14T15:45:00Z",
			userId: "user2",
			userName: "Tradition Seeker",
			userAvatar: "/image/profile/nft/171.png",
		},
		{
			id: "3",
			title: "Waterfall Meditation",
			description:
				"Found inner peace at Harajiri Falls. The sound of cascading water and the misty atmosphere provided the perfect setting for reflection.",
			imageUrl: "/image/model-route/1/harajiri-fall/1.jpg",
			rewardText: "Earned 60 Tourii Points + Nature Guardian Badge",
			questName: "Natural Wonders Quest",
			location: "Oita",
			createdAt: "2024-06-13T08:20:00Z",
			userId: "user3",
			userName: "Mountain Walker",
			userAvatar: "/image/profile/nft/19.png",
		},
		{
			id: "4",
			title: "Ancient Cave Discovery",
			description:
				"Explored the mysterious Inazumi Cave with its stunning limestone formations. Each chamber revealed new geological wonders.",
			imageUrl: "/image/model-route/3/inazumi-cave/1.jpg",
			rewardText: "Earned 80 Tourii Points + Cave Explorer Badge",
			questName: "Underground Adventure Quest",
			location: "Oita",
			createdAt: "2024-06-12T14:15:00Z",
			userId: "user4",
			userName: "Adventure Seeker",
		},
		{
			id: "5",
			title: "Seasonal Garden Beauty",
			description:
				"Captured the essence of Japanese garden design at its finest. The carefully arranged rocks, plants, and water features create perfect harmony.",
			imageUrl: "/image/model-route/2/eboshi-park/1.jpg",
			rewardText: "Earned 55 Tourii Points + Garden Enthusiast Badge",
			questName: "Zen Garden Quest",
			location: "Miyazaki",
			createdAt: "2024-06-11T11:30:00Z",
			userId: "user1",
			userName: "Sakura Explorer",
			userAvatar: "/image/profile/nft/100.png",
		},
		{
			id: "6",
			title: "Mountain Shrine Pilgrimage",
			description:
				"Completed the challenging hike to Mount Atago shrine. The panoramic views from the summit made every step worthwhile.",
			imageUrl: "/image/model-route/4/mount-atago/1.jpg",
			rewardText: "Earned 100 Tourii Points + Mountain Pilgrim Badge",
			questName: "Sacred Peak Quest",
			location: "Kyoto",
			createdAt: "2024-06-10T07:45:00Z",
			userId: "user5",
			userName: "Peak Conqueror",
		},
		{
			id: "7",
			title: "Cultural Heritage Site",
			description:
				"Discovered the historical significance of Osako Magaibutsu. These ancient stone carvings tell stories from centuries past.",
			imageUrl: "/image/model-route/3/osako-magaibutsu/1.jpg",
			rewardText: "Earned 90 Tourii Points + History Scholar Badge",
			questName: "Ancient Artifacts Quest",
			location: "Oita",
			createdAt: "2024-06-09T16:20:00Z",
			userId: "user6",
			userName: "History Buff",
		},
		{
			id: "8",
			title: "Temple Architecture Marvel",
			description:
				"Amazed by the intricate woodwork and architectural details of this historic temple. Every beam and joint shows masterful craftsmanship.",
			imageUrl: "/image/model-route/2/fukoji-temple/1.jpg",
			rewardText: "Earned 70 Tourii Points + Architecture Lover Badge",
			questName: "Architectural Wonders Quest",
			location: "Miyazaki",
			createdAt: "2024-06-08T13:10:00Z",
			userId: "user2",
			userName: "Tradition Seeker",
			userAvatar: "/image/profile/nft/171.png",
		},
		{
			id: "9",
			title: "Peaceful Shrine Grounds",
			description:
				"Found tranquility in the serene atmosphere of Shibayama Hachiman Shrine. The ancient trees and stone lanterns create a timeless ambiance.",
			imageUrl: "/image/model-route/3/shibayama-hachiman-shrine/1.jpg",
			rewardText: "Earned 65 Tourii Points + Serenity Seeker Badge",
			questName: "Peaceful Places Quest",
			location: "Oita",
			createdAt: "2024-06-07T09:30:00Z",
			userId: "user3",
			userName: "Mountain Walker",
			userAvatar: "/image/profile/nft/19.png",
		},
		{
			id: "10",
			title: "Coastal Shrine Experience",
			description:
				"Visited this beautiful seaside shrine where ocean meets spirituality. The sound of waves enhances the meditative atmosphere.",
			imageUrl: "/image/model-route/4/omi-shrine/1.jpeg",
			rewardText: "Earned 85 Tourii Points + Coastal Explorer Badge",
			questName: "Ocean Spirits Quest",
			location: "Miyazaki",
			createdAt: "2024-06-06T17:00:00Z",
			userId: "user4",
			userName: "Adventure Seeker",
		},
	],
	pagination: {
		currentPage: 1,
		totalPages: 3,
		totalItems: 28,
		itemsPerPage: 10,
		hasNext: true,
		hasPrevious: false,
	},
};

// Mock data will be used when the API endpoint is not available
// The getMoments hook will automatically fall back to mock data in development

const MomentsPage = () => {
	const [filters, setFilters] = useState<MomentsFilters>({
		page: 1,
		limit: 10,
		search: "",
		location: "",
	});

	// Use the hook to fetch moments - in production this will call the real API
	// In development, it will fall back to the mock data when the API is not available
	const {
		moments: momentsData,
		isLoadingMoments,
		isErrorMoments,
		mutateMoments,
	} = getMoments(filters);

	// Fallback to mock data when API is not available (development mode)
	const displayData = momentsData || mockMomentsData;
	const loading = isLoadingMoments;
	const error = isErrorMoments;

	const handlePageChange = (newPage: number) => {
		setFilters({ ...filters, page: newPage });
	};

	const handleSearch = (searchQuery: string) => {
		setFilters({ ...filters, search: searchQuery, page: 1 });
	};

	const handleLocationFilter = (location: string) => {
		setFilters({ ...filters, location: location || undefined, page: 1 });
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const uniqueLocations = Array.from(
		new Set(displayData.moments.map((m) => m.location).filter(Boolean)),
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-white shadow-sm rounded-lg p-6">
				<h1 className="text-3xl font-bold text-gray-900">All Moments</h1>
				<p className="mt-2 text-gray-600">
					Discover and explore traveler moments from across Japan
				</p>
			</div>

			{/* Filters */}
			<div className="bg-white shadow-sm rounded-lg p-6">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Search */}
					<div className="flex-1">
						<div className="relative">
							<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								type="text"
								placeholder="Search moments..."
								className="pl-10"
								defaultValue={filters.search}
								onChange={(e) => {
									const value = e.target.value;
									// Debounce search
									setTimeout(() => handleSearch(value), 300);
								}}
							/>
						</div>
					</div>

					{/* Location Filter */}
					<div className="min-w-[200px]">
						<select
							value={filters.location || ""}
							onChange={(e) => handleLocationFilter(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						>
							<option value="">All Locations</option>
							{uniqueLocations.map((location) => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
					</div>

					<Button variant="outline" size="sm">
						<FilterIcon className="h-4 w-4 mr-2" />
						More Filters
					</Button>
				</div>
			</div>

			{/* Error State */}
			{error && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-6">
					<div className="flex items-center">
						<AlertCircleIcon className="h-5 w-5 text-red-400 mr-3" />
						<div>
							<h3 className="text-sm font-medium text-red-800">
								Failed to load moments
							</h3>
							<p className="text-sm text-red-700 mt-1">
								Unable to fetch moments. Using demo data instead.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Loading State */}
			{loading && (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
				</div>
			)}

			{/* Moments Grid */}
			{!loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{displayData.moments.map((moment) => (
						<Card
							key={moment.id}
							className="bg-white shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="aspect-w-16 aspect-h-9">
								<img
									src={moment.imageUrl}
									alt={moment.title}
									className="w-full h-48 object-cover rounded-t-lg"
								/>
							</div>
							<CardHeader className="pb-3">
								<div className="flex items-center gap-3 mb-2">
									{moment.userAvatar && (
										<img
											src={moment.userAvatar}
											alt={moment.userName}
											className="w-8 h-8 rounded-full"
										/>
									)}
									<div>
										<p className="text-sm font-medium text-gray-900">
											{moment.userName}
										</p>
										<p className="text-xs text-gray-500">
											{formatDate(moment.createdAt)}
										</p>
									</div>
								</div>
								<CardTitle className="text-lg">{moment.title}</CardTitle>
								{moment.location && (
									<p className="text-sm text-indigo-600 font-medium">
										📍 {moment.location}
									</p>
								)}
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-gray-600 text-sm mb-3 line-clamp-3">
									{moment.description}
								</p>

								{moment.questName && (
									<div className="mb-3">
										<p className="text-xs text-gray-500">From quest:</p>
										<p className="text-sm font-medium text-gray-700">
											{moment.questName}
										</p>
									</div>
								)}

								<div className="bg-green-50 border border-green-200 rounded-lg p-3">
									<p className="text-sm text-green-800 font-medium">
										🎁 {moment.rewardText}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Empty State */}
			{!loading && displayData.moments.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No moments found</p>
					<p className="text-gray-400 text-sm mt-1">
						Try adjusting your search or filters
					</p>
				</div>
			)}

			{/* Pagination */}
			{!loading && displayData.moments.length > 0 && (
				<div className="bg-white shadow-sm rounded-lg p-6">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-700">
							Showing page {displayData.pagination.currentPage} of{" "}
							{displayData.pagination.totalPages} (
							{displayData.pagination.totalItems} total moments)
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									handlePageChange(displayData.pagination.currentPage - 1)
								}
								disabled={!displayData.pagination.hasPrevious}
							>
								<ChevronLeftIcon className="h-4 w-4 mr-1" />
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									handlePageChange(displayData.pagination.currentPage + 1)
								}
								disabled={!displayData.pagination.hasNext}
							>
								Next
								<ChevronRightIcon className="h-4 w-4 ml-1" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MomentsPage;
