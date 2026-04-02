import type { backendInterface, MenuItem } from "../backend";

// Mock menu data matching the STATIC_MENU in App.tsx
const mockMenuItems: MenuItem[] = [
  {
    name: "La Margherita",
    description:
      "San Marzano tomatoes, buffalo mozzarella DOP, fresh basil, extra-virgin olive oil",
    imageURL: "/assets/generated/pizza-margherita.dim_400x400.jpg",
    category: { __type: "vegetarian" } as any,
    price: BigInt(1499),
  },
  {
    name: "Pepperoni Royale",
    description:
      "Double-layered crispy pepperoni, aged mozzarella, house tomato sauce, oregano",
    imageURL: "/assets/generated/pizza-pepperoni.dim_400x400.jpg",
    category: { __type: "meat" } as any,
    price: BigInt(1799),
  },
  {
    name: "Black Truffle & Mushroom",
    description:
      "Wild porcini mushrooms, black truffle shavings, crème fraîche, fresh thyme",
    imageURL: "/assets/generated/pizza-truffle.dim_400x400.jpg",
    category: { __type: "specialty" } as any,
    price: BigInt(2299),
  },
  {
    name: "Smoky BBQ Chicken",
    description:
      "Pulled smoked chicken, caramelized onions, house BBQ sauce, smoked gouda",
    imageURL: "/assets/generated/pizza-bbq-chicken.dim_400x400.jpg",
    category: { __type: "highlights" } as any,
    price: BigInt(1999),
  },
];

export const mockBackend: backendInterface = {
  getMenu: async () => mockMenuItems,
  
  // Add other required methods as no-ops
  // You can expand these based on your actual backend interface
  placeOrder: async () => ({} as any),
  getOrders: async () => [],
} as any;
