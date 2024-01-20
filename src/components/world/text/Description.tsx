import ReactMarkdown from "react-markdown";

const data: string =
  "Embark on a journey to the Touriiverse, where timeless myths and today's Japan converge in a tapestry of fantasy. Explore three enchanted realms: the exalted ***Takagamahara*** above, the serene ***Ashihara no Nakatsukuni*** below, and the mysterious ***Yomitsukuni***, where spirits linger.\n\nVenture across the divine Ame No Ukihashi or tread along the shadowed Yomotsu Hirasaka, pathways to worlds unknown. In this land, Amatsukami, Kunitsukami, Bonjin, Yomitsukami and Yokai coexist, weaving stories of old into the fabric of the present.";

const DescriptionWorld = () => {
  return (
    <div className="mb-10 mt-10 whitespace-pre-line px-2 text-center text-sm font-medium tracking-normal text-warmGrey3 md:mb-10 md:mt-20 md:text-base">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
};

export default DescriptionWorld;
