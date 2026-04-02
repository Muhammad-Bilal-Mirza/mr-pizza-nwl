import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED_DIR = path.join(__dirname, "../src/frontend/public/assets/generated");

// Ensure directory exists
await fs.mkdir(GENERATED_DIR, { recursive: true });

// Create placeholder images with different colors for each pizza
const pizzas = [
  { name: "pizza-margherita.dim_400x400.jpg", color: "#22c55e", label: "Margherita" },
  { name: "pizza-pepperoni.dim_400x400.jpg", color: "#ef4444", label: "Pepperoni" },
  { name: "pizza-truffle.dim_400x400.jpg", color: "#78350f", label: "Truffle" },
  { name: "pizza-bbq-chicken.dim_400x400.jpg", color: "#d97706", label: "BBQ Chicken" },
  { name: "hero-pizza.dim_1600x900.jpg", color: "#f59e0b", label: "Hero Pizza" },
];

console.log("🍕 Generating placeholder pizza images...\n");

for (const pizza of pizzas) {
  const filePath = path.join(GENERATED_DIR, pizza.name);
  const size = pizza.name.includes("hero") ? { width: 1600, height: 900 } : { width: 400, height: 400 };
  
  // Create SVG image with text
  const svg = `
    <svg width="${size.width}" height="${size.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${pizza.color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustBrightness(pizza.color, -20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size.width}" height="${size.height}" fill="url(#grad)"/>
      <circle cx="${size.width / 2}" cy="${size.height / 2}" r="${Math.min(size.width, size.height) / 2.5}" fill="rgba(255,255,255,0.1)"/>
      <text x="${size.width / 2}" y="${size.height / 2 - 20}" text-anchor="middle" font-size="48" font-weight="bold" fill="white" font-family="Arial">${pizza.label}</text>
      <text x="${size.width / 2}" y="${size.height / 2 + 40}" text-anchor="middle" font-size="24" fill="rgba(255,255,255,0.8)" font-family="Arial">🍕</text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(filePath);
    console.log(`✓ Created ${pizza.name}`);
  } catch (error) {
    console.error(`✗ Failed to create ${pizza.name}:`, error.message);
  }
}

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

console.log("\n✅ Done! Images are ready for development.\n");
