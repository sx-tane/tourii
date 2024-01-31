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
    <button
      onClick={() => onSelect(selection.selectedChapterId ?? "")}
      className={`relative z-10 h-28 w-96 flex-shrink-0 transform rounded-lg text-left font-bold uppercase tracking-widest text-charcoal transition-all duration-300 lg:text-xl ${selection.isSelected ? "bg-warmGrey3 text-warmGrey" : "bg-warmGrey hover:bg-warmGrey2"}`}
    >
      <div className="absolute left-6 top-4">{selection.placeName}</div>
      <div className="absolute bottom-4 right-6 text-sm font-medium capitalize italic tracking-widest text-charcoal">
        {selection.chapter}
      </div>
    </button>
  );
};

export default ChapterSelectionButton;
