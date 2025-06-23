import { useId } from "react";

interface RejectReasonModalProps {
	isOpen: boolean;
	rejectReason: string;
	isProcessing: boolean;
	onRejectReasonChange: (reason: string) => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function RejectReasonModal({
	isOpen,
	rejectReason,
	isProcessing,
	onRejectReasonChange,
	onConfirm,
	onCancel,
}: RejectReasonModalProps) {
	const rejectReasonId = useId();
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-w-md w-full mx-4 bg-white rounded-lg p-6 shadow-xl">
				<div className="mb-4">
					<h2 className="text-xl font-bold text-charcoal mb-2">
						Reject Submission
					</h2>
					<p className="text-sm text-warmGrey3">
						Please provide a reason for rejecting this submission:
					</p>
				</div>

				<div className="mb-6">
					<label
						htmlFor="rejectReason"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Reject Reason *
					</label>
					<textarea
						id={rejectReasonId}
						value={rejectReason}
						onChange={(e) => onRejectReasonChange(e.target.value)}
						placeholder="e.g., Image is blurry, Inappropriate content, Does not match task requirements..."
						className="w-full h-24 px-3 py-2 border border-warmGrey2 rounded-lg focus:border-red focus:outline-none resize-none"
					/>
				</div>

				<div className="flex justify-end gap-3">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onConfirm}
						disabled={!rejectReason.trim() || isProcessing}
						className="px-4 py-2 text-sm rounded-lg bg-red text-white hover:bg-opacity-90 disabled:opacity-50"
					>
						{isProcessing ? "Processing..." : "Reject Submission"}
					</button>
				</div>
			</div>
		</div>
	);
}
