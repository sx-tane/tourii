"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Package, Star, Sparkles } from "lucide-react";
import Link from "next/link";

const ShopPage = () => {
	const comingSoonFeatures = [
		{
			id: "nft-collectibles",
			title: "Digital Passport NFTs",
			description: "Unique blockchain-verified travel credentials",
			icon: Package,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			id: "exclusive-items",
			title: "Exclusive Items",
			description: "Limited edition collectibles and rewards",
			icon: Star,
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			id: "power-ups",
			title: "Quest Power-ups",
			description: "Enhance your exploration experience",
			icon: Sparkles,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<motion.div
								className="p-3 bg-indigo-50 rounded-lg"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 400, damping: 25 }}
							>
								<ShoppingBag className="w-6 h-6 text-indigo-600" />
							</motion.div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Tourii Shop</h1>
								<p className="text-sm text-gray-500">
									Digital collectibles and exclusive items
								</p>
							</div>
						</div>
						<Link
							href="/v2/dashboard"
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
						>
							← Back to Dashboard
						</Link>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Coming Soon Banner */}
				<motion.div
					className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-center text-white mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						className="text-6xl mb-4"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
					>
						🛍️
					</motion.div>
					<h2 className="text-3xl font-bold mb-2">Shop Coming Soon!</h2>
					<p className="text-xl opacity-90">
						Get ready for an amazing collection of digital collectibles and exclusive items
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{comingSoonFeatures.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<motion.div
								key={feature.id}
								className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * index, duration: 0.5 }}
								whileHover={{ y: -4 }}
							>
								<div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
									<IconComponent className={`w-6 h-6 ${feature.color}`} />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>

				{/* Notification Section */}
				<motion.div
					className="bg-white rounded-lg p-8 shadow-sm border text-center"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				>
					<h3 className="text-xl font-semibold text-gray-900 mb-3">
						Stay Updated
					</h3>
					<p className="text-gray-600 mb-6">
						Be the first to know when the Tourii Shop launches with exclusive digital collectibles and travel rewards.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<button
							type="button"
							className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
						>
							Get Notified
						</button>
						<Link
							href="/v2/dashboard"
							className="inline-flex items-center px-6 py-3 text-base font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200"
						>
							Continue Exploring
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ShopPage;