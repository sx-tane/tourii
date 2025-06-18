"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Star, MapPin, Award } from "lucide-react";
import Image from "next/image";
import type { RootState } from "@/lib/redux/store";

const PassportPage = () => {
	const router = useRouter();
	const passport = useSelector((state: RootState) => state.passport);

	const getPassportTypeInfo = (type: string) => {
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
									{passport.userAvatar && (
										<Image
											src={passport.userAvatar}
											alt="User avatar"
											width={96}
											height={96}
											className="object-cover w-full h-full"
										/>
									)}
								</div>
							</div>

							{/* Chinese Characters */}
							{passport.chineseCharacters.length > 0 && (
								<div className="flex justify-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
									{passport.chineseCharacters.map((char, index) => (
										<span
											key={`${char}-${index}`}
											className="text-2xl font-bold text-gray-700"
										>
											{char}
										</span>
									))}
								</div>
							)}

							{/* Status Badge */}
							<div className="text-center mb-6">
								<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
									passport.isUnlocked 
										? "bg-green-100 text-green-800" 
										: "bg-yellow-100 text-yellow-800"
								}`}>
									<div className={`w-2 h-2 rounded-full ${
										passport.isUnlocked ? "bg-green-400" : "bg-yellow-400"
									}`} />
									{passport.isUnlocked ? "Active" : "Pending Verification"}
								</div>
							</div>

							{/* Quick Stats */}
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="p-3 bg-gray-50 rounded-lg">
									<div className={`text-2xl font-bold ${passportInfo.color}`}>
										{passport.level}
									</div>
									<div className="text-xs text-gray-500">Level</div>
								</div>
								<div className="p-3 bg-gray-50 rounded-lg">
									<div className={`text-2xl font-bold ${passportInfo.color}`}>
										{passport.totalPoints}
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
												<p className="text-sm text-gray-500">{travel.date}</p>
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

						{/* Unlocked Perks */}
						<motion.div
							className="bg-white rounded-lg shadow-sm p-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<div className="flex items-center gap-2 mb-4">
								<Star className="w-5 h-5 text-gray-500" />
								<h3 className="text-lg font-semibold text-gray-900">Unlocked Perks</h3>
							</div>
							
							{passport.unlockedPerks.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{passport.unlockedPerks.map((perk, index) => (
										<div
											key={`${perk}-${index}`}
											className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
										>
											<Star className="w-4 h-4 text-yellow-500" />
											<span className="text-sm font-medium text-gray-900">{perk}</span>
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									<Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
									<p>No perks unlocked yet</p>
									<p className="text-sm">Complete quests to unlock exclusive perks!</p>
								</div>
							)}
						</motion.div>

						{/* Coming Soon */}
						<motion.div
							className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-sm p-6 text-white"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
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