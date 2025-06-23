import type { SubmissionData } from "@/hooks";
import { Users, Eye, Check, X } from "lucide-react";
import TaskTypeIcon from "./task-type-icon";

interface SubmissionTableProps {
	submissions: SubmissionData[];
	selectedSubmissions: string[];
	isProcessing: string | null;
	onToggleSubmissionSelection: (submissionId: string) => void;
	onToggleSelectAll: () => void;
	onViewSubmission: (submission: SubmissionData) => void;
	onApprove: (submissionId: string) => void;
	onRejectClick: (submissionId: string) => void;
}

export default function SubmissionTable({
	submissions,
	selectedSubmissions,
	isProcessing,
	onToggleSubmissionSelection,
	onToggleSelectAll,
	onViewSubmission,
	onApprove,
	onRejectClick,
}: SubmissionTableProps) {
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
		return "Social Platform";
	};

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={
										selectedSubmissions.length === submissions.length &&
										submissions.length > 0
									}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							<th className="px-6 py-4 text-left font-semibold">Task Type</th>
							<th className="px-6 py-4 text-left font-semibold">User</th>
							<th className="px-6 py-4 text-left font-semibold">Quest/Task</th>
							<th className="px-6 py-4 text-left font-semibold">Submission</th>
							<th className="px-6 py-4 text-left font-semibold">Submitted</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{submissions.map((submission: SubmissionData, index: number) => (
							<tr
								key={submission.userTaskLogId || index}
								className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
									selectedSubmissions.includes(submission.userTaskLogId)
										? "ring-2 ring-blue-200"
										: ""
								}`}
							>
								<td className="px-4 py-4">
									<input
										type="checkbox"
										checked={selectedSubmissions.includes(
											submission.userTaskLogId,
										)}
										onChange={() =>
											onToggleSubmissionSelection(submission.userTaskLogId)
										}
										className="rounded border-warmGrey2 text-red focus:ring-red"
									/>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<TaskTypeIcon taskType={submission.taskType} />
										<span
											className={`rounded-full px-2 py-1 text-xs font-medium ${getTaskTypeColor(submission.taskType)}`}
										>
											{submission.taskType?.replace(/_/g, " ")}
										</span>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
											<Users size={16} className="text-blue-600" />
										</div>
										<div>
											<div className="font-semibold text-charcoal">
												{submission.username || submission.userId || "Unknown"}
											</div>
											<div className="text-sm text-warmGrey3">
												ID: {submission.userId?.slice(0, 8)}...
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm">
										<div className="font-medium text-charcoal">
											{submission.questName}
										</div>
										<div className="text-warmGrey3 truncate">
											{submission.taskDetails?.taskName ||
												`Task: ${submission.taskId?.slice(0, 12)}...`}
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="max-w-xs">
										{submission.taskType === "PHOTO_UPLOAD" && (
											<div className="text-sm">
												<div className="text-green-600 font-medium">
													Photo submitted
												</div>
												<div className="text-xs text-warmGrey3 truncate">
													{submission.submissionData?.image_url ||
														"No image URL"}
												</div>
											</div>
										)}
										{submission.taskType === "SHARE_SOCIAL" && (
											<div className="text-sm">
												<div className="text-blue-600 font-medium">
													Social share
												</div>
												<div className="text-xs text-warmGrey3">
													{getSocialPlatform(
														submission.submissionData?.social_url || "",
													)}
												</div>
												<div className="text-xs text-warmGrey3 truncate max-w-32">
													{submission.submissionData?.social_url || "No URL"}
												</div>
											</div>
										)}
										{submission.taskType === "ANSWER_TEXT" && (
											<div className="text-sm">
												<div className="text-purple-600 font-medium">
													Text answer
												</div>
												<div className="text-xs text-warmGrey3 truncate max-w-48">
													{submission.submissionData?.answer ||
														submission.userResponse ||
														"No answer"}
												</div>
											</div>
										)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-charcoal">
										{formatDate(submission.submittedAt)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => onViewSubmission(submission)}
											className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all"
											title="View Details"
										>
											<Eye size={16} />
										</button>
										<button
											type="button"
											onClick={() => onApprove(submission.userTaskLogId)}
											disabled={isProcessing === submission.userTaskLogId}
											className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition-all disabled:opacity-50"
											title="Approve"
										>
											<Check size={16} />
										</button>
										<button
											type="button"
											onClick={() => onRejectClick(submission.userTaskLogId)}
											disabled={isProcessing === submission.userTaskLogId}
											className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition-all disabled:opacity-50"
											title="Reject"
										>
											<X size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
					{submissions.length === 0 && (
						<tbody>
							<tr>
								<td colSpan={7} className="px-6 py-8 text-center text-charcoal">
									No pending submissions found.
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}
