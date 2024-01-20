import React from "react";
import { type GoalProps, goalData } from "../worldData";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Drawer,
} from "@/lib/ui/drawer";

const Goal: React.FC<GoalProps> = () => {
  return (
    <div className="mx-10 mb-10 items-start justify-center text-warmGrey3  ">
      <div>
        <div className="flex flex-col items-center justify-center gap-10 text-center  text-xs font-semibold uppercase sm:flex-row sm:text-base">
          {goalData.map((goal) => (
            <Drawer>
              <DrawerTrigger className="flex h-60 w-60 cursor-pointer items-center justify-center rounded-full border-[1px] border-warmGrey uppercase tracking-widest transition-all duration-200 hover:bg-warmGrey hover:text-charcoal sm:h-60 sm:w-60 sm:p-2 md:mb-0 xl:h-72 xl:w-72">
                {goal.title}
              </DrawerTrigger>
              <DrawerContent barColor="charcoal">
                <div className="mx-auto w-full max-w-sm">
                  <Image
                    src={goal.image ?? ""}
                    width={200}
                    height={200}
                    alt={goal.title ?? ""}
                    className="w-fit-content h-fit-content relative mx-auto"
                    priority={true}
                  />
                  <DrawerHeader>
                    <DrawerTitle className="-mt-2">{goal.title}</DrawerTitle>
                    <Image
                      className="object-contain"
                      src="/image/about/line-charcoal.svg"
                      alt="line"
                      layout="responsive"
                      width={800}
                      height={800}
                      priority={true}
                    />
                    <DrawerDescription>
                      <ReactMarkdown>{goal.description}</ReactMarkdown>{" "}
                    </DrawerDescription>
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
