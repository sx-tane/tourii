import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { goalData } from "@/lib/data/world/world-data";
import type { GoalProps } from "@/types/world-type";
import Image from "next/image";

import ReactMarkdown from "react-markdown";

const Goal: React.FC<GoalProps> = () => {
	return (
		<div className="mx-10 mb-10 items-start justify-center text-warmGrey3  ">
			<div>
				<div className="flex flex-row items-center justify-center gap-10 text-center text-xs font-semibold uppercase sm:text-base">
					{goalData.map((goal) => (
						<Drawer key={goal.title}>
							<DrawerTrigger className="flex h-36 w-36 cursor-pointer items-center justify-center rounded-full border-[1px] border-warmGrey p-3 uppercase tracking-widest transition-all duration-300 hover:bg-warmGrey hover:text-charcoal sm:h-60 sm:w-60 md:mb-0 xl:h-72 xl:w-72">
								{goal.title}
							</DrawerTrigger>
							<DrawerContent className="border-warmGrey" barColor="charcoal">
								<div className="mx-auto w-full max-w-sm md:max-w-lg">
									<Image
										src={goal.image ?? ""}
										width={200}
										height={200}
										alt={goal.title ?? ""}
										className="w-fit-content h-fit-content relative mx-auto"
										priority
									/>
									<DrawerHeader>
										<DrawerTitle className="-mt-2">{goal.title}</DrawerTitle>
										<Image
											className="object-contain"
											src="/image/about/line-charcoal.svg"
											alt="line"
											width={800}
											height={800}
											priority
										/>
										<DrawerDescription className="text-center">
											<ReactMarkdown>{goal.description}</ReactMarkdown>
										</DrawerDescription>
										<DrawerClose className="mx-auto hidden h-fit w-fit rounded-full border-[1.5px] border-charcoal px-8 py-2  font-medium uppercase tracking-widest transition hover:bg-charcoal hover:text-warmGrey sm:flex">
											close
										</DrawerClose>
									</DrawerHeader>
								</div>
							</DrawerContent>
						</Drawer>
					))}
				</div>
			</div>
		</div>
	);
};

export default Goal;
