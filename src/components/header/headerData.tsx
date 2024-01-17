type NavItem = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
};

type DropdownItem = {
  href: string;
  label: string;
};

export const navigation: NavItem[] = [
  { href: "/about", label: "ABOUT" },
  { href: "/world", label: "WORLD" },
  { href: "/story", label: "STORY" },
  // { href: "/model-route", label: "MODEL ROUTE" },
  {
    href: "/social",
    label: "SOCIAL MEDIA",
    dropdown: [
      { href: "https://twitter.com/TouriiJP", label: "X" },
      { href: "https://discord.com/invite/SAuAgYtCcr", label: "DISCORD" },
    ],
  },
  // { href: "/connect", label: "CONNECT" },
];
