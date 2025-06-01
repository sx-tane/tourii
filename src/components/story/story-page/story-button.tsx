import type { StoryResponseDto } from "@/api/generated";
import { ActionButton } from "@/components/common";
import Link from "next/link";

const StoryButton: React.FC<{ story: StoryResponseDto | undefined }> = ({
	story,
}) => {
	return (
		<div>
			<Link
				href={`/v2/touriiverse/${story?.storyId}`}
				className="transition-all duration-500"
			>
				<ActionButton>Proceed To Story</ActionButton>
			</Link>
		</div>
	);
};

export default StoryButton;
