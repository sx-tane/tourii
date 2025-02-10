import type { NavItem } from "@/types/header-type";

export const navigationSignedOut: NavItem[] = [
	{ href: "/about", label: "ABOUT" },
	{ href: "/world", label: "TOURIIVERSE" },
	{ href: "/character", label: "CHARACTER" },
	{ href: "/touriiverse", label: "STORY" },
	{ href: "/model-route", label: "MODEL ROUTE" },
	// { href: "/model-route", label: "MODEL ROUTE" },
	{
		href: "/social",
		label: "SOCIAL MEDIA",
		dropdown: [
			{ href: "https://twitter.com/TouriiJP", label: "X" },
			{ href: "https://discord.gg/fsyS822VYn", label: "DISCORD" },
		],
	},
	// { href: "/login", label: "CONNECT"},
];

export const navigationSignedIn: NavItem[] = [
	{ href: "/about", label: "ABOUT" },
	{ href: "/world", label: "TOURIIVERSE" },
	{ href: "/touriiverse", label: "STORY" },
	{ href: "/character", label: "CHARACTER" },
	{ href: "/model-route", label: "MODEL ROUTE" },
	// { href: "/bonjin-bazaar", label: "MARKETPLACE" },
	{ href: "/profile", label: "PROFILE" },
	{
		href: "/social",
		label: "SOCIAL MEDIA",
		dropdown: [
			{ href: "https://twitter.com/TouriiJP", label: "X" },
			{ href: "https://discord.gg/fsyS822VYn", label: "DISCORD" },
		],
	},
	// { href: "/login", label: "CONNECT" },
];

export const hamburgerNavigationSignedOut: NavItem[] = [
	{ href: "/about", label: "ABOUT" },
	{ href: "/world", label: "TOURIIVERSE" },
	{ href: "/character", label: "CHARACTER" },
	{ href: "/touriiverse", label: "STORY" },
	{ href: "/model-route", label: "MODEL ROUTE" },
	{ href: "https://linktr.ee/touriijp", label: "LINKTREE" },
	// { href: "/model-route", label: "MODEL ROUTE" },
	// { href: "/bonjin-bazaar", label: "MARK
	// { href: "https://twitter.com/TouriiJP", label: "X" },
	// {
	// 	href: "https://discord.gg/fsyS822VYn",
	// 	label: "DISCORD",
	// },
];

export const hamburgerNavigationSignedIn: NavItem[] = [
	{ href: "/about", label: "ABOUT" },
	{ href: "/world", label: "TOURIIVERSE" },
	{ href: "/touriiverse", label: "STORY" },
	{ href: "/model-route", label: "MODEL ROUTE" },
	// { href: "/bonjin-bazaar", label: "MARKETPLACE" },
	{ href: "/profile", label: "PROFILE" },
	{ href: "https://twitter.com/TouriiJP", label: "X" },
	{
		href: "https://discord.gg/fsyS822VYn",
		label: "DISCORD",
	},
];
