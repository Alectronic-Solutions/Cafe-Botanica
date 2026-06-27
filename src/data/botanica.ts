import type { Gathering, MenuCategory, OperatingHours } from "@/types";

export const cafeName = "Cafe Botanica";
export const cafeAddress = "118 Greenhouse Row, Old Fourth Ward";
export const cafeCity = "Atlanta";
export const cafeRegion = "GA";
export const cafePostal = "30307";
export const cafeCountry = "US";
export const cafePhone = "+14045550174";
export const cafeUrl = "https://cafebotanica.com";
export const established = 1974;

export const menu: MenuCategory[] = [
  {
    name: "Morning",
    note: "Served from open until the light shifts off the counter.",
    items: [
      {
        name: "House Espresso",
        description: "Two ounces, pulled short. Cane sugar on the side.",
        price: 4,
        isAvailable: true,
      },
      {
        name: "Linen Latte",
        description: "Espresso and steamed milk, no flavoring, dusted with nutmeg.",
        price: 6,
        tag: "house favorite",
        isAvailable: true,
      },
      {
        name: "Soft Scramble",
        description: "Three eggs, cultured butter, chives, sourdough toast.",
        price: 11,
        isAvailable: true,
      },
      {
        name: "Steel-Cut Oats",
        description: "Slow oats, stewed apple, toasted walnut, a little cream.",
        price: 8,
        isAvailable: true,
      },
    ],
  },
  {
    name: "Midday",
    note: "Plates land between eleven and three.",
    items: [
      {
        name: "Garden Tartine",
        description: "Whipped ricotta, shaved radish, herbs, olive oil on rye.",
        price: 13,
        isAvailable: true,
      },
      {
        name: "Lentil Bowl",
        description: "Braised lentils, roasted carrot, yogurt, charred lemon.",
        price: 14,
        isAvailable: true,
      },
      {
        name: "Pressed Ham",
        description: "Country ham, gruyere, grain mustard, pickled onion.",
        price: 13,
        isAvailable: true,
      },
      {
        name: "Market Soup",
        description: "Whatever the farm sent that morning. Ask the counter.",
        price: 9,
        isAvailable: true,
      },
    ],
  },
  {
    name: "Bakery",
    note: "Baked overnight. When it runs out, it runs out.",
    items: [
      {
        name: "Cardamom Bun",
        description: "Laminated dough, ground cardamom, pearl sugar.",
        price: 5,
        tag: "sells out early",
        isAvailable: true,
      },
      {
        name: "Olive Oil Cake",
        description: "Citrus zest, almond flour, a thin sugar crust.",
        price: 6,
        isAvailable: true,
      },
      {
        name: "Seeded Loaf",
        description: "Whole grain, long ferment, sunflower and flax. Whole or half.",
        price: 9,
        isAvailable: true,
      },
      {
        name: "Dark Cookie",
        description: "Rye flour, bittersweet chocolate, flaked salt.",
        price: 4,
        isAvailable: true,
      },
    ],
  },
  {
    name: "Botanicals",
    note: "Steeped, pressed, and shaken. None of it is coffee.",
    items: [
      {
        name: "Nettle Tea",
        description: "Stinging nettle and mint, steeped seven minutes.",
        price: 5,
        isAvailable: true,
      },
      {
        name: "Tonic & Shrub",
        description: "House berry shrub, tonic, rosemary, over ice.",
        price: 7,
        isAvailable: true,
      },
      {
        name: "Chamomile Soda",
        description: "Cold-steeped chamomile, lemon, light fizz.",
        price: 6,
        isAvailable: true,
      },
      {
        name: "Greenhouse Cordial",
        description: "Seasonal flower cordial cut with sparkling water.",
        price: 7,
        isAvailable: true,
      },
    ],
  },
];

export const gatherings: Gathering[] = [
  {
    title: "Single-Origin Tasting",
    date: "2026-07-09",
    time: "18:30",
    seats: 12,
    detail: "Four roasts from one Ethiopian farm, poured side by side.",
  },
  {
    title: "Bread & Butter Supper",
    date: "2026-07-23",
    time: "19:00",
    seats: 16,
    detail: "A long table, three loaves, cultured butter, and soup.",
  },
  {
    title: "Cordial Workshop",
    date: "2026-08-06",
    time: "17:00",
    seats: 10,
    detail: "Build a flower cordial at the counter and take a bottle home.",
  },
];

export const hours: OperatingHours = {
  schedule: [
    { day: "Mon", open: "07:00", close: "15:00" },
    { day: "Tue", open: "07:00", close: "15:00" },
    { day: "Wed", open: "07:00", close: "15:00" },
    { day: "Thu", open: "07:00", close: "18:00" },
    { day: "Fri", open: "07:00", close: "18:00" },
    { day: "Sat", open: "08:00", close: "18:00" },
    { day: "Sun", open: null, close: null },
  ],
  note: "Kitchen closes thirty minutes before the room does.",
};
