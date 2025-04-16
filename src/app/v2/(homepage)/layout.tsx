import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import HeaderApp from "@/components/header/header-component/header-launch-app";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className="absolute top-0 left-0 w-full z-20">
				<HeaderApp theme={"white"} />
			</div>
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
