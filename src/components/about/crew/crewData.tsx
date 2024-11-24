export type CrewInfoProps = {
	profileImage: string;
	name: string;
	title: string;
	description: string;
	twiiterHandle: string;
	twitterLink?: string;
};

export const crewData: CrewInfoProps[] = [
	{
		profileImage: "/image/about/crew/sx.png",
		name: "SX",
		title: "boss",
		description: "Also the CTO & a Ramen enthusiast.",
		twiiterHandle: "@0xRamenRider",
		twitterLink: "https://twitter.com/0xRamenRider",
	},
	{
		profileImage: "/image/about/crew/0x8tails.png",
		name: "0x8Tails",
		title: "talesmith",
		description: "An adept Japan travel planner & self-proclaimed mythologist.",
		twiiterHandle: "@0x8Tails",
		twitterLink: "https://twitter.com/0x8tails",
	},
	{
		profileImage: "/image/about/crew/0xlucid.png",
		name: "Lucid",
		title: "partnership maestro",
		description: "A jack-of-all-trades in the world of connections.",
		twiiterHandle: "@0xLucid",
		twitterLink: "https://twitter.com/0xLucid",
	},
	{
		profileImage: "/image/about/crew/yolk.png",
		name: "Yolk",
		title: "community builder / x",
		description:
			"A Buddhist who loves nasi lemak, teh ice and Japanese folklore.",
		twiiterHandle: "@isyolkleh",
		twitterLink: "https://twitter.com/isyolkleh",
	},
	{
		profileImage: "/image/about/crew/fc.png",
		name: "FC",
		title: "community builder / discord",
		description:
			"Born with a controller as the 5th limb, I'm 99.999999999% RPG-obsessed! Hoho!",
		twiiterHandle: "@Yoho_FC",
		twitterLink: "https://twitter.com/Yoho_FC",
	},
	{
		profileImage: "/image/about/crew/nakano.png",
		name: "Nakano Ryo",
		title: "Illustrator",
		description: "A toy designer who never outgrew toys and heroes.",
		twiiterHandle: "@omotyazukiyasan",
		twitterLink: "https://twitter.com/omotyazukiyasan",
	},
	// {
	//   profileImage: "/image/about/crew/tony.png",
	//   name: "Tony",
	//   title: "Software scientiest",
	//   description: "Coding cells for world dominations.",
	//   twiiterHandle: "@Tonyxxx1x",
	//   twitterLink: "https://twitter.com/Tonyxxx1x",
	// },
];
