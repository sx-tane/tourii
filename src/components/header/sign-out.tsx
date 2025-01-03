import Link from "next/link";

const SignOut = ({
	textColor,
	hoverTextColor,
}: {
	textColor: string;
	hoverTextColor: string;
}) => {
	return (
		<div>
			<Link
				href="/api/auth/logout"
				className={`rounded-lg border border-${textColor} px-2 py-1 text-xs font-semibold uppercase text-${textColor} transition-all duration-300 hover:bg-${textColor} hover:text-${hoverTextColor}`}
			>
				Sign out
			</Link>
		</div>
	);
};

export default SignOut;
