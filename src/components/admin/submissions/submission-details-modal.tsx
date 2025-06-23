import type { SubmissionData } from "@/hooks";
import Image from "next/image";

interface SubmissionDetailsModalProps {
	submission: SubmissionData | null;
	isOpen: boolean;
	isProcessing: string | null;
	onClose: () => void;
	onApprove: (submissionId: string) => void;
	onRejectClick: (submissionId: string) => void;
}

export default function SubmissionDetailsModal({
	submission,
	isOpen,
	isProcessing,
	onClose,
	onApprove,
	onRejectClick,
}: SubmissionDetailsModalProps) {
	if (!isOpen || !submission) return null;

	const getTaskTypeColor = (taskType: string) => {
		switch (taskType) {
			case "PHOTO_UPLOAD":
				return "bg-green-100 text-green-800";
			case "SHARE_SOCIAL":
				return "bg-blue-100 text-blue-800";
			case "ANSWER_TEXT":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const formatDate = (dateStr: string) => {
		if (!dateStr) return "N/A";
		return dateStr
			.replace("T", " ")
			.replace("Z", "")
			.replace(/\.\d{3}/, "");
	};

	const getSocialPlatform = (url: string) => {
		if (url?.includes("x.com") || url?.includes("twitter.com"))
			return "Twitter/X";
		if (url?.includes("facebook.com")) return "Facebook";
		if (url?.includes("instagram.com")) return "Instagram";
		if (url?.includes("linkedin.com")) return "LinkedIn";
		if (url?.includes("tiktok.com")) return "TikTok";
		return "Unknown Platform";
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						Submission Details
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
					>
						✕
					</button>
				</div>

				{/* Comprehensive Submission Data Display */}
				<div className="space-y-6">
					{/* Basic Quest/Task Info */}
					<div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							🎯 Quest & Task Info
						</h3>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<div>
								<span className="font-medium text-blue-800">Quest:</span>
								<span className="ml-2 text-charcoal">
									{submission.questName}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">Task Type:</span>
								<span
									className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${getTaskTypeColor(submission.taskType)}`}
								>
									{submission.taskType.replace(/_/g, " ")}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">Task Name:</span>
								<span className="ml-2 text-charcoal">
									{submission.taskDetails?.taskName || "N/A"}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">
									Task Description:
								</span>
								<span className="ml-2 text-charcoal">
									{submission.taskDetails?.taskDesc || "N/A"}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">
									Required Action:
								</span>
								<span className="ml-2 text-charcoal">
									{submission.taskDetails?.requiredAction || "N/A"}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">
									Points Awarded:
								</span>
								<span className="ml-2 text-charcoal">
									{submission.taskDetails?.magatamaPointAwarded || "N/A"}
								</span>
							</div>
							<div>
								<span className="font-medium text-blue-800">Theme:</span>
								<span className="ml-2 text-charcoal">
									{submission.taskDetails?.taskTheme || "N/A"}
								</span>
							</div>
							<div className="md:col-span-2">
								<span className="font-medium text-blue-800">Task ID:</span>
								<span className="ml-2 text-charcoal text-sm font-mono">
									{submission.taskId}
								</span>
							</div>
						</div>
					</div>

					{/* Basic Info */}
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							📋 Submission Information
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<span className="font-medium">Submission ID:</span>{" "}
								{submission.userTaskLogId}
							</div>
							<div>
								<span className="font-medium">Username:</span>{" "}
								{submission.username}
							</div>
							<div>
								<span className="font-medium">User ID:</span>{" "}
								{submission.userId?.slice(0, 20)}...
							</div>
							<div>
								<span className="font-medium">Task ID:</span>{" "}
								{submission.taskId?.slice(0, 20)}...
							</div>
							<div>
								<span className="font-medium">Submitted:</span>{" "}
								{formatDate(submission.submittedAt)}
							</div>
							<div>
								<span className="font-medium">Days Since:</span>{" "}
								{submission.daysSinceSubmission} days
							</div>
						</div>
					</div>

					{/* Submission Content */}
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							📄 Submission Content
						</h3>

						{submission.taskType === "PHOTO_UPLOAD" && (
							<div className="space-y-4">
								<div>
									<span className="font-medium">Photo URL:</span>
									<div className="mt-2">
										<a
											href={submission.submissionData?.image_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											{submission.submissionData?.image_url}
										</a>
									</div>
								</div>
								{submission.submissionData?.image_url && (
									<div>
										<span className="font-medium">Preview:</span>
										<div className="mt-2">
											<Image
												src={submission.submissionData.image_url}
												alt="Submitted image"
												className="max-w-md max-h-64 object-contain border rounded"
												onError={(e) => {
													e.currentTarget.style.display = "none";
													const nextSibling = e.currentTarget
														.nextSibling as HTMLElement;
													if (nextSibling) {
														nextSibling.textContent = "Failed to load image";
													}
												}}
											/>
											<div className="text-red-600 hidden">
												Failed to load image
											</div>
										</div>
									</div>
								)}
							</div>
						)}

						{submission.taskType === "SHARE_SOCIAL" && (
							<div className="space-y-4">
								<div>
									<span className="font-medium">Platform:</span>{" "}
									{getSocialPlatform(
										submission.submissionData?.social_url || "",
									)}
								</div>
								<div>
									<span className="font-medium">Social URL:</span>
									<div className="mt-2">
										<a
											href={submission.submissionData?.social_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline break-all"
										>
											{submission.submissionData?.social_url || "N/A"}
										</a>
									</div>
								</div>
							</div>
						)}

						{submission.taskType === "ANSWER_TEXT" && (
							<div className="space-y-4">
								<div>
									<span className="font-medium">Text Answer:</span>
									<div className="mt-2 p-3 bg-white border rounded">
										{submission.submissionData?.answer ||
											submission.userResponse ||
											"N/A"}
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={() => onRejectClick(submission.userTaskLogId)}
							disabled={isProcessing === submission.userTaskLogId}
							className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
						>
							{isProcessing === submission.userTaskLogId
								? "Processing..."
								: "Reject"}
						</button>
						<button
							type="button"
							onClick={() => onApprove(submission.userTaskLogId)}
							disabled={isProcessing === submission.userTaskLogId}
							className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
						>
							{isProcessing === submission.userTaskLogId
								? "Processing..."
								: "Approve"}
						</button>
					</div>

					{/* Raw JSON Data */}
					<details className="rounded-lg bg-gray-50 p-4">
						<summary className="font-medium text-purple-600 cursor-pointer">
							🔍 Raw JSON Data
						</summary>
						<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
							{JSON.stringify(submission, null, 2)}
						</pre>
					</details>
				</div>
			</div>
		</div>
	);
}
