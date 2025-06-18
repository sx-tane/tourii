"use client";

import { motion } from "framer-motion";
import { CreditCard, Star, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePassport } from "@/hooks/api";

export interface DigitalPassportCardProps {
	className?: string;
	onClick?: () => void;
}

const DigitalPassportCard: React.FC<DigitalPassportCardProps> = ({
	className = "",
	onClick,
}) => {
	const router = useRouter();
	const { passport, isLoading, isError } = usePassport();

	const handleCardClick = () => {
		if (onClick) {
			onClick();
		} else {
			// Navigate to passport page
			router.push("/v2/passport");
		}
	};

	// Get passport type display info
	const getPassportTypeInfo = (type: string | null) => {
		switch (type) {
			case "AMATSUKAMI":
				return { name: "Amatsukami", color: "text-yellow-600", bgColor: "bg-yellow-50" };
			case "KUNITSUKAMI":
				return { name: "Kunitsukami", color: "text-green-600", bgColor: "bg-green-50" };
			case "YOKAI":
				return { name: "Yokai", color: "text-purple-600", bgColor: "bg-purple-50" };
			default:
				return { name: "Bonjin", color: "text-indigo-600", bgColor: "bg-indigo-50" };
		}
	};

	// Show loading state
	if (isLoading) {
		return (
			<div className={`bg-white shadow-sm rounded-lg p-6 ${className}`}>
				<div className="flex items-center justify-center h-32">
					<Loader2 className="w-6 h-6 animate-spin text-gray-400" />
				</div>
			</div>
		);
	}

	// Show error state
	if (isError || !passport) {
		return (
			<div className={`bg-white shadow-sm rounded-lg p-6 ${className}`}>
				<div className="flex items-center justify-center h-32 text-gray-500">
					<p>Unable to load passport data</p>
				</div>
			</div>
		);
	}

	const passportInfo = getPassportTypeInfo(passport.passportType);

	return (
		<motion.div
			className={`bg-white shadow-sm rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow ${className}`}
			onClick={handleCardClick}
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleCardClick();
				}
			}}
			aria-label="View digital passport"
		>
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<motion.div
						className={`p-2 ${passportInfo.bgColor} rounded-lg`}
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						<CreditCard className={`w-5 h-5 ${passportInfo.color}`} />
					</motion.div>
					<h3 className="font-semibold text-gray-900">Digital Passport</h3>
				</div>
				<motion.div
					className="p-1 rounded-full hover:bg-gray-100 transition-colors"
					whileHover={{ rotate: 45 }}
					transition={{ type: "spring", stiffness: 400, damping: 25 }}
				>
					<Star className="w-4 h-4 text-gray-400" />
				</motion.div>
			</div>

			{/* Avatar and Passport Type */}
			<div className="flex items-center gap-4 mb-4">
				<motion.div
					className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						delay: 0.2,
						type: "spring",
						stiffness: 300,
						damping: 20,
					}}
				>
					{/* Default avatar using first letter of username */}
					<div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
						<span className="text-lg font-bold text-indigo-600">
							{passport.username.charAt(0).toUpperCase()}
						</span>
					</div>
				</motion.div>
				<div className="flex-1">
					<motion.div
						className={`text-lg font-bold ${passportInfo.color} mb-1`}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3, duration: 0.3 }}
					>
						{passportInfo.name}
					</motion.div>
					<p className="text-sm text-gray-500">
						Level {passport.level || "Unknown"} • {passport.magatamaPoints} points
					</p>
				</div>
			</div>

			{/* Digital Passport Address Display */}
			{passport.digitalPassportAddress && (
				<motion.div
					className="flex items-center justify-center mb-4 p-3 bg-gray-50 rounded-lg"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				>
					<span className="text-xs font-mono text-gray-600">
						{passport.digitalPassportAddress.slice(0, 6)}...{passport.digitalPassportAddress.slice(-4)}
					</span>
				</motion.div>
			)}

			{/* Stats */}
			<motion.div
				className="space-y-2 mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.3 }}
			>
				<div className="flex items-center justify-between text-xs text-gray-600">
					<div className="flex items-center gap-1">
						<MapPin className="w-3 h-3" />
						<span>Places Visited</span>
					</div>
					<span>{passport.travelHistory.length}</span>
				</div>
				<div className="flex items-center justify-between text-xs text-gray-600">
					<div className="flex items-center gap-1">
						<Star className="w-3 h-3" />
						<span>Achievements</span>
					</div>
					<span>{passport.achievements.length}</span>
				</div>
			</motion.div>

			{/* Status */}
			<motion.div
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.3 }}
			>
				<div className="flex items-center gap-2">
					<div
						className={`w-2 h-2 rounded-full ${
							passport.digitalPassportAddress ? "bg-green-400" : "bg-yellow-400"
						}`}
					/>
					<span className="text-xs text-gray-500">
						{passport.digitalPassportAddress ? "Active" : "Pending"}
					</span>
				</div>
				<motion.div
					className={`text-xs ${passportInfo.color} text-right`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.3 }}
				>
					View passport →
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default DigitalPassportCard;