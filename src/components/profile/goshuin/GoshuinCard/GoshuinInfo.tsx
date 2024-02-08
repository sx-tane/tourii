import { type TravelGoshuin } from "@/types/interfaceProfile";
import Image from "next/image";

interface GoshuinInfoProps {
  goshuin: TravelGoshuin | undefined;
}

const GoshuinInfo: React.FC<GoshuinInfoProps> = ({ goshuin }) => {
  return (
    <div className="flex w-full">
      <div className="h-full w-8/12">
        <div>{goshuin?.goshuinId}</div>
        <div>{goshuin?.goshuinName}</div>
        <div>{goshuin?.goshuinLocation}</div>
        <div>{goshuin?.goshuinDescription}</div>
        <div>Acquired On:{goshuin?.goshuinDate}</div>
        <div>Expiring On:{goshuin?.goshuinExpiryDate}</div>
      </div>
      <div className="h-full w-4/12">
        <Image
          src={goshuin?.perksImage ?? ""}
          alt="perks"
          width={1000}
          height={1000}
          priority={true}
          className="aspect-square h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default GoshuinInfo;
