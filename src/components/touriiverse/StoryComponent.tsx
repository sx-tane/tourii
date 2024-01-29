import { type Story } from "@/types/interfaceStory";
import Image from "next/image";
import React from "react";
import StoryButton from "./StoryButton";

type StoryComponentProps = {
  story: Story | undefined;
};

const StoryComponent: React.FC<StoryComponentProps> = ({ story }) => {
  const isVideo = story?.backgroundImage.endsWith(".mp4");

  return (
    <div className="relative h-[65vh] w-11/12 overflow-hidden rounded-xl text-warmGrey">
      {isVideo ? (
        <div>
          <div className="absolute left-10 top-5 z-50 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey md:text-7xl lg:text-9xl">
            {story?.title}
          </div>
          <div className="absolute bottom-10 left-10 z-50">
            <StoryButton />
          </div>
          <div>
            <div className="absolute right-10 top-10 z-50 w-1/3 text-base">
              {story?.description}
            </div>
            <Image
              className="absolute bottom-10 right-10 z-50 h-[40vh] w-auto object-cover "
              src={story?.image ?? ""}
              alt={story?.title ?? ""}
              width={600}
              height={600}
              priority={true}
            />
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 z-40 aspect-video h-full w-full object-cover brightness-50"
          >
            <source src={story?.backgroundImage} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div>
          <div className="absolute left-10 top-5 z-50 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey md:text-5xl lg:text-7xl">
            {story?.title}
          </div>
          {story?.title !== "Coming Soon" ? (
            <div className="absolute bottom-10 left-10 z-50">
              <StoryButton />
            </div>
          ) : (
            ""
          )}
          <Image
            src={story?.backgroundImage ?? ""}
            alt={story?.title ?? ""}
            width={600}
            height={600}
            className="absolute left-0 top-0 z-40 h-full w-full object-cover brightness-50"
            priority={true}
          />
        </div>
      )}
    </div>
  );
};

export default StoryComponent;
