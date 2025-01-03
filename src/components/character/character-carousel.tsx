import { Card, CardContent } from "@/lib/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/lib/ui/carousel";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/lib/ui/drawer";
import Image from "next/image";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { characters } from "../../lib/data/character/character-data";

export function CharacterCarousel() {
	return (
		<Carousel className="-mt-10 w-full md:max-w-md">
			<CarouselContent>
				{characters.map((character) => (
					<CarouselItem key={character.name}>
						<Card>
							<CardContent className="flex items-center justify-center p-6 text-center">
								<div>
									<Drawer>
										<DrawerTrigger className="md:text-md transition-full bg-transparent p-4 text-xs font-semibold uppercase tracking-widest text-red duration-300 ">
											<Image
												src={character.image ?? ""}
												alt={character.name ?? ""}
												width={400}
												height={400}
												className="mb-2"
												priority={true}
											/>
											{character.name}
										</DrawerTrigger>
										<DrawerContent
											className="border-charcoal bg-charcoal px-2 sm:px-0"
											barColor="warmGrey3"
										>
											<div className="mx-auto w-full max-w-sm md:max-w-lg">
												<DrawerHeader className="">
													<Image
														src={character.smallImage ?? ""}
														width={200}
														height={200}
														alt={character.name ?? ""}
														className="w-fit-content h-fit-content relative mx-auto"
														priority={true}
													/>
													<DrawerTitle className="text-warmGrey3">
														{character.name}
													</DrawerTitle>
													<Image
														className="object-contain"
														src="/image/world/line.svg"
														alt="line"
														layout="responsive"
														width={800}
														height={800}
														priority={true}
													/>
													<DrawerDescription className=" text-center text-warmGrey3">
														<ReactMarkdown>
															{character.description}
														</ReactMarkdown>
													</DrawerDescription>
													<DrawerClose className="mx-auto hidden h-fit w-fit rounded-full border-[1.5px] border-warmGrey3 px-8 py-2 font-medium  uppercase tracking-widest text-warmGrey3 transition hover:bg-warmGrey3 hover:text-charcoal sm:flex">
														close
													</DrawerClose>
												</DrawerHeader>
											</div>
										</DrawerContent>
									</Drawer>
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
