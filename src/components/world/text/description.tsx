import ReactMarkdown from "react-markdown";

const DescriptionWorld = ({ data }: { data: string }) => {
	return (
		<div className="mb-10 mt-10 whitespace-pre-line px-2 text-center text-sm font-medium tracking-normal text-warmGrey3 md:text-base">
			<ReactMarkdown>{data}</ReactMarkdown>
		</div>
	);
};

export default DescriptionWorld;
