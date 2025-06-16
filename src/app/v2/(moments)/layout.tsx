import Loading from "@/app/loading";
import HeaderApp from "@/components/header/header-component/header-launch-app";
import { type ReactNode, Suspense } from "react";

interface MomentsLayoutProps {
	children: ReactNode;
}

const MomentsLayout = ({ children }: MomentsLayoutProps) => {
	return (
		<div className="min-h-screen animate-fadeIn overflow-hidden bg-charcoal before:fixed before:inset-0 before:z-[-1] before:bg-charcoal">
			<div className="mx-6">
				<HeaderApp theme={"black"} />
			</div>
			<Suspense fallback={<Loading />}>{children} </Suspense>
		</div>
	);
};

export default MomentsLayout;
