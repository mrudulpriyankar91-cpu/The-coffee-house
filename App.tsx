import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CAFE_IMAGES, type MenuItem } from './data/cafeData';
import { Navbar } from './components/Navbar';
import { MenuSection } from './components/MenuSection';
import { RoasterySection } from './components/RoasterySection';
import { VisitSection } from './components/VisitSection';
import { OrderDrawer, type CartEntry } from './components/OrderDrawer';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalCartCount = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  function handleAddToCart(item: MenuItem, milkPreference?: string) {
    const entryKey = milkPreference ? `${item.id}::${milkPreference}` : item.id;
    setCartEntries((prev) => {
      const existing = prev.find((e) => e.key === entryKey);
      if (existing) {
        return prev.map((e) =>
          e.key === entryKey ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { key: entryKey, item, milkPreference, quantity: 1 }];
    });
  }

  function handleUpdateQuantity(key: string, delta: number) {
    setCartEntries((prev) =>
      prev
        .map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }

  function handleRemoveEntry(key: string) {
    setCartEntries((prev) => prev.filter((entry) => entry.key !== key));
  }

  function handleClearCart() {
    setCartEntries([]);
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917]">
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsDrawerOpen(true)} />

      <main className="flex-1">
        {/* Hero Section: Asymmetric 2-column split */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs font-medium tracking-wider text-[#1B4332]">
                    42 Mercer Street · SoHo Espresso Bar
                  </p>
                  <h1 className="font-display text-[clamp(2.5rem,4.5vw,4.15rem)] font-semibold leading-[1.06] tracking-tight text-[#1C1917] mt-4 text-balance">
                    Single-Origin Coffee &amp; Morning Viennoiserie
                  </h1>
                  <p className="text-base text-[#57534E] mt-5 leading-relaxed max-w-md">
                    A calm neighborhood café roasting seasonal harvests in small batches
                    every Tuesday and baking stone-milled sourdough pastries before dawn.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href="#menu"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FAF9F6] bg-[#1B4332] hover:bg-[#143326] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px]"
                    >
                      <span>Explore Daily Menu</span>
                      <ArrowRight className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                    </a>
                    <a
                      href="#visit"
                      className="text-sm font-medium text-[#1C1917] hover:text-[#1B4332] underline underline-offset-4 decoration-[#D6D3CD] hover:decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-2"
                    >
                      Reserve a Table
                    </a>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#E7E5E0] grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#57534E]">Today&apos;s Hours</p>
                    <p className="font-mono text-sm font-medium tabular-nums text-[#1C1917] mt-1">
                      07:00 – 18:00
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#57534E]">Featured Espresso Lot</p>
                    <p className="text-sm font-medium text-[#1C1917] mt-1">
                      Huila, Colombia
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] rounded-lg overflow-hidden bg-[#F2F0EA] border border-[#E7E5E0]">
                  <ResilientImage
                    src={CAFE_IMAGES.hero}
                    alt="Sunlit interior of THE COFFEE HOUSE showing pale oak and limestone espresso bar with ceramic pour-over drippers"
                    fallbackLabel="THE COFFEE HOUSE Espresso Bar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <MenuSection onAddToCart={handleAddToCart} />
        <RoasterySection />
        <VisitSection />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#E7E5E0] bg-[#FAF9F6] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <a
              href="#top"
              className="font-display text-xl font-semibold tracking-tight text-[#1C1917]"
            >
              THE COFFEE HOUSE
            </a>
            <p className="text-xs text-[#57534E] mt-1">
              42 Mercer Street, New York · Open Daily
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#57534E]">
            <a href="#signature" className="hover:text-[#1C1917] transition-colors">
              Signature
            </a>
            <a href="#menu" className="hover:text-[#1C1917] transition-colors">
              Menu
            </a>
            <a href="#roastery" className="hover:text-[#1C1917] transition-colors">
              Roastery
            </a>
            <a href="#visit" className="hover:text-[#1C1917] transition-colors">
              Visit
            </a>
          </div>

          <p className="text-xs text-[#78716C]">
            © {new Date().getFullYear()} THE COFFEE HOUSE. All rights reserved.
          </p>
        </div>
      </footer>

      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        entries={cartEntries}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveEntry={handleRemoveEntry}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
