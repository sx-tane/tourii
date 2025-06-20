"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Star, MapPin, Award, Loader2 } from "lucide-react";
import { usePassport } from "@/hooks/api";

const PassportPage = () => {
	const router = useRouter();
	const { passport, isLoading, isError } = usePassport();

	const getPassportTypeInfo = (type: string | null) => {
		switch (type) {
			case "AMATSUKAMI":
				return { 
					name: "Amatsukami", 
					color: "text-yellow-600", 
					bgColor: "bg-yellow-50",
					description: "Heavenly Deity - Premium Traveler Status"
				};
			case "KUNITSUKAMI":
				return { 
					name: "Kunitsukami", 
					color: "text-green-600", 
					bgColor: "bg-green-50",
					description: "Earthly Deity - Regional Explorer Status"
				};
			case "YOKAI":
				return { 
					name: "Yokai", 
					color: "text-purple-600", 
					bgColor: "bg-purple-50",
					description: "Mysterious Spirit - Mystical Traveler Status"
				};
			default:
				return { 
					name: "Bonjin", 
					color: "text-indigo-600", 
					bgColor: "bg-indigo-50",
					description: "Mortal - Explorer Status"
				};
		}
	};

	// Show loading state
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-gray-400" />
			</div>
		);
	}

	// Show error state
	if (isError || !passport) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-500 mb-4">Unable to load passport data</p>
					<button
						onClick={() => router.back()}
						className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	const passportInfo = getPassportTypeInfo(passport.passportType);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<div className="flex items-center gap-4">
						<button
							onClick={() => router.back()}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Digital Passport</h1>
							<p className="text-gray-500">Your verified travel credentials</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Passport Card */}
					<div className="lg:col-span-1">
						<motion.div
							className="bg-white rounded-lg shadow-sm p-6 sticky top-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							{/* Passport Type Header */}
							<div className="text-center mb-6">
								<div className={`inline-flex items-center gap-2 px-4 py-2 ${passportInfo.bgColor} rounded-lg`}>
									<CreditCard className={`w-5 h-5 ${passportInfo.color}`} />
									<span className={`font-semibold ${passportInfo.color}`}>
										{passportInfo.name}
									</span>
								</div>
								<p className="text-sm text-gray-500 mt-2">
									{passportInfo.description}
								</p>
							</div>

							{/* Avatar */}
							<div className="flex justify-center mb-6">
								<div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
									{/* Default avatar using first letter of username */}
									<div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
										<span className="text-2xl font-bold text-indigo-600">
											{passport.username.charAt(0).toUpperCase()}
										</span>
									</div>
								</div>
							</div>

							{/* Digital Passport Address */}
							{passport.digitalPassportAddress && (
								<div className="flex justify-center mb-6 p-4 bg-gray-50 rounded-lg">
									<div className="text-center">
										<p className="text-xs text-gray-500 mb-1">Passport Address</p>
										<span className="text-sm font-mono text-gray-700">
											{passport.digitalPassportAddress.slice(0, 6)}...{passport.digitalPassportAddress.slice(-4)}
										</span>
									</div>
								</div>
							)}

							{/* Status Badge */}
							<div className="text-center mb-6">
								<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
									passport.digitalPassportAddress 
										? "bg-green-100 text-green-800" 
										: "bg-yellow-100 text-yellow-800"
								}`}>
									<div className={`w-2 h-2 rounded-full ${
										passport.digitalPassportAddress ? "bg-green-400" : "bg-yellow-400"
									}`} />
									{passport.digitalPassportAddress ? "Active" : "Pending Verification"}
								</div>
							</div>

							{/* Quick Stats */}
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="p-3 bg-gray-50 rounded-lg">
									<div className={`text-2xl font-bold ${passportInfo.color}`}>
										{passport.level || "E"}
									</div>
									<div className="text-xs text-gray-500">Level</div>
								</div>
								<div className="p-3 bg-gray-50 rounded-lg">
									<div className={`text-2xl font-bold ${passportInfo.color}`}>
										{passport.magatamaPoints}
									</div>
									<div className="text-xs text-gray-500">Points</div>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Right Column - Details */}
					<div className="lg:col-span-2 space-y-6">
						{/* Travel History */}
						<motion.div
							className="bg-white rounded-lg shadow-sm p-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<div className="flex items-center gap-2 mb-4">
								<MapPin className="w-5 h-5 text-gray-500" />
								<h3 className="text-lg font-semibold text-gray-900">Travel History</h3>
							</div>
							
							{passport.travelHistory.length > 0 ? (
								<div className="space-y-3">
									{passport.travelHistory.map((travel, index) => (
										<div
											key={`${travel.location}-${index}`}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<h4 className="font-medium text-gray-900">{travel.location}</h4>
												<p className="text-sm text-gray-500">{new Date(travel.date).toLocaleDateString()}</p>
												{travel.travelDistance && (
													<p className="text-xs text-gray-400">{travel.travelDistance}km traveled</p>
												)}
											</div>
											<div className={`flex items-center gap-1 ${
												travel.verified ? "text-green-600" : "text-yellow-600"
											}`}>
												<Award className="w-4 h-4" />
												<span className="text-sm">
													{travel.verified ? "Verified" : "Pending"}
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									<MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
									<p>No travel history yet</p>
									<p className="text-sm">Start exploring to build your passport!</p>
								</div>
							)}
						</motion.div>

						{/* Achievements */}
						<motion.div
							className="bg-white rounded-lg shadow-sm p-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<div className="flex items-center gap-2 mb-4">
								<Star className="w-5 h-5 text-gray-500" />
								<h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
							</div>
							
							{passport.achievements.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{passport.achievements.map((achievement, index) => (
										<div
											key={`${achievement.achievementName}-${index}`}
											className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
										>
											{achievement.iconUrl ? (
												<img 
													src={achievement.iconUrl} 
													alt={achievement.achievementName}
													className="w-8 h-8 rounded"
												/>
											) : (
												<Star className="w-8 h-8 text-yellow-500" />
											)}
											<div className="flex-1">
												<h4 className="text-sm font-medium text-gray-900">
													{achievement.achievementName}
												</h4>
												{achievement.achievementDesc && (
													<p className="text-xs text-gray-500">
														{achievement.achievementDesc}
													</p>
												)}
												<p className="text-xs text-indigo-600 font-medium">
													+{achievement.magatamaPointAwarded} points
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									<Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
									<p>No achievements unlocked yet</p>
									<p className="text-sm">Complete quests to unlock achievements!</p>
								</div>
							)}
						</motion.div>

						{/* Blockchain Items */}
						{passport.onchainItems.length > 0 && (
							<motion.div
								className="bg-white rounded-lg shadow-sm p-6"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<div className="flex items-center gap-2 mb-4">
									<CreditCard className="w-5 h-5 text-gray-500" />
									<h3 className="text-lg font-semibold text-gray-900">Blockchain Items</h3>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{passport.onchainItems.map((item, index) => (
										<div
											key={`${item.itemType}-${index}`}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<h4 className="text-sm font-medium text-gray-900">
													{item.itemType.replace('_', ' ')}
												</h4>
												<p className="text-xs text-gray-500">
													{item.blockchainType}
												</p>
											</div>
											<div className={`text-xs px-2 py-1 rounded-full ${
												item.status === 'ACTIVE' 
													? 'bg-green-100 text-green-800'
													: item.status === 'PENDING'
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-gray-100 text-gray-800'
											}`}>
												{item.status}
											</div>
										</div>
									))}
								</div>
							</motion.div>
						)}

						{/* Coming Soon */}
						<motion.div
							className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-sm p-6 text-white"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
							<p className="text-indigo-100 mb-4">
								Enhanced passport features including NFT integration, advanced verification, 
								and exclusive community access.
							</p>
							<div className="text-sm text-indigo-200">
								Stay tuned for updates! 🚀
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PassportPage;