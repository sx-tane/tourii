import { type Product } from "@/types/interface";
let number = 0;

function generateProductId() {
  number = number + 1;
  return `p${number}`;
}

export const productsData: Product[] = [
  {
    productId: generateProductId(),
    name: "Harajiri Falls Boat Experience",
    description:
      "Powerful boat experience where you can get splashed directly under the waterfall. You can also enjoy the scenery of the Harajiri Falls from the boat.",
    image: "/image/bonjin-bazaar/experience/Harajiri-Falls-Boat-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 7000,
  },
  {
    productId: generateProductId(),
    name: "Taizako Canyon River Trekking",
    description:
      "There are many points where you can play to your heart's content, such as getting hit by waterfalls, entering caves, and jumping. It's also a fun experience to just relax and watch the sky and surrounding trees while flowing leisurely.",
    image: "/image/bonjin-bazaar/experience/Taizako-Canyon-River-Trekking.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 2500,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Tent Sauna Experience",
    description:
      "Outdoor sauna using a Finnish-style tent sauna. After the sauna, jump into the Okutake River right in front of you to cool down.",
    image:
      "/image/bonjin-bazaar/experience/Lodge-Kiyokawa-Tent-Sauna-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2500,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Packraft Experience",
    description:
      "Explore the emerald green clear stream in front of Lodge Kiyokawa by boat.",
    image:
      "/image/bonjin-bazaar/experience/Lodge-Kiyokawa-Packraft-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2000,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Okudake Fishing",
    description:
      "River fishing experience using the handmade 'bamboo rod' made by locals.",
    image: "/image/bonjin-bazaar/experience/Lodge-Kiyokawa-Okudake-Fishing.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Campfire Experience",
    description:
      "Fun companion for the night. You can experience a campfire. It's a set of homemade firewood and a brazier.",
    image:
      "/image/bonjin-bazaar/experience/Lodge-Kiyokawa-Campfire-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2000,
  },
  {
    productId: generateProductId(),
    name: "Inazumi Underwater Cave Tent Sauna Experience",
    description:
      "After the sauna, soak in a unique stalactite cave water bath for a refreshing experience.",
    image:
      "/image/bonjin-bazaar/experience/Inazumi-Underwater-Cave-Tent-Sauna-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 9000,
  },
  {
    productId: generateProductId(),
    name: "Inazumi Underwater Cave Snorkeling",
    description: "Explore the underwater cave with a snorkel and fins set",
    image:
      "/image/bonjin-bazaar/experience/Inazumi-Underwater-Cave-Snorkeling.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 7500,
  },
  {
    productId: generateProductId(),
    name: "Inazumi Underwater Cave Scuba Diving",
    description:
      "Anyone from 10-year-old children can experience it. Experience diving in the waterway that flows out from the inside of the cave about 20m from the entrance of the stalactite cave.",
    image:
      "/image/bonjin-bazaar/experience/Inazumi-Underwater-Cave-Scuba-Diving.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 25000,
  },
  {
    productId: generateProductId(),
    name: "Rental Bicycle",
    description:
      "Rental bicycle for sightseeing in the Bungo-Ono area at Hotel Masunoi.",
    image: "/image/bonjin-bazaar/experience/Rental-Bicycle.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1500,
  },
  {
    productId: generateProductId(),
    name: "Aji Meditation Experience",
    description:
      "Experience one of the Shingon sect's meditations, 'Ajikan', alongside the cliff Buddhas. Required time is about 1 and a half hours.",
    image: "/image/bonjin-bazaar/experience/Aji-Meditation-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Asaji",
      bungoOnoAreaColor: "#C30E23",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Rice Cooking Experience with a Traditional Stove",
    description:
      "Experience cooking rice with a hearth in a brewery that is about 120 years old. Shochu tasting is also possible.",
    image: "/image/bonjin-bazaar/experience/Rice-Cooking-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Asaji",
      bungoOnoAreaColor: "#C30E23",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Baby Leaf Harvesting Experience",
    description:
      "Experience harvesting baby leaves at a farm in the Bungo-Ono area. You can harvest and eat as much as you want. You can also take it home with you.",
    image:
      "/image/bonjin-bazaar/experience/Baby-Leaf-Harvesting-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "REBUILD SAUNA",
    description:
      "You can experience a genuine Finnish sauna with self-rowing while feeling the four seasons.",
    image: "/image/bonjin-bazaar/experience/REBUILD-SAUNA.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Tuuli Tuuli",
    description:
      "You can experience a genuine Finnish sauna with self-rowing while feeling the four seasons.",
    image: "/image/bonjin-bazaar/experience/Tuuli-Tuuli.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Strawberry Picking Experience",
    description:
      "Strawberry picking experience at Akkirakkira Farm. You can eat as much as you want while picking.",
    image: "/image/bonjin-bazaar/experience/Strawberry-Picking-Experience.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1200,
  },
  {
    productId: generateProductId(),
    name: "Sweet Potato Soft Serve Ice Cream",
    description:
      "This roadside market main specialties is the Sweet Potato Soft Serve Ice Cream made using sweet potatoes, which are a local specialty of Mie Town. They offer seven different flavors of soft-serve ice cream",
    image:
      "/image/bonjin-bazaar/merchandise/Sweet-Potato-Soft-Serve-Ice-Cream.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 350,
  },
  {
    productId: generateProductId(),
    name: "Local shochu collaborated chocolate bars",
    description:
      "Perfect for gifts. Satsumaimo (Japanese Sweet Potato) and shochu chocolate bars combine the shochu from two local breweries (Muretsuru Shuzo and Fujiigata Shuzo) in Bungo-ono City with the locally grown specialty, Satsumaimo. The pairing of sweet potatoes nurtured in the rich soil of 'Bungo-ono, Oita's Vegetable Garden' and shochu produced in this region offers a deep and sophisticated flavor.",
    image: "/image/bonjin-bazaar/merchandise/Chocolate-Bar.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 2000,
  },
  {
    productId: generateProductId(),
    name: "Clean Peach",
    description: `In Kiyokawa Town, they produce a 'miracle peach' known as the *Clean Peach*, which is incredibly sweet. *Clean Peach* is the trademarked brand name for peaches from Kiyokawa Town. Compared to regular peaches, *Clean Peaches* have a sugar content that is about 2 degrees higher, with the best ones having a sugar content of around 16-17 degrees.`,
    image: "/image/bonjin-bazaar/merchandise/Clean-Peach.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2000,
  },
  {
    productId: generateProductId(),
    name: "Okazupiman",
    description: `Bungo-Ono City is one of the leading producers of summer and autumn bell peppers in Japan, and it\'s the largest region in western Japan for bell pepper production. "Okazupiman" is a versatile sauce made by local mothers from Ogata Town by combining bell peppers with dried shiitake mushrooms and rice koji, carefully prepared.`,
    image: "/image/bonjin-bazaar/merchandise/Okazupiman.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "Tea-Flavored Wild Boar meat",
    description: `The local game meat, captured and processed by two sisters who are hunters, is simmered and seasoned with locally produced tea to create "紅茶いのしし" (Tea-Flavored Wild Boar). This product is available for sale at places like "Michi-no-Eki Asaji" and "Michi-no-Eki Oono" and has become quite popular.`,
    image: "/image/bonjin-bazaar/merchandise/Tea-Flavoured-Boar-Meat.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Asaji",
      bungoOnoAreaColor: "#C30E23",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "Oita Dried Shiitake and Onion Infinite Sauce",
    description: `The "Oita Dried Shiitake and Onion Infinite Sauce" is a flavorful dressing made from locally sourced Oita Prefecture dried shiitake mushrooms and domestically grown onions. It received the Bronze Award at the 1st Dressing Championship in 2023. The dressing showcases the abundant umami of dried shiitake mushrooms and is suitable for various dishes, using all shiitake mushrooms, including the broken ones during packaging, to minimize waste.`,
    image:
      "/image/bonjin-bazaar/merchandise/Oita-Dried-Shiitake-and-Onion-Infinite-Sauce.webp",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 648,
  },
  {
    productId: generateProductId(),
    name: "Bungo Ono Miso",
    description: `A no-additive miso made using only domestically sourced ingredients, including soybeans from Bungo-Ōno City. The ingredients consist of only three elements: "barley malt," "soybeans," and "salt." The one with wheat malt is sweet and highly nutritious, while the one with nigari is popular for its mildness. It is a safe and trustworthy miso used in school lunches in the city.`,
    image: "/image/bonjin-bazaar/merchandise/Bungo-Ono-Miso.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 0,
  },
  {
    productId: generateProductId(),
    name: "Nakamachi Seika Sweets and Confectioneries",
    description: `"Nakamachi Seika" is a long-established confectionery shop founded in Taisho 8 (1919). Their luxurious Japanese sweet, "Kakinomi" is made by carefully kneading sweet red bean paste and gyuhi (soft mochi) into dried persimmons. It has received the "Minister's Honor Award" at the National Confectionery Grand Expo. In addition to their well-loved specialties, "Inukai Ayu" and "Wakayu," they also offer simple and popular cupcakes."`,
    image: "/image/bonjin-bazaar/merchandise/Nakamachi-Seika.jpg",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 0,
  },
];
