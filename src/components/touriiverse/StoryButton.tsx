import Link from "next/link";

interface StoryButtonProps {
	title: string;
}
const StoryButton: React.FC<StoryButtonProps> = ({ title }) => {
	return (
		<div>
			<Link
				href={`/touriiverse/${title}`}
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
