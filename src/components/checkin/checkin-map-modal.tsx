"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCheckins } from "@/hooks/api/useCheckins";
import InteractiveMap from "./interactive-map";
import MapFilters from "./map-filters";
import LocationDetailsModal from "./location-details-modal";
import type { CheckinResponseDto } from "@/hooks/api/useCheckins";

export interface CheckinMapModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId?: string;
	onNavigateToStory?: (storyId: string) => void;
	onNavigateToQuest?: (questId: string) => void;
	checkins?: CheckinResponseDto[];
}

const CheckinMapModal: React.FC<CheckinMapModalProps> = ({
	isOpen,
	onClose,
	userId,
	onNavigateToStory,
	onNavigateToQuest,
	checkins: mockCheckins,
}) => {
	const [activeFilter, setActiveFilter] = useState<"all" | "story" | "quest">(
		"all",
	);
	const [selectedCheckin, setSelectedCheckin] =
		useState<CheckinResponseDto | null>(null);
	const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

	// Fetch checkins data only if no mock data is provided
	const {
		data: checkinsData,
		isLoading,
		isError,
	} = useCheckins({
		userId,
		type: activeFilter,
		limit: 100,
	});

	// Use mock data if provided, otherwise use fetched data
	const actualCheckinsData = mockCheckins
		? {
				checkins: mockCheckins,
				total: mockCheckins.length,
				page: 1,
				limit: mockCheckins.length,
			}
		: checkinsData;

	// Filter checkins based on active filter
	const filteredCheckins = useMemo(() => {
		if (!actualCheckinsData?.checkins) return [];

		if (activeFilter === "all") {
			return actualCheckinsData.checkins;
		}

		return actualCheckinsData.checkins.filter(
			(checkin) => checkin.type === activeFilter,
		);
	}, [actualCheckinsData, activeFilter]);

	// Don't show loading/error states if we have mock data
	const isActuallyLoading = !mockCheckins && isLoading;
	const isActuallyError = !mockCheckins && isError;

	const handleMarkerClick = (checkin: CheckinResponseDto) => {
		setSelectedCheckin(checkin);
		setIsLocationModalOpen(true);
	};

	const handleLocationModalClose = () => {
		setIsLocationModalOpen(false);
		setSelectedCheckin(null);
	};

	const handleViewStory = (storyId: string) => {
		if (onNavigateToStory) {
			onNavigateToStory(storyId);
		}
		onClose(); // Close the map modal
	};

	const handleReplayQuest = (questId: string) => {
		if (onNavigateToQuest) {
			onNavigateToQuest(questId);
		}
		onClose(); // Close the map modal
	};

	const handleAddToMemoryWall = (checkinId: string) => {
		// TODO: Implement memory wall functionality
		console.log("Adding to memory wall:", checkinId);
	};

	const handleFilterChange = (filter: "all" | "story" | "quest") => {
		setActiveFilter(filter);
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
					<AnimatePresence>
						{isOpen && (
							<motion.div
								className="h-full flex flex-col"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ type: "spring", duration: 0.3 }}
							>
								{/* Header */}
								<div className="flex items-center justify-between p-6 border-b bg-white">
									<DialogHeader>
										<DialogTitle className="flex items-center gap-2 text-xl font-bold">
											<MapPin className="w-6 h-6 text-indigo-600" />
											Check-In Map
										</DialogTitle>
									</DialogHeader>

									<button
										type="button"
										onClick={onClose}
										className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
										aria-label="Close modal"
									>
										<X className="w-5 h-5 text-gray-500" />
									</button>
								</div>

								{/* Filters */}
								<div className="px-6 py-4 bg-gray-50 border-b">
									<MapFilters
										activeFilter={activeFilter}
										onFilterChange={handleFilterChange}
									/>
								</div>

								{/* Map Content */}
								<div className="flex-1 relative">
									{isActuallyLoading && (
										<motion.div
											className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<div className="text-center">
												<motion.div
													className="text-4xl mb-4"
													animate={{ rotate: 360 }}
													transition={{
														duration: 2,
														repeat: Number.POSITIVE_INFINITY,
														ease: "linear",
													}}
												>
													🗺️
												</motion.div>
												<p className="text-gray-600">
													Loading your check-ins...
												</p>
											</div>
										</motion.div>
									)}

									{isActuallyError && (
										<motion.div
											className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<div className="text-center">
												<div className="text-4xl mb-4">❌</div>
												<p className="text-gray-600">
													Failed to load check-ins
												</p>
												<button
													type="button"
													onClick={() => window.location.reload()}
													className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
												>
													Try Again
												</button>
											</div>
										</motion.div>
									)}

									{!isActuallyLoading &&
										!isActuallyError &&
										filteredCheckins.length === 0 && (
											<motion.div
												className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
											>
												<div className="text-center">
													<div className="text-4xl mb-4">📍</div>
													<p className="text-gray-600 mb-2">
														No check-ins found
													</p>
													<p className="text-sm text-gray-500">
														{activeFilter === "all"
															? "Start exploring to see your check-ins on the map!"
															: `No ${activeFilter} check-ins found. Try a different filter.`}
													</p>
												</div>
											</motion.div>
										)}

									{!isActuallyLoading &&
										!isActuallyError &&
										filteredCheckins.length > 0 && (
											<motion.div
												className="h-full"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.2, duration: 0.5 }}
											>
												<InteractiveMap
													checkins={filteredCheckins}
													onMarkerClick={handleMarkerClick}
													className="h-full"
												/>
											</motion.div>
										)}
								</div>

								{/* Stats Footer */}
								{!isActuallyLoading &&
									!isActuallyError &&
									actualCheckinsData && (
										<motion.div
											className="px-6 py-3 bg-white border-t"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3, duration: 0.3 }}
										>
											<div className="flex items-center justify-between text-sm text-gray-600">
												<span>
													Showing {filteredCheckins.length} of{" "}
													{actualCheckinsData.total} check-ins
												</span>
												<div className="flex items-center gap-4">
													<div className="flex items-center gap-1">
														<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
														<span>Story</span>
													</div>
													<div className="flex items-center gap-1">
														<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
														<span>Quest</span>
													</div>
													<div className="flex items-center gap-1">
														<div className="w-3 h-3 bg-green-500 rounded-full"></div>
														<span>Route</span>
													</div>
												</div>
											</div>
										</motion.div>
									)}
							</motion.div>
						)}
					</AnimatePresence>
				</DialogContent>
			</Dialog>

			{/* Location Details Modal */}
			<LocationDetailsModal
				isOpen={isLocationModalOpen}
				onClose={handleLocationModalClose}
				checkin={selectedCheckin}
				onViewStory={handleViewStory}
				onReplayQuest={handleReplayQuest}
				onAddToMemoryWall={handleAddToMemoryWall}
			/>
		</>
	);
};

export default CheckinMapModal;
