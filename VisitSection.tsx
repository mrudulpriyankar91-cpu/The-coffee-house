import { useState, type FormEvent } from 'react';
import { Check, Clock, MapPin } from 'lucide-react';
import { HOURS_LIST } from '../data/cafeData';

const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30'];

export function VisitSection() {
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('10:30');
  const [guests, setGuests] = useState('2 Guests');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [error, setError] = useState('');
  const [reservation, setReservation] = useState<{
    code: string;
    name: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);

  function handleReserve(e: FormEvent) {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();

    if (!trimmedName) {
      setError('Please enter your name for the table booking.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setReservation({
      code: `TBL-${Math.floor(120 + Math.random() * 870)}`,
      name: trimmedName,
      date,
      time,
      guests,
    });
    setGuestName('');
    setGuestEmail('');
  }

  return (
    <section id="visit" className="py-20 lg:py-24 bg-[#F2F0EA]/70 border-t border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Location & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#1B4332]">
                Visit the Café
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
                42 Mercer Street, Ground Floor
              </h2>
              <p className="text-sm text-[#57534E] mt-4 leading-relaxed max-w-md">
                Quiet window tables for morning reading, communal oak benches with power
                outlets, and walk-up counter espresso service all day.
              </p>

              <div className="mt-8 space-y-6">
                <div className="pt-5 border-t border-[#DEDAD2]">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1C1917] mb-3">
                    <Clock className="w-4 h-4 text-[#1B4332] stroke-[1.75]" aria-hidden="true" />
                    <span>Opening Hours</span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    {HOURS_LIST.map((row) => (
                      <div key={row.days} className="flex justify-between gap-4">
                        <dt className="text-[#57534E]">{row.days}</dt>
                        <dd className="font-mono tabular-nums text-[#1C1917]">
                          {row.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="pt-5 border-t border-[#DEDAD2]">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#1C1917] mb-2">
                    <MapPin className="w-4 h-4 text-[#1B4332] stroke-[1.75]" aria-hidden="true" />
                    <span>Directions &amp; Contact</span>
                  </div>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    42 Mercer Street · SoHo · Two blocks east of Canal St Station
                  </p>
                  <p className="text-sm font-mono tabular-nums text-[#1C1917] mt-1.5">
                    hello@thecoffeehouse.cafe · (212) 555-0194
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Table Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-lg p-6 sm:p-8 lg:p-10">
              {reservation ? (
                <div className="py-4">
                  <div className="w-11 h-11 rounded-md bg-[#1B4332] text-[#FAF9F6] flex items-center justify-center mb-5">
                    <Check className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-medium text-[#1B4332]">
                    Table Reservation Confirmed
                  </p>
                  <h3 className="font-display text-3xl font-semibold text-[#1C1917] mt-1">
                    See you soon, {reservation.name}
                  </h3>
                  <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
                    Your table for <span className="font-medium text-[#1C1917]">{reservation.guests}</span> is
                    held on <span className="font-mono text-[#1C1917]">{reservation.date}</span> at{' '}
                    <span className="font-mono text-[#1C1917]">{reservation.time}</span>. Reference:{' '}
                    <span className="font-mono text-[#1C1917]">#{reservation.code}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReservation(null)}
                    className="mt-6 px-4 py-2 text-sm font-medium text-[#1B4332] border border-[#1B4332]/40 hover:border-[#1B4332] rounded-md transition-colors cursor-pointer min-h-[40px]"
                  >
                    Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="space-y-5">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                      Reserve a Window Table
                    </h3>
                    <p className="text-sm text-[#57534E] mt-1">
                      Walk-ins are always welcome at the espresso bar; reservations hold a
                      seated table for 90 minutes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label
                        htmlFor="res-date"
                        className="block text-xs font-medium text-[#44403C] mb-1.5"
                      >
                        Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm font-mono bg-[#FAF9F6] border border-[#D6D3CD] rounded-md text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="res-time"
                        className="block text-xs font-medium text-[#44403C] mb-1.5"
                      >
                        Time
                      </label>
                      <select
                        id="res-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm font-mono bg-[#FAF9F6] border border-[#D6D3CD] rounded-md text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block text-xs font-medium text-[#44403C] mb-1.5"
                      >
                        Party Size
                      </label>
                      <select
                        id="res-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm bg-[#FAF9F6] border border-[#D6D3CD] rounded-md text-[#1C1917] focus:outline-none focus:border-[#1B4332]"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block text-xs font-medium text-[#44403C] mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Marcus Lindqvist"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D6D3CD] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="res-email"
                        className="block text-xs font-medium text-[#44403C] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="marcus@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D6D3CD] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#991B1B]">
                      {error}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-[#FAF9F6] bg-[#1B4332] hover:bg-[#143326] rounded-md transition-colors cursor-pointer min-h-[42px]"
                    >
                      Confirm Table Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
