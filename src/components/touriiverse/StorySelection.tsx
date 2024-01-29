import { type StorySelection } from "@/types/interfaceStory";

type StorySelectionButtonProps = {
  selection: StorySelection;
  onSelect: (selectedStoryId: string) => void;
};

const StorySelectionButton: React.FC<StorySelectionButtonProps> = ({
  selection,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(selection.selecedStoryId ?? "")}
      className={`relative z-10 h-28 w-96 rounded-lg font-bold uppercase tracking-widest text-charcoal transition-all duration-300 lg:text-2xl ${selection.isSelected ? "bg-warmGrey3 text-warmGrey" : "bg-warmGrey hover:bg-warmGrey2"}`}
    >
      {selection.title !== "Coming Soon" ? (
        <div className="absolute left-6 top-4">{selection.title}</div>
      ) : (
        <div
          className={`absolute left-6 top-4 font-semibold capitalize italic lg:text-lg ${selection.isSelected ? "text-warmGrey" : "text-warmGrey3"}`}
        >
          {selection.title}
        </div>
      )}
      {selection.chapterNumber ? (
        <div className="absolute bottom-4 right-6 text-sm font-normal capitalize italic tracking-widest text-charcoal">
          {selection.chapterNumber} Chapters
        </div>
      ) : null}
    </button>
  );
};

export default StorySelectionButton;
