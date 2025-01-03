import { locationData } from "@/lib/data/marketplace/location-data";
import type { FilterProps } from "@/types/product-type";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const FilterDropdown: React.FC<FilterProps> = ({ setFilter }) => {
	const [activeFilter, setActiveFilter] = useState("All");

	const handleFilterChange = (filter: string) => {
		setFilter(filter);
		setActiveFilter(filter);
	};

	return (
		<Menu as="div" className="relative z-10 inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-transparent text-sm font-bold uppercase tracking-widest text-warmGrey3">
					{activeFilter}
					<ChevronDownIcon
						className="-mr-1 h-4 w-4 font-bold text-warmGrey3"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-warmGrey shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{locationData.map((item) => (
							<Menu.Item key={item}>
								{({ active }) => (
									<button
										type="button"
										onClick={() => handleFilterChange(item)}
										className={classNames(
											active
												? "cursor-pointer font-bold text-red"
												: "text-charcoal",
											"block w-full text-left px-4 py-2 text-xs font-medium uppercase tracking-widest",
										)}
									>
										{item}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default FilterDropdown;
