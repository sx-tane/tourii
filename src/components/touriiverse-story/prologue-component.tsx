import type { Chapter } from "@/types/story-type";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

const PrologueComponent: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
	return (
		<div className="relative h-[70vh] w-auto animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal">
			<div className="grid-3 flex">
				<Link href={"/touriiverse"}>
					<ArrowUturnLeftIcon className="h-4 w-4 text-charcoal transition-all duration-300 hover:scale-110 hover:text-red" />
				</Link>
				<div className="flex-1 text-center font-bold uppercase tracking-wider md:text-5xl">
					{chapter?.area}
					<div className="mt-3 text-base font-semibold">
						{chapter?.chapterNumber}
					</div>
				</div>
			</div>
			<div className="bottom-8 left-8 md:absolute">
				<div className="mb-5 w-80 font-bold">{chapter?.title}</div>
				<Markdown className="gap-10 whitespace-pre-wrap text-justify text-sm md:w-7/12 xl:columns-2 xl:text-base">
					{chapter?.content}
				</Markdown>
			</div>
			<Image
				src={chapter?.image ?? ""}
				alt={chapter?.title ?? ""}
				width={550}
				height={550}
				priority
				className="absolute bottom-8 right-8  hidden aspect-square w-auto rounded-full object-cover md:flex md:h-[35vh] lg:h-[45vh] xl:h-[55vh]"
			/>
		</div>
	);
};

export default PrologueComponent;
