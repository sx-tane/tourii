import Loading from "@/app/loading";
import HeaderApp from "@/components/header/header-component/header-launch-app";
import { type ReactNode, Suspense } from "react";

interface StoriesLayoutProps {
	children: ReactNode;
}

const StoriesLayout = ({ children }: StoriesLayoutProps) => {
	return (
		<div>
			<div className="absolute top-0 left-0 w-full z-20">
				<HeaderApp theme={"white"} />
			</div>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
};

export default StoriesLayout;
