import type { Story } from "@/types/story-type";
import Link from "next/link";

const StoryButton: React.FC<{ story: Story | undefined }> = ({ story }) => {
	return (
		<div>
			<Link
				href={`/touriiverse/${story?.url}`}
				className="transition-all duration-500"
			>
				<div className="cursor-pointer rounded-full border-[1.5px] px-16 py-3 font-semibold tracking-wider transition-all duration-300 hover:bg-warmGrey hover:text-charcoal">
					Proceed To Story
				</div>
			</Link>
		</div>
	);
};

export default StoryButton;
