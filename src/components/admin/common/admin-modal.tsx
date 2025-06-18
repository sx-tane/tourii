import React from "react";

interface AdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	isSubmitting?: boolean;
	onSubmit?: () => void;
	submitLabel?: string;
	isEdit?: boolean;
	className?: string;
}

export function AdminModal({
	isOpen,
	onClose,
	title,
	children,
	isSubmitting = false,
	onSubmit,
	submitLabel,
	isEdit = false,
	className = "",
}: AdminModalProps) {
	if (!isOpen) return null;

	const defaultSubmitLabel = isEdit ? "Update" : "Create";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className={`max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl ${className}`}>
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
						disabled={isSubmitting}
					>
						✕
					</button>
				</div>

				{children}

				{onSubmit && (
					<div className="mt-8 flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={onSubmit}
							disabled={isSubmitting}
							className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
						>
							{isSubmitting ? "Saving..." : submitLabel || defaultSubmitLabel}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}