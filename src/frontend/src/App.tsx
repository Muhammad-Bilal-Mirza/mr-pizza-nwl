import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  Search,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { MenuItem } from "./backend";
import { useActor } from "./hooks/useActor";

// ─── Local image overrides (bypasses broken backend URLs) ──────
const LOCAL_PIZZA_IMAGES: Record<string, string> = {
  "La Margherita": "/assets/generated/pizza-margherita.dim_400x400.jpg",
  Margherita: "/assets/generated/pizza-margherita.dim_400x400.jpg",
  "Pepperoni Royale": "/assets/generated/pizza-pepperoni.dim_400x400.jpg",
  Pepperoni: "/assets/generated/pizza-pepperoni.dim_400x400.jpg",
  "Black Truffle & Mushroom": "/assets/generated/pizza-truffle.dim_400x400.jpg",
  "Truffle Mushroom": "/assets/generated/pizza-truffle.dim_400x400.jpg",
  "Smoky BBQ Chicken": "/assets/generated/pizza-bbq-chicken.dim_400x400.jpg",
  "BBQ Chicken": "/assets/generated/pizza-bbq-chicken.dim_400x400.jpg",
};

// ─── Backend hook ─────────────────────────────────────────────
function useMenu() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenu();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Static fallback menu data ─────────────────────────────────
const STATIC_MENU: MenuItem[] = [
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

const TESTIMONIALS = [
  {
    name: "Sophia Laurent",
    rating: 5,
    text: "MR.PIZZA is unlike anything I've tasted. The truffle mushroom is an absolute revelation — I dream about it constantly.",
    title: "Food Critic, The Gourmet Press",
  },
  {
    name: "James Whitfield",
    rating: 5,
    text: "The crust alone is worth the trip. Perfectly charred, impossibly light. This is what pizza is supposed to be.",
    title: "Michelin Guide Contributor",
  },
  {
    name: "Amara Osei",
    rating: 5,
    text: "I've eaten pizza across Naples, New York, and Tokyo. MR.PIZZA holds its own against all of them. Extraordinary.",
    title: "Culinary Travel Blogger",
  },
];

function formatPrice(price: bigint): string {
  const cents = Number(price);
  return `$${(cents / 100).toFixed(2)}`;
}

// ─── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Menu", "Our Story", "Locations", "Reservations"];

  return (
    <header
      data-ocid="header.section"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          data-ocid="header.link"
          className="font-playfair text-2xl font-bold text-gold tracking-[0.2em] uppercase hover:brightness-125 transition-all"
        >
          MR.PIZZA
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              data-ocid={`nav.${link.toLowerCase().replace(" ", "-")}.link`}
              className="font-inter text-xs uppercase tracking-[0.15em] text-offwhite/80 hover:text-gold transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            data-ocid="header.search_input"
            aria-label="Search"
            className="text-offwhite/60 hover:text-gold transition-colors"
          >
            <Search size={18} />
          </button>
          <a
            href="#menu"
            data-ocid="header.primary_button"
            className="btn-gold-metallic font-inter text-xs uppercase tracking-[0.15em] px-5 py-2.5 text-charcoal font-semibold"
          >
            Order Online
          </a>
        </div>

        <button
          type="button"
          data-ocid="header.toggle"
          aria-label="Toggle menu"
          className="md:hidden text-offwhite/80 hover:text-gold transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-gold/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-xs uppercase tracking-[0.15em] text-offwhite/80 hover:text-gold transition-colors py-2 border-b border-gold/10"
                >
                  {link}
                </a>
              ))}
              <a
                href="#menu"
                data-ocid="mobile.primary_button"
                className="btn-gold-metallic font-inter text-xs uppercase tracking-[0.15em] px-5 py-3 text-charcoal text-center font-semibold mt-2"
              >
                Order Online
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 animate-hero-scale">
        <img
          src="/assets/generated/hero-pizza.dim_1600x900.jpg"
          alt="MR.PIZZA hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layered dark overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/30 to-charcoal/95" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at center, transparent 20%, rgba(27,31,34,0.85) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-inter text-gold text-[11px] uppercase tracking-[0.5em] mb-8"
        >
          Est. 2010 · Award Winning · Naples Certified
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1 }}
          className="hero-text-shadow font-playfair font-bold text-offwhite uppercase leading-none tracking-[0.06em] mb-0"
          style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
        >
          MR.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="hero-text-shadow font-playfair font-bold text-offwhite uppercase leading-none tracking-[0.06em] mb-6"
          style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
        >
          PIZZA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="hero-sub-shadow font-playfair italic text-gold/95 tracking-wide mb-5"
          style={{ fontSize: "clamp(1.25rem, 3.5vw, 2.75rem)" }}
        >
          The Best Pizza In Town
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="w-32 h-px mx-auto mb-7"
          style={{
            background:
              "linear-gradient(to right, transparent, #d4b87a, #c6a35b, #d4b87a, transparent)",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-inter text-offwhite/70 text-base md:text-lg tracking-widest mb-12 uppercase"
          style={{ letterSpacing: "0.22em" }}
        >
          Crafted with passion. Fired with perfection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            data-ocid="hero.primary_button"
            className="btn-gold-metallic font-inter text-xs uppercase tracking-[0.25em] px-10 py-4 text-charcoal font-semibold"
          >
            View Menu
          </a>
          <a
            href="#reservations"
            data-ocid="hero.secondary_button"
            className="btn-gold-outline font-inter text-xs uppercase tracking-[0.25em] px-10 py-4 border border-gold/70 text-offwhite hover:border-gold hover:text-gold transition-all duration-300"
          >
            Reserve A Table
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-offwhite/35">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-px h-12 bg-gradient-to-b from-gold/70 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: "🌿",
      title: "Finest Ingredients",
      desc: "We source only the highest quality, ethically grown produce. From DOP San Marzano tomatoes to imported Italian 00 flour.",
    },
    {
      icon: "🔥",
      title: "Wood-Fired Perfection",
      desc: "Our 900°F wood-burning oven, imported from Naples, gives every pizza its signature leopard-spotted crust in under 90 seconds.",
    },
    {
      icon: "📜",
      title: "Secret Recipes",
      desc: "Our dough is cold-fermented for 72 hours. The sauce? A guarded family secret passed down through three generations.",
    },
  ];

  return (
    <section id="our-story" className="py-28 bg-charcoal relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-gold text-[11px] uppercase tracking-[0.4em] mb-4">
            Our Philosophy
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-offwhite uppercase tracking-wide">
            The Art of Pizza
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="p-8 border border-gold/25 bg-charcoal-light/50 hover:border-gold/60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold/60 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-full bg-gradient-to-l from-gold/60 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center text-2xl mb-5 border border-gold/30 bg-charcoal">
                  {f.icon}
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent mb-5" />
                <h3 className="font-playfair text-xl text-offwhite uppercase tracking-wider mb-4">
                  {f.title}
                </h3>
                <p className="font-inter text-muted-warm text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

// ─── Menu ──────────────────────────────────────────────────────
function MenuSection({ items }: { items: MenuItem[] }) {
  const displayItems = items.length > 0 ? items.slice(0, 4) : STATIC_MENU;

  return (
    <section
      id="menu"
      data-ocid="menu.section"
      className="py-28 bg-charcoal-light relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-gold text-[11px] uppercase tracking-[0.4em] mb-4">
            Crafted Daily
          </p>
          <h2 className="font-playfair text-5xl md:text-6xl text-offwhite uppercase tracking-wide">
            Our Menu
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {displayItems.map((item, i) => (
            <motion.div
              key={item.name}
              data-ocid={`menu.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="flex flex-col items-center text-center group hover:-translate-y-3 transition-transform duration-500"
            >
              <div className="relative mb-8">
                <div className="ring-gold-hover w-48 h-48 rounded-full p-[3px] bg-gradient-to-br from-[#d4b87a] via-[#c6a35b] to-[#8a6b2a]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={
                        LOCAL_PIZZA_IMAGES[item.name] ||
                        STATIC_MENU[i % STATIC_MENU.length].imageURL
                      }
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-inter font-bold text-xs px-4 py-1.5 tracking-widest text-charcoal whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(to bottom, #d4b87a 0%, #c6a35b 50%, #aa8840 100%)",
                    boxShadow: "0 2px 12px rgba(198,163,91,0.4)",
                  }}
                >
                  {formatPrice(item.price)}
                </div>
              </div>

              <h3 className="font-playfair text-lg text-offwhite mt-3 mb-2 group-hover:text-gold transition-colors duration-300">
                {item.name}
              </h3>
              <p className="font-inter text-xs text-muted-warm leading-relaxed px-3">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <a
            href="#menu"
            data-ocid="menu.primary_button"
            className="btn-gold-outline font-inter text-xs uppercase tracking-[0.3em] px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 inline-block font-medium"
          >
            Discover All Pizzas
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Info + Testimonials ───────────────────────────────────────
function InfoTestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () =>
    setActiveTestimonial(
      (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  const next = () => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section id="locations" className="py-0 bg-charcoal relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center p-12 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #13161A 0%, #1B1F22 50%, #2A2F33 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#C6A35B 1px, transparent 1px), linear-gradient(90deg, #C6A35B 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 border border-gold/30 p-10 max-w-sm w-full bg-charcoal/80 backdrop-blur">
            <p className="font-inter text-gold text-[11px] uppercase tracking-[0.4em] mb-3">
              Find Us
            </p>
            <h2 className="font-playfair text-3xl text-offwhite uppercase tracking-wide mb-5">
              Visit Us
            </h2>
            <div
              className="w-10 h-px mb-8"
              style={{
                background:
                  "linear-gradient(to right, #d4b87a, #c6a35b, transparent)",
              }}
            />

            <div className="space-y-5 text-sm font-inter text-muted-warm">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-offwhite font-medium mb-1">Address</p>
                  <p>42 Margherita Lane, Napoli District</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-offwhite font-medium mb-1">Hours</p>
                  <p>Mon–Thu: 12:00 PM – 10:00 PM</p>
                  <p>Fri–Sat: 12:00 PM – 11:30 PM</p>
                  <p>Sunday: 1:00 PM – 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-offwhite font-medium mb-1">Reservations</p>
                  <p>+1 (212) 555-0194</p>
                </div>
              </div>
            </div>

            <a
              href="#reservations"
              data-ocid="visit.primary_button"
              className="btn-gold-metallic inline-block mt-8 font-inter text-xs uppercase tracking-[0.2em] px-6 py-3 text-charcoal font-semibold"
            >
              Reserve A Table
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center p-12 bg-charcoal-light"
        >
          <p className="font-inter text-gold text-[11px] uppercase tracking-[0.4em] mb-3">
            Guest Reviews
          </p>
          <h2 className="font-playfair text-3xl text-offwhite uppercase tracking-wide mb-6">
            What Our Guests Say
          </h2>
          <div
            className="w-10 h-px mb-10"
            style={{
              background:
                "linear-gradient(to right, transparent, #d4b87a, #c6a35b, #d4b87a, transparent)",
            }}
          />

          <div className="relative max-w-md w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                data-ocid="testimonials.card"
                className="border border-gold/25 p-8 bg-charcoal/70 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-gold/50 to-transparent" />
                  <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
                </div>
                <div className="flex gap-1 mb-5">
                  {Array.from({
                    length: TESTIMONIALS[activeTestimonial].rating,
                  }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static rating stars
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-playfair text-offwhite/90 text-base italic leading-relaxed mb-6">
                  &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
                </p>
                <div className="border-t border-gold/20 pt-5">
                  <p className="font-inter text-gold text-sm font-semibold">
                    {TESTIMONIALS[activeTestimonial].name}
                  </p>
                  <p className="font-inter text-muted-warm text-xs mt-1">
                    {TESTIMONIALS[activeTestimonial].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    data-ocid="testimonials.toggle"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-[3px] rounded-full transition-all duration-400 ${
                      i === activeTestimonial
                        ? "w-8 bg-gold"
                        : "w-3 bg-offwhite/20 hover:bg-gold/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-ocid="testimonials.pagination_prev"
                  aria-label="Previous testimonial"
                  onClick={prev}
                  className="w-9 h-9 flex items-center justify-center border border-gold/30 text-gold/60 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  data-ocid="testimonials.pagination_next"
                  aria-label="Next testimonial"
                  onClick={next}
                  className="w-9 h-9 flex items-center justify-center border border-gold/30 text-gold/60 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

// ─── Reservations ──────────────────────────────────────────────
function ReservationsSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    guests: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservations"
      data-ocid="reservations.section"
      className="py-28 bg-charcoal"
    >
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-inter text-gold text-[11px] uppercase tracking-[0.4em] mb-4">
            Join Us
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-offwhite uppercase tracking-wide">
            Reserve A Table
          </h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            data-ocid="reservations.success_state"
            className="text-center border border-gold/40 p-12 bg-charcoal-light"
          >
            <div className="text-4xl mb-4">🍕</div>
            <h3 className="font-playfair text-2xl text-offwhite mb-3">
              Reservation Confirmed!
            </h3>
            <p className="font-inter text-muted-warm text-sm">
              We look forward to welcoming you. A confirmation will be sent to
              your email.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-5 border border-gold/20 p-10 bg-charcoal-light relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-gold/50 to-transparent" />
              <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-gold/50 to-transparent" />
              <div className="absolute bottom-0 right-0 h-px w-full bg-gradient-to-l from-gold/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="res-name"
                  className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block"
                >
                  Full Name
                </label>
                <input
                  id="res-name"
                  data-ocid="reservations.input"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="w-full bg-charcoal border border-gold/20 text-offwhite font-inter text-sm px-4 py-3 focus:border-gold/70 focus:outline-none transition-colors placeholder-offwhite/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="res-email"
                  className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block"
                >
                  Email
                </label>
                <input
                  id="res-email"
                  data-ocid="reservations.input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  className="w-full bg-charcoal border border-gold/20 text-offwhite font-inter text-sm px-4 py-3 focus:border-gold/70 focus:outline-none transition-colors placeholder-offwhite/20"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="res-date"
                  className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block"
                >
                  Date
                </label>
                <input
                  id="res-date"
                  data-ocid="reservations.input"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  required
                  className="w-full bg-charcoal border border-gold/20 text-offwhite font-inter text-sm px-4 py-3 focus:border-gold/70 focus:outline-none transition-colors [color-scheme:dark]"
                />
              </div>
              <div>
                <label
                  htmlFor="res-guests"
                  className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block"
                >
                  Guests
                </label>
                <select
                  id="res-guests"
                  data-ocid="reservations.select"
                  value={form.guests}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, guests: e.target.value }))
                  }
                  className="w-full bg-charcoal border border-gold/20 text-offwhite font-inter text-sm px-4 py-3 focus:border-gold/70 focus:outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              data-ocid="reservations.submit_button"
              className="btn-gold-metallic w-full font-inter text-xs uppercase tracking-[0.3em] py-4 text-charcoal font-semibold mt-4"
            >
              Confirm Reservation
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="bg-gradient-to-b from-burgundy to-burgundy-dark"
      data-ocid="footer.section"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gold/20">
          <div>
            <h3 className="font-playfair text-3xl font-bold text-gold tracking-[0.2em] uppercase mb-2">
              MR.PIZZA
            </h3>
            <div
              className="w-12 h-px mb-4"
              style={{
                background:
                  "linear-gradient(to right, #d4b87a, #c6a35b, transparent)",
              }}
            />
            <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-offwhite/45 mb-4">
              Best Pizza In Town
            </p>
            <p className="font-inter text-sm text-offwhite/55 leading-relaxed">
              Crafting unforgettable pizzas since 2010. Wood-fired. Handcrafted.
              Perfected.
            </p>
            <div className="flex gap-3 mt-6">
              {["Instagram", "Facebook", "X"].map((s) => (
                <a
                  key={s}
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`footer.${s.toLowerCase()}.link`}
                  className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/50 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300 font-inter text-xs"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-inter text-[10px] uppercase tracking-[0.35em] text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Menu",
                "Our Story",
                "Locations",
                "Reservations",
                "Catering",
                "Gift Cards",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    data-ocid={`footer.${link.toLowerCase().replace(" ", "-")}.link`}
                    className="font-inter text-sm text-offwhite/55 hover:text-gold transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-3 h-px bg-gold/35 group-hover:w-6 group-hover:bg-gold transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-[10px] uppercase tracking-[0.35em] text-gold mb-3">
              Stay In The Know
            </h4>
            <p className="font-inter text-sm text-offwhite/55 mb-6 leading-relaxed">
              New menu drops, exclusive events & special offers — delivered to
              your inbox.
            </p>
            {subscribed ? (
              <p
                data-ocid="footer.success_state"
                className="font-inter text-sm text-gold border border-gold/30 px-4 py-3"
              >
                ✓ You're on the list.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  data-ocid="footer.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-burgundy-light border border-gold/25 border-r-0 text-offwhite font-inter text-xs px-4 py-3 focus:border-gold/60 focus:outline-none placeholder-offwhite/25 transition-colors"
                />
                <button
                  type="submit"
                  data-ocid="footer.submit_button"
                  className="btn-gold-metallic font-inter text-xs uppercase tracking-[0.15em] px-5 py-3 text-charcoal font-semibold"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-offwhite/35">
            42 Margherita Lane, Napoli District, New York, NY 10001
          </p>
          <p className="font-inter text-xs text-offwhite/35 text-center">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/70 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────
export default function App() {
  const { data: menuItems = [] } = useMenu();

  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MenuSection items={menuItems} />
        <InfoTestimonialsSection />
        <ReservationsSection />
      </main>
      <Footer />
    </div>
  );
}
