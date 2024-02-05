import { type RouteDetails } from "@/types/interfaceModelRoute";
import Image from "next/image";
import Link from "next/link";

interface IntroUpperSectionProps {
  routeDetails: RouteDetails;
}

const IntroUpperSection: React.FC<IntroUpperSectionProps> = ({
  routeDetails,
}) => {
  return (
    <div className="mt-20">
      <div className="mb-2 text-sm font-medium uppercase tracking-widest">
        {routeDetails.stop}
      </div>
      {/* <Markdown className="mx-auto mb-5 flex h-16 w-16 items-center justify-center whitespace-pre-wrap rounded-full border-[1.5px] border-red text-sm font-bold leading-none text-red">
        {routeDetails.routeDetailTime}
      </Markdown> */}
      <div className="text-3xl font-bold uppercase tracking-widest">
        {routeDetails.routeDetailName}
      </div>
      <div className="mt-2 text-base font-medium tracking-widest">
        {routeDetails.routeDetailStoryTitle}
      </div>
      <div className="relative mt-10">
        <Image
          src={routeDetails.routeDetailBigImage}
          alt={routeDetails.routeDetailName}
          width={500}
          height={500}
          priority={true}
          className=" mx-auto h-[30vh] w-8/12 rounded-full object-cover brightness-90 xl:w-4/12"
        />
        <Link
          className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold tracking-widest text-warmGrey transition-all duration-300 hover:bg-red"
          href={routeDetails?.visualNovelLink}
        >
          Revisit the story
        </Link>
      </div>
    </div>
  );
};

export default IntroUpperSection;
