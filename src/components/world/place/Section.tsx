import BigSection from "./BigSection";
import SmallSection from "./SmallSection";
import { placeData } from "../worldData";

const Section = () => {
  return (
    <div className="grid grid-cols-1 justify-center align-middle">
      <SmallSection
        title={placeData[0]?.title}
        smallTitle={placeData[0]?.smallTitle}
        image={placeData[0]?.image}
      />
      <BigSection />
      <SmallSection
        title={placeData[1]?.title}
        smallTitle={placeData[1]?.smallTitle}
        image={placeData[1]?.image}
      />
    </div>
  );
};

export default Section;
