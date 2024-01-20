import { Card, CardContent } from "@/lib/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/lib/ui/carousel";
import * as React from "react";
import Image from "next/image";
import { characters } from "./legacy/characterData";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/ui/drawer";
import ReactMarkdown from "react-markdown";

export function CharacterCarousel() {
  return (
    <Carousel className="-mt-10 w-full md:max-w-md">
      <CarouselContent>
        {characters.map((character) => (
          <CarouselItem>
            <Card>
              <CardContent className="flex items-center justify-center p-6 text-center">
                <div>
                  <Image
                    src={character.image ?? ""}
                    alt={character.name ?? ""}
                    width={400}
                    height={400}
                    className="mb-2"
                    priority={true}
                  />
                  <Drawer>
                    <DrawerTrigger className="md:text-md transition-full rounded-full border-[1.5px] border-red bg-transparent p-4 text-xs font-semibold uppercase tracking-widest text-red duration-200 hover:bg-red hover:text-warmGrey ">
                      {character.name}
                    </DrawerTrigger>
                    <DrawerContent
                      className="border-charcoal bg-charcoal px-2 sm:px-0"
                      barColor="warmGrey3"
                    >
                      <div className="mx-auto w-full max-w-sm">
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
                          <DrawerDescription className=" text-warmGrey3">
                            <ReactMarkdown>
                              {character.description}
                            </ReactMarkdown>
                          </DrawerDescription>
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
