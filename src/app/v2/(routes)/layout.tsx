import Loading from "@/app/loading";
import HeaderApp from "@/components/header/header-component/header-launch-app";
import { type ReactNode, Suspense } from "react";

interface RegionLayoutProps {
	children: ReactNode;
}

const RegionLayout = ({ children }: RegionLayoutProps) => {
	return (
		<div className="min-h-screen animate-fadeIn overflow-hidden before:fixed before:inset-0 before:z-[-1] bg-warmGrey before:bg-warmGrey">
			<div className="mx-6">
				<HeaderApp theme={"white"} />
			</div>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
};

export default RegionLayout;
