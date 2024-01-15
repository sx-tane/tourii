export type CharacterProps = {
  name?: string;
  image?: string;
  description?: string;
};

export const characters: CharacterProps[] = [
  {
    name: "Ninigi no Mikoto",
    image: "/image/story/Ninigi.png",
    description: "This is a description of Character One.",
  },
  {
    name: "Ameno Uzume no Mikoto",
    image: "/image/story/Uzume.png",
    description: "This is a description of Character Two.",
  },
];
