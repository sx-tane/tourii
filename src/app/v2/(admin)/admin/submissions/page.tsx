"use client";
import {
	RejectReasonModal,
	SubmissionDetailsModal,
	SubmissionFilters,
	SubmissionStatsGrid,
	SubmissionTable,
} from "@/components/admin/submissions";
import {
	useAdminSubmissions,
	type AdminSubmissionsResponse,
	type SubmissionData,
} from "@/hooks";
import { useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";

type TaskType = "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT";

// SWR mutation functions
async function approveSubmission(
	url: string,
	{ arg }: { arg: { submissionId: string } },
) {
	const response = await fetch(
		`/api/admin/submissions/${arg.submissionId}/verify`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "approve" }),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to approve submission");
	}

	return response.json();
}

async function rejectSubmission(
	url: string,
	{ arg }: { arg: { submissionId: string; rejectionReason: string } },
) {
	const response = await fetch(
		`/api/admin/submissions/${arg.submissionId}/verify`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: "reject",
				rejectionReason: arg.rejectionReason,
			}),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to reject submission");
	}

	return response.json();
}

export default function AdminSubmissions() {
	// State for filters and pagination
	const [taskTypeFilter, setTaskTypeFilter] = useState<"" | TaskType>("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
	const [showSubmissionModal, setShowSubmissionModal] = useState(false);
	const [selectedSubmission, setSelectedSubmission] =
		useState<SubmissionData | null>(null);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [submissionToReject, setSubmissionToReject] = useState<string | null>(
		null,
	);

	// Build parameters object
	const params = useMemo(
		() => ({
			page,
			limit,
			...(taskTypeFilter && { taskType: taskTypeFilter }),
		}),
		[page, limit, taskTypeFilter],
	);

	const {
		data: submissions,
		isLoading: isLoadingSubmissions,
		mutate: mutateSubmissions,
	} = useAdminSubmissions(params);

	// SWR mutations
	const { trigger: triggerApprove, isMutating: isApproving } = useSWRMutation(
		"/api/admin/submissions/approve",
		approveSubmission,
		{
			onSuccess: () => {
				mutateSubmissions();
				if (showSubmissionModal) {
					setShowSubmissionModal(false);
				}
			},
			onError: (error) => {
				console.error("Failed to approve submission:", error);
				alert("Failed to approve submission. Please try again.");
			},
		},
	);

	const { trigger: triggerReject, isMutating: isRejecting } = useSWRMutation(
		"/api/admin/submissions/reject",
		rejectSubmission,
		{
			onSuccess: () => {
				mutateSubmissions();
				setShowRejectModal(false);
				setRejectReason("");
				setSubmissionToReject(null);
				if (showSubmissionModal) {
					setShowSubmissionModal(false);
				}
			},
			onError: (error) => {
				console.error("Failed to reject submission:", error);
				alert("Failed to reject submission. Please try again.");
			},
		},
	);

	// Extract submission list for stats calculation
	const submissionList = useMemo(() => {
		const submissionsData = submissions as AdminSubmissionsResponse;
		if (submissionsData?.submissions) {
			return submissionsData.submissions;
		} else if (Array.isArray(submissions)) {
			return submissions as SubmissionData[];
		} else if (submissionsData?.data) {
			return submissionsData.data;
		} else if (submissionsData?.pendingSubmissions) {
			return submissionsData.pendingSubmissions;
		}
		return [];
	}, [submissions]);

	// Summary statistics
	const stats = useMemo(() => {
		if (submissionList.length === 0) {
			return {
				total: submissions?.pagination?.totalCount || 0,
				photoUploads: 0,
				socialShares: 0,
				textAnswers: 0,
			};
		}

		return {
			total: submissions?.pagination?.totalCount || submissionList.length,
			photoUploads: submissionList.filter((s) => s.taskType === "PHOTO_UPLOAD")
				.length,
			socialShares: submissionList.filter((s) => s.taskType === "SHARE_SOCIAL")
				.length,
			textAnswers: submissionList.filter((s) => s.taskType === "ANSWER_TEXT")
				.length,
		};
	}, [submissions, submissionList]);

	const clearAllFilters = () => {
		setTaskTypeFilter("");
		setPage(1);
	};

	const toggleSubmissionSelection = (submissionId: string) => {
		setSelectedSubmissions((prev) =>
			prev.includes(submissionId)
				? prev.filter((id) => id !== submissionId)
				: [...prev, submissionId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedSubmissions.length === submissionList.length) {
			setSelectedSubmissions([]);
		} else {
			setSelectedSubmissions(submissionList.map((s) => s.userTaskLogId) || []);
		}
	};

	const handleViewSubmission = (submission: SubmissionData) => {
		setSelectedSubmission(submission);
		setShowSubmissionModal(true);
	};

	const handleApprove = async (submissionId: string) => {
		try {
			await triggerApprove({ submissionId });
			console.log(`Submission ${submissionId} approved successfully`);
		} catch (error) {
			// Error handling is done in the mutation onError callback
		}
	};

	const handleRejectClick = (submissionId: string) => {
		setSubmissionToReject(submissionId);
		setRejectReason("");
		setShowRejectModal(true);
	};

	const handleRejectConfirm = async () => {
		if (!submissionToReject || !rejectReason.trim()) {
			alert("Please provide a reject reason.");
			return;
		}

		try {
			await triggerReject({
				submissionId: submissionToReject,
				rejectionReason: rejectReason.trim(),
			});
			console.log(`Submission ${submissionToReject} rejected successfully`);
		} catch (error) {
			// Error handling is done in the mutation onError callback
		}
	};

	// Get current processing submission ID
	const processingSubmissionId =
		submissionToReject && isRejecting ? submissionToReject : null;

	if (isLoadingSubmissions) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Loading submissions...
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-charcoal">
						Submission Review
					</h1>
					<div className="text-sm text-warmGrey3">
						{submissions?.pagination
							? `Page ${submissions.pagination.page} of ${submissions.pagination.totalPages} • ${submissions.pagination.totalCount} pending submissions`
							: ""}
					</div>
				</div>

				{/* Summary Statistics Cards */}
				<SubmissionStatsGrid
					totalPending={stats.total}
					photoUploads={stats.photoUploads}
					socialShares={stats.socialShares}
					textAnswers={stats.textAnswers}
				/>

				{/* Filters */}
				<SubmissionFilters
					taskTypeFilter={taskTypeFilter}
					onTaskTypeFilterChange={setTaskTypeFilter}
					limit={limit}
					onLimitChange={setLimit}
					onClearFilters={clearAllFilters}
				/>

				{/* Bulk Actions Bar */}
				{selectedSubmissions.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedSubmissions.length} submissions selected
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setSelectedSubmissions([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Submissions Table */}
				<SubmissionTable
					submissions={submissionList}
					selectedSubmissions={selectedSubmissions}
					isProcessing={processingSubmissionId}
					onToggleSubmissionSelection={toggleSubmissionSelection}
					onToggleSelectAll={toggleSelectAll}
					onViewSubmission={handleViewSubmission}
					onApprove={handleApprove}
					onRejectClick={handleRejectClick}
				/>

				{/* Pagination */}
				{submissions?.pagination && submissions.pagination.totalPages > 1 && (
					<div className="mt-6 flex items-center justify-between">
						<div className="text-sm text-warmGrey3">
							Showing{" "}
							{(submissions.pagination.page - 1) *
								submissions.pagination.limit +
								1}{" "}
							to{" "}
							{Math.min(
								submissions.pagination.page * submissions.pagination.limit,
								submissions.pagination.totalCount,
							)}{" "}
							of {submissions.pagination.totalCount} submissions
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setPage(page - 1)}
								disabled={page <= 1}
								className="px-3 py-2 text-sm rounded-lg bg-white border border-warmGrey2 text-charcoal hover:bg-warmGrey disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<span className="px-3 py-2 text-sm text-charcoal">
								Page {page} of {submissions.pagination.totalPages}
							</span>
							<button
								type="button"
								onClick={() => setPage(page + 1)}
								disabled={page >= submissions.pagination.totalPages}
								className="px-3 py-2 text-sm rounded-lg bg-white border border-warmGrey2 text-charcoal hover:bg-warmGrey disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				)}

				{/* Submission Details Modal */}
				<SubmissionDetailsModal
					isOpen={showSubmissionModal}
					onClose={() => setShowSubmissionModal(false)}
					submission={selectedSubmission}
					isProcessing={processingSubmissionId}
					onApprove={handleApprove}
					onRejectClick={handleRejectClick}
				/>

				{/* Reject Reason Modal */}
				<RejectReasonModal
					isOpen={showRejectModal}
					onCancel={() => {
						setShowRejectModal(false);
						setRejectReason("");
						setSubmissionToReject(null);
					}}
					rejectReason={rejectReason}
					onRejectReasonChange={setRejectReason}
					onConfirm={handleRejectConfirm}
					isProcessing={isRejecting}
				/>
			</div>
		</div>
	);
}
