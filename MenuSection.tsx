import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, milkPreference?: string) => void;
}

const MILK_OPTIONS = ['Whole Milk', 'Oat Milk', 'Almond Milk'];

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [selectedMilk, setSelectedMilk] = useState<string>('Whole Milk');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const featuredItems = MENU_ITEMS.filter((item) => item.featured);
  const filteredItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  function handleAdd(item: MenuItem) {
    onAddToCart(item, item.milkOptions ? selectedMilk : undefined);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1100);
  }

  return (
    <>
      {/* Section 2A: Signature Bar Showcase (3-column uniform photo grid) */}
      <section id="signature" className="py-20 lg:py-24 border-t border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#1B4332]">
                Daily Counter Highlights
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
                Signature Pours &amp; Morning Bakes
              </h2>
            </div>
            <p className="text-sm text-[#57534E] max-w-md leading-relaxed">
              Dialed in at 06:30 every morning. Add directly to your counter pickup bag or
              explore the full daily bar menu below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => {
              const isAdded = recentlyAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-[#FFFFFF] border border-[#E7E5E0] rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2F0EA]">
                    <ResilientImage
                      src={item.image || ''}
                      alt={item.imageAlt || item.name}
                      fallbackLabel={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <p className="text-xs text-[#57534E]">
                        {item.category} · {item.servingInfo}
                      </p>
                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <h3 className="text-lg font-semibold text-[#1C1917] leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-mono text-sm font-medium tabular-nums text-[#1C1917] shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#1B4332] mt-1.5">
                        {item.originOrNotes}
                      </p>
                      <p className="text-sm text-[#57534E] mt-2.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-md border transition-colors duration-150 cursor-pointer min-h-[42px] whitespace-nowrap ${
                        isAdded
                          ? 'bg-[#1B4332] text-[#FAF9F6] border-[#1B4332]'
                          : 'bg-[#FAF9F6] text-[#1C1917] border-[#D6D3CD] hover:border-[#1B4332] hover:text-[#1B4332]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                          <span>Add to Pickup</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2B: Full Daily Menu with Category Filter & Milk Selection */}
      <section id="menu" className="py-20 lg:py-24 bg-[#F2F0EA]/70 border-t border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DEDAD2]">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#1B4332]">
                Full Bar &amp; Kitchen
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1917] mt-2">
                Daily Menu
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Interactive milk selector for espresso & matcha orders */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#57534E] whitespace-nowrap">Milk:</span>
                <div className="inline-flex items-center p-1 bg-[#E7E4DC] rounded-md">
                  {MILK_OPTIONS.map((milk) => (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedMilk === milk
                          ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {milk.replace(' Milk', '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-2 py-6"
          >
            {MENU_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    active
                      ? 'bg-[#1B4332] text-[#FAF9F6]'
                      : 'bg-[#FFFFFF] text-[#44403C] border border-[#DEDAD2] hover:border-[#1C1917]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Clean Hairline-Divided Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mt-2">
            {filteredItems.map((item) => {
              const isAdded = recentlyAddedId === item.id;
              return (
                <div
                  key={item.id}
                  className="py-5 border-b border-[#DEDAD2] flex items-start justify-between gap-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h3 className="text-base font-semibold text-[#1C1917]">
                        {item.name}
                      </h3>
                      <span className="text-xs text-[#57534E]">
                        {item.category} · {item.servingInfo}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#1B4332] mt-1">
                      {item.originOrNotes}
                    </p>
                    <p className="text-sm text-[#57534E] mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2.5 shrink-0">
                    <span className="font-mono text-sm font-medium tabular-nums text-[#1C1917]">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      aria-label={`Add ${item.name} to pickup bag`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] ${
                        isAdded
                          ? 'bg-[#1B4332] text-[#FAF9F6] border-[#1B4332]'
                          : 'bg-[#FFFFFF] text-[#1C1917] border-[#D6D3CD] hover:border-[#1B4332] hover:text-[#1B4332]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
