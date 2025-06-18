import type { ReactNode } from "react";

interface ShopLayoutProps {
	children: ReactNode;
}

const ShopLayout = ({ children }: ShopLayoutProps) => {
	return (
		<div className="min-h-screen bg-gray-50">
			{children}
		</div>
	);
};

export default ShopLayout;