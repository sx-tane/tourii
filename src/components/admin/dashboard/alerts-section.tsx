"use client";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface Alert {
	message: string;
	actionText: string;
	actionLink: string;
}

interface AlertsSectionProps {
	pendingSubmissions: number;
	newUsersToday: number;
}

export default function AlertsSection({
	pendingSubmissions,
	newUsersToday,
}: AlertsSectionProps) {
	const alerts: Alert[] = [];

	if (pendingSubmissions > 0) {
		alerts.push({
			message: `${pendingSubmissions} submissions need review`,
			actionText: "Review Now",
			actionLink: "/v2/admin/submissions",
		});
	}

	if (newUsersToday > 0) {
		alerts.push({
			message: `${newUsersToday} new users registered today`,
			actionText: "View Users",
			actionLink: "/v2/admin/users",
		});
	}

	if (alerts.length === 0) {
		return null;
	}

	return (
		<div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
			<h2 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
				<AlertCircle size={18} />
				Action Required
			</h2>
			<div className="space-y-2">
				{alerts.map((alert) => (
					<div
						key={`${alert.message}-${alert.actionLink}`}
						className="flex items-center justify-between"
					>
						<span className="text-yellow-700">{alert.message}</span>
						<Link
							href={alert.actionLink}
							className="text-sm bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded-lg text-yellow-800 transition-colors"
						>
							{alert.actionText}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
