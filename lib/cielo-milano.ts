export const cieloMilanoBrand = {
  name: "Cielo Milano",
  tagline: "Alta moda · Milano",
  city: "Via Montenapoleone, Milano",
} as const;

export type CieloGarment = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  previewOffset: string;
  productImage: string;
  video: string;
  videoPrompt: string;
  colors: { id: string; label: string; hex: string; tint: string }[];
};

export const cieloGarments: CieloGarment[] = [
  {
    id: "abito-seta",
    name: "Abito in seta",
    category: "Donna",
    price: "€ 1.280",
    image: "/images/cielo-milano/vestido.jpg",
    productImage: "/images/cielo-milano/vestido.jpg",
    video: "/videos/cielo-milano/abito-seta.mp4",
    videoPrompt:
      "Cinematic fashion runway, a model walks elegantly in a flowing silk evening dress, slow motion, soft studio lighting, marble floor, atelier Milano, Vogue editorial style",
    previewOffset: "translate-y-[8%] scale-[0.92]",
    colors: [
      { id: "champagne", label: "Champagne", hex: "#e8dcc8", tint: "sepia-[0.15]" },
      { id: "nero", label: "Nero", hex: "#1a1410", tint: "brightness-[0.55]" },
      { id: "borgogna", label: "Borgogna", hex: "#6b2d3c", tint: "hue-rotate-[320deg]" },
    ],
  },
  {
    id: "cappotto-cashmere",
    name: "Cappotto cashmere",
    category: "Unisex",
    price: "€ 2.450",
    image: "/images/cielo-milano/abrigo.jpg",
    productImage: "/images/cielo-milano/abrigo.jpg",
    video: "/videos/cielo-milano/cappotto-cashmere.mp4",
    videoPrompt:
      "Cinematic fashion film, a model walks confidently through a Milan piazza wearing a long cashmere coat that sways in the wind, slow motion, golden hour light, editorial high fashion",
    previewOffset: "translate-y-[2%] scale-[0.95]",
    colors: [
      { id: "camel", label: "Camel", hex: "#c4a574", tint: "sepia-[0.2]" },
      { id: "antracite", label: "Antracite", hex: "#3d3a38", tint: "brightness-[0.7]" },
      { id: "avorio", label: "Avorio", hex: "#f0ebe3", tint: "brightness-[1.05]" },
    ],
  },
  {
    id: "camicia-lino",
    name: "Camicia in lino",
    category: "Uomo",
    price: "€ 420",
    image: "/images/cielo-milano/camisa.jpg",
    productImage: "/images/cielo-milano/camisa.jpg",
    video: "/videos/cielo-milano/camicia-lino.mp4",
    videoPrompt:
      "Cinematic fashion editorial, a model walks calmly along a sunlit Italian terrace wearing a crisp linen shirt, slow motion, natural breeze, warm Mediterranean light, Vogue Italia style",
    previewOffset: "translate-y-[12%] scale-[0.88]",
    colors: [
      { id: "bianco", label: "Bianco", hex: "#f7f5f0", tint: "brightness-[1.1]" },
      { id: "azzurro", label: "Azzurro cielo", hex: "#9eb8c4", tint: "hue-rotate-[180deg]" },
      { id: "sabbia", label: "Sabbia", hex: "#d4c4a8", tint: "sepia-[0.25]" },
    ],
  },
  {
    id: "gonna-pizzo",
    name: "Gonna in pizzo",
    category: "Donna",
    price: "€ 890",
    image: "/images/cielo-milano/falda.jpg",
    productImage: "/images/cielo-milano/falda.jpg",
    video: "/videos/cielo-milano/gonna-pizzo.mp4",
    videoPrompt:
      "Cinematic fashion runway, a model walks gracefully in a delicate lace skirt that swirls around her legs, slow motion, soft pastel studio backdrop, haute couture editorial",
    previewOffset: "translate-y-[18%] scale-[0.85]",
    colors: [
      { id: "panna", label: "Panna", hex: "#f5efe6", tint: "brightness-[1.08]" },
      { id: "rosa", label: "Rosa cipria", hex: "#d4a5a5", tint: "hue-rotate-[350deg]" },
      { id: "notte", label: "Blu notte", hex: "#1e2a3a", tint: "brightness-[0.5] hue-rotate-[200deg]" },
    ],
  },
];

export const cieloSizes = ["38", "40", "42", "44", "46"] as const;
