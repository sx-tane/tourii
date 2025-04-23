import type { Story } from "@/app/v2/(stories)/types";
import Link from "next/link";

const StoryButton: React.FC<{ story: Story | undefined }> = ({ story }) => {
	return (
		<div>
			<Link
				href={`/v2/touriiverse/${story?.storyId}`}
				className="transition-all duration-500"
			>
				<div className="cursor-pointer rounded-full border-[1.5px] px-8 py-3 text-sm md:px-16 md:py-3 font-medium md:font-semibold tracking-wider transition-all duration-300 hover:bg-warmGrey hover:text-charcoal">
					Proceed To Story
				</div>
			</Link>
		</div>
	);
};

export default StoryButton;
