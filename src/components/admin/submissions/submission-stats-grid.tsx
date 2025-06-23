import { BarChart3, Camera, Share2, FileText } from "lucide-react";

interface SubmissionStatsGridProps {
	totalPending: number;
	photoUploads: number;
	socialShares: number;
	textAnswers: number;
}

export default function SubmissionStatsGrid({
	totalPending,
	photoUploads,
	socialShares,
	textAnswers,
}: SubmissionStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Pending
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{totalPending}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Camera size={16} className="text-green-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Photo Uploads
					</span>
				</div>
				<div className="text-2xl font-bold text-green-600">{photoUploads}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Share2 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Social Shares
					</span>
				</div>
				<div className="text-2xl font-bold text-blue-600">{socialShares}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<FileText size={16} className="text-purple-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Text Answers
					</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">{textAnswers}</div>
			</div>
		</div>
	);
}
