export interface NavItem {
	href: string;
	label: string;
	dropdown?: DropdownItem[];
}

export interface DropdownItem {
	href: string;
	label: string;
}

export interface DropdownProps {
	isOpen: boolean;
	items: DropdownItem[];
	backgroundColor: string;
	textColor: string;
}

export interface HeaderProps {
	theme: "black" | "white";
	textColor?: string;
}
