import type { SearchBarProps } from "@/types/product-type";
import type React from "react";
import { useState } from "react";

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		setSearchQuery(query);
	};

	return (
		<div className="flex space-x-2 p-4">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="border px-4 py-2"
			/>
			<button
				type="button"
				onClick={handleSearch}
				className="bg-blue-500 px-4 py-2 text-white"
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
