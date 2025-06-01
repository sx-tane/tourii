import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { ActionButton } from "@/components/common";
import Link from "next/link";

const RegionButton: React.FC<{ region: ModelRouteResponseDto | undefined }> = ({
	region,
}) => {
	return (
		<div>
			<Link
				href={`/v2/region/${region?.region}`}
				className="transition-all duration-500"
			>
				<ActionButton>Explore Region</ActionButton>
			</Link>
		</div>
	);
};

export default RegionButton;
