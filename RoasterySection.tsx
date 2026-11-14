import { CAFE_IMAGES, ROASTERY_PILLARS } from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

export function RoasterySection() {
  return (
    <section id="roastery" className="py-20 lg:py-24 border-t border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left: Editorial 16:9 roastery craft visual */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="aspect-[16/9] lg:aspect-auto lg:flex-1 rounded-lg overflow-hidden bg-[#F2F0EA] border border-[#E7E5E0]">
              <ResilientImage
                src={CAFE_IMAGES.roastery}
                alt="Freshly roasted single-origin coffee beans cooling in a steel tray inside the roastery"
                fallbackLabel="Small-Batch Roastery Floor"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-6 pt-2 border-t border-[#E7E5E0]">
              <div>
                <p className="font-mono text-lg md:text-xl font-medium tabular-nums text-[#1C1917]">
                  12 kg
                </p>
                <p className="text-xs text-[#57534E] mt-0.5">Batch Drum Capacity</p>
              </div>
              <div>
                <p className="font-mono text-lg md:text-xl font-medium tabular-nums text-[#1C1917]">
                  Tuesdays
                </p>
                <p className="text-xs text-[#57534E] mt-0.5">Weekly Roast Schedule</p>
              </div>
              <div>
                <p className="font-mono text-lg md:text-xl font-medium tabular-nums text-[#1C1917]">
                  48 hrs
                </p>
                <p className="text-xs text-[#57534E] mt-0.5">Levain Dough Ferment</p>
              </div>
            </div>
          </div>

          {/* Right: 3 Numbered Craft Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-wider text-[#1B4332]">
              Roastery &amp; Bakery Craft
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
              Roasted in Small Batches, Served Within Days
            </h2>
            <p className="text-sm text-[#57534E] mt-4 leading-relaxed">
              Every cup begins in our back-room roastery, where green lots are cupped weekly
              and profiled to highlight origin terroir rather than roast char.
            </p>

            <div className="mt-8 divide-y divide-[#E7E5E0] border-t border-b border-[#E7E5E0]">
              {ROASTERY_PILLARS.map((pillar) => (
                <div key={pillar.index} className="py-5">
                  <h3 className="text-base font-semibold text-[#1C1917]">
                    <span className="font-mono text-sm text-[#1B4332] mr-2 tabular-nums">
                      {pillar.index}
                    </span>
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#57534E] mt-1.5 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
