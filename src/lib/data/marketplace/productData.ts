import { type Product } from "@/types/interfaceProduct";

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
    price: 1500,
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
    price: 3500,
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
    price: 5000,
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
  }, // need double check from here
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Crown Jidori Hamburger Set",
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. A hamburger made from 100% Oita Crown Jidori chicken",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1430,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Salted Karaage (Japanese-style fried chicken) Set",
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. A popular choice",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 990,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Crown Jidori Set",
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. Includes a Crown Jidori hamburger, Toriten (Japanese-style tempura), and Ryukyu (Okinawan) sweet potato",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1650,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Crown Jidori Donburi",
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. A steak rice bowl featuring Crown Jidori chicken",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1650,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Crown Jidori Tempura Set",
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. Known for its tender and addictive taste",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1320,
  },
  {
    productId: generateProductId(),
    name: `Oshokuji-dokoro Wakatake restaurant "Unkakure" Omakase Course`,
    description:
      "Oshokuji-dokoro Wakatake is committed to the principles of local production for local consumption, ensuring the use of Oita's premium ingredients, such as Oita Crown Jidori (local chicken brand), A5-grade Oita Wagyu beef, fresh local vegetables, and Oita prefecture's homegrown rice. Their dishes are centered around Japanese cuisine, made without artificial coloring and with a focus on additive-free, lightly seasoned, and body-friendly ingredients, allowing the natural flavors of the materials to shine through. A chef's special course",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 4400,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Ajifurai Teishoku (Horse Mackerel Fry Set)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 880,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Tonkatsu Teishoku (Pork Cutlet Set)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 880,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Toriten Teishoku (Chicken Tempura Set)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 880,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Tempura Teishoku (Tempura Set)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1320,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Ebi Furai Teishoku (Shrimp Fry Set)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1540,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Hanakago Gozen (Basket Meal)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1210,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Wago Gozen (Japanese Meal)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 1540,
  },
  {
    productId: generateProductId(),
    name: "Oshokuji-dokoro Wakatake restaurant Kaiseki (Multi-Course) Menu)",
    description: `Oshokuji-dokoro Wakatake is well-known for its authentic Japanese cuisine, carefully selected fresh fish and meat, seasonal ingredients, and the use of "Oita's Vegetable Fields Bungo-ono" vegetables"`,
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#05913A",
    },
    price: 3300,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Lunch Set (Includes Drink Bar)",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa. Options include Lowry Curry, Korean Cold Noodles, Bibin Cold Noodles, and Stone Pot Bibimbap",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 1300,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Today's Cake",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 700,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Hotteok (a Korean sweet pancake)",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 400,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Kinako Mochi",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 800,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Mango",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Cafe RIFFRAFF Ichigo Milk (Strawberry Milk)",
    description:
      "Cafe RIFFRAFF is located approximately a 3-minute drive from Michi-no-Eki Kiyokawa. It's situated across the Okutake River, just opposite Lodge Kiyokawa",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "Mountain Cafe Michi-no-Pan Café Seasonal Lunch Plate",
    description:
      "Mountain Cafe Michi-no-Pan is a bakery and cafe where a strong emphasis is placed on using carefully selected, high-quality ingredients to craft bread, pastries, and cakes. It's nestled within the bountiful natural surroundings of the region",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 1400,
  },
  {
    productId: generateProductId(),
    name: "Mountain Cafe Michi-no-Pan Café Sandwich Plate",
    description:
      "Mountain Cafe Michi-no-Pan is a bakery and cafe where a strong emphasis is placed on using carefully selected, high-quality ingredients to craft bread, pastries, and cakes. It's nestled within the bountiful natural surroundings of the region",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 860,
  },
  {
    productId: generateProductId(),
    name: "Mountain Cafe Michi-no-Pan Café Special Pizza",
    description:
      "Mountain Cafe Michi-no-Pan is a bakery and cafe where a strong emphasis is placed on using carefully selected, high-quality ingredients to craft bread, pastries, and cakes. It's nestled within the bountiful natural surroundings of the region",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 860,
  },
  {
    productId: generateProductId(),
    name: "Mountain Cafe Michi-no-Pan Café Kids Plate",
    description:
      "Mountain Cafe Michi-no-Pan is a bakery and cafe where a strong emphasis is placed on using carefully selected, high-quality ingredients to craft bread, pastries, and cakes. It's nestled within the bountiful natural surroundings of the region",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 580,
  },
  {
    productId: generateProductId(),
    name: "Mountain Cafe Michi-no-Pan Café French Toast",
    description:
      "Mountain Cafe Michi-no-Pan is a bakery and cafe where a strong emphasis is placed on using carefully selected, high-quality ingredients to craft bread, pastries, and cakes. It's nestled within the bountiful natural surroundings of the region",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 980,
  },
  {
    productId: generateProductId(),
    name: "Historic farmhouse stay and eat Lunch (including coffee and dessert)",
    description:
      "The owners of Mountain Cafe Michi-no-Pan relocated from Tokyo to this tranquil location, where they renovated a historic farmhouse dating back to the Meiji era. The cafe is perched atop a hillside within a small community of about 20 houses, offering picturesque views of Oguni's fertile plains and the distant mountains of Keizan and Soboyama. After grappling with the rugged terrain, the couple cleared the land for fields and created a space to cultivate rice and vegetables right in front of their home. Their menu predominantly features sun-dried rice and fresh, pesticide-free vegetables, allowing visitors to savor the deliciousness of locally grown produce.",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ogata",
      bungoOnoAreaColor: "#920883",
    },
    price: 1250,
  },
  {
    productId: generateProductId(),
    name: "レストラン福寿草 Beef bowl restaurant Asaji Beef Sirloin Specialty Bowl (Zesshin Asajin Don)",
    description:
      "Michi-no-Eki Asaji featuring Asaji Beef, a renowned local specialty. Includes dishes made with Asaji Beef",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Asaji",
      bungoOnoAreaColor: "#C30E23",
    },
    price: 2900,
  },
  {
    productId: generateProductId(),
    name: "レストラン福寿草 Beef bowl restaurant Asaji Beef Yakiniku (Grilled Meat) Set (Asaji Gyukatsu Gozen)",
    description:
      "Michi-no-Eki Asaji featuring Asaji Beef, a renowned local specialty. Includes dishes made with Asaji Beef",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Asaji",
      bungoOnoAreaColor: "#C30E23",
    },
    price: 2250,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Zaru Soba (Cold Soba Noodles) or Kake Soba (Hot Soba Noodles)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 800,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Bukkake Oroshi Soba (Cold Soba with Grated Radish)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 1000,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Tempura Vegetables",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Ebi Mayo (Shrimp Mayonnaise)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 600,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Karaage (Fried Chicken)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 600,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Toriten (Chicken Tempura)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 600,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Gobou Karaage (Fried Burdock)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Renkon Karaage (Fried Lotus Root)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "そば処佐くら restaurant Torimeshi (Chicken Rice)",
    description:
      "The quiet and hidden soba restaurant located in the mountains of northern Ono Town",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Ono",
      bungoOnoAreaColor: "#EA5414",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Local Hamburger and Colorful Salad Plate (Lunchtime Only)",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere. ",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 1200,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Green Curry",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 1100,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Gratin",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 1100,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Peach Parfait",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 900,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Various Parfaits",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere. Options include Chocolate Parfait, Fruit Parfait, Caramel Parfait, Pudding à la Mode, and more",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 800,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Sandwich",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 400,
  },
  {
    productId: generateProductId(),
    name: "カフェグリーンブラウン café Mini Parfait",
    description:
      "This popular cafe with over 10,000 Instagram followers offers a charming setting surrounded by nature, featuring a lovely exterior and a bright interior with wooden counter seats and table settings, creating a relaxing atmosphere",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Chitose",
      bungoOnoAreaColor: "#8FC320",
    },
    price: 500,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Salt-Grilled Ayu Set Meal",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 1880,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Salt-Grilled Ayu and Sweet Simmered Ayu Set Meal",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 2740,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Grilled Eel Set Meal (Unagi Kabayaki)",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 2680,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Unagi Donburi (Grilled Eel on Rice)",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 1680,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Ono River Delight (Salt-Grilled Ayu and Grilled Eel)",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 3560,
  },
  {
    productId: generateProductId(),
    name: "割烹大野川 restaurant Ayu Feast Set Meal (Seasonal Special)",
    description:
      "割烹大野川, formerly known as Inoue-tei, is a traditional Japanese restaurant that specializes in dishes featuring salt-grilled ayu, a type of sweetfish, caught in the Ono River. With over a century of history, this establishment is well-known for offering a variety of ayu-based dishes",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Inukai",
      bungoOnoAreaColor: "#F8B62C",
    },
    price: 3550,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Tree Hut",
    description: "Capacity: 2 guests. Room only",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 7700,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Log House",
    description: "Capacity: 1 guest (Twin)",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 8800,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Cabin House",
    description: "Capacity: 4 guests",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 44000,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Bungo Beef Sirloin Course",
    description: "Included tax",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 4650,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Bungo Chicken",
    description: "Included tax",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2420,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa BBQ Facility Usage",
    description: "Price per guest",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 400,
  },
  {
    productId: generateProductId(),
    name: "Lodge Kiyokawa Rental BBQ Set",
    description: "Mie",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Kiyokawa",
      bungoOnoAreaColor: "#0E6EB8",
    },
    price: 2000,
  },
  {
    productId: generateProductId(),
    name: "Harajiri Waterfall Station Restaurant Shira-taki",
    description: "Waterfall Basket Meal",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#920883",
    },
    price: 1600,
  },
  {
    productId: generateProductId(),
    name: "Bungo Ono Shiitake Mushrooms",
    description: "Highest priced item",
    image: "/image/bonjin-bazaar/merchandise/shiitake.png",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#920883",
    },
    price: 1500,
  },
  {
    productId: generateProductId(),
    name: "Bungo Ono Shiitake Mushrooms",
    description: "Premium range",
    image: "/image/bonjin-bazaar/merchandise/shiitake-high.png",
    category: {
      productType: "Merchandise",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#920883",
    },
    price: 3000,
  },
  {
    productId: generateProductId(),
    name: "Bungo Ono Station Farmhouse Inn Matsumoto",
    description:
      "2 Days 1 Night (including breakfast and dinner). Gibier Style Catering. Takekiya Sake Present",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#920883",
    },
    price: 22000,
  },
  {
    productId: generateProductId(),
    name: "Asayake",
    description:
      "2 Days 1 Night (including breakfast and dinner). Gibier Style Catering. Takekiya Sake Present",
    image: "/image/about/tourii_main.png",
    category: {
      productType: "Experience",
      bungoOnoArea: "Mie",
      bungoOnoAreaColor: "#920883",
    },
    price: 22000,
  },
];
