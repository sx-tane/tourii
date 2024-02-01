import { type ChapterSelection } from "@/types/interfaceStory";

type ChapterSelectionButtonProps = {
  selection: ChapterSelection;
  onSelect: (selectedStoryId: string) => void;
};

const ChapterSelectionButton: React.FC<ChapterSelectionButtonProps> = ({
  selection,
  onSelect,
}) => {
  return (
    <div className="space-y-2 px-8 py-7 pt-8 text-center">
      {" "}
      {/* Adjust px-8 as needed */}
      <div className="text-xs font-semibold uppercase tracking-widest text-charcoal">
        {selection.chapter}
      </div>
      {/* Container for the line and the button */}
      <div className="relative -mx-8 flex justify-center py-2">
        {/* Line behind the button */}
        <div
          className="absolute left-0 z-0 h-0.5 w-full bg-charcoal "
          style={{ top: "50%", transform: "translateY(-50%)" }}
        ></div>
        {/* Button */}
        <button
          onClick={() => onSelect(selection.selectedChapterId ?? "")}
          className={`relative z-10 h-4 w-4 rounded-full border-2 border-charcoal transition-all duration-300 ${selection.isSelected ? "bg-red" : "bg-warmGrey hover:bg-red"}`}
        />
      </div>
      <div className="w-96 text-sm font-bold uppercase tracking-widest">
        {selection.placeName}
      </div>
    </div>
  );
};

export default ChapterSelectionButton;
