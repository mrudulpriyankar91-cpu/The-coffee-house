import { useState, type FormEvent } from 'react';
import { Check, Minus, Plus, Trash2, X } from 'lucide-react';
import type { MenuItem } from '../data/cafeData';

export interface CartEntry {
  key: string;
  item: MenuItem;
  milkPreference?: string;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CartEntry[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveEntry: (key: string) => void;
  onClearCart: () => void;
}

const PICKUP_WINDOWS = ['In 15 min', 'In 30 min', 'In 45 min'];

export function OrderDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQuantity,
  onRemoveEntry,
  onClearCart,
}: OrderDrawerProps) {
  const [pickupWindow, setPickupWindow] = useState(PICKUP_WINDOWS[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    name: string;
    window: string;
    total: number;
    itemCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;
  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim();

    if (!trimmedName) {
      setFormError('Please enter your name for the pickup counter.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address for your receipt.');
      return;
    }

    setFormError('');
    const orderCode = `TCH-${Math.floor(410 + Math.random() * 580)}`;
    setConfirmedOrder({
      orderNumber: orderCode,
      name: trimmedName,
      window: pickupWindow,
      total,
      itemCount: totalItems,
    });
    onClearCart();
    setCustomerName('');
    setCustomerEmail('');
  }

  function handleResetAndClose() {
    setConfirmedOrder(null);
    setFormError('');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
    >
      <div
        className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-[2px] transition-opacity"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      <aside className="relative z-10 w-full max-w-md bg-[#FAF9F6] h-full flex flex-col border-l border-[#E7E5E0] shadow-xl">
        <div className="px-6 py-5 border-b border-[#E7E5E0] flex items-center justify-between">
          <div>
            <h2
              id="order-drawer-title"
              className="font-display text-2xl font-semibold text-[#1C1917]"
            >
              Counter Pickup Bag
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              42 Mercer Street · Prepared fresh to order
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close pickup bag"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2F0EA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
          >
            <X className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {confirmedOrder ? (
            <div className="py-8">
              <div className="w-11 h-11 rounded-md bg-[#1B4332] text-[#FAF9F6] flex items-center justify-center mb-5">
                <Check className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-[#1B4332] tracking-wide">
                Pickup Order Confirmed
              </p>
              <h3 className="font-display text-3xl font-semibold text-[#1C1917] mt-1">
                Order #{confirmedOrder.orderNumber}
              </h3>
              <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
                Thank you, {confirmedOrder.name}. Your {confirmedOrder.itemCount}{' '}
                {confirmedOrder.itemCount === 1 ? 'item is' : 'items are'} queued at the
                espresso bar for pickup{' '}
                <span className="font-medium text-[#1C1917]">
                  {confirmedOrder.window.toLowerCase()}
                </span>
                .
              </p>

              <div className="mt-6 pt-5 border-t border-[#E7E5E0] flex items-center justify-between text-sm">
                <span className="text-[#57534E]">Total Due at Counter</span>
                <span className="font-mono font-medium tabular-nums text-[#1C1917]">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-8 w-full py-2.5 px-4 text-sm font-medium text-[#FAF9F6] bg-[#1B4332] hover:bg-[#143326] rounded-md transition-colors cursor-pointer min-h-[42px]"
              >
                Return to Menu
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-[#1C1917]">Your bag is empty</p>
              <p className="text-sm text-[#57534E] mt-2 max-w-xs mx-auto leading-relaxed">
                Select espresso drinks, ceremonial matcha, or morning pastries from the menu
                for counter pickup.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#1B4332] border border-[#1B4332]/40 hover:border-[#1B4332] rounded-md transition-colors cursor-pointer min-h-[40px]"
              >
                Browse Daily Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-[#E7E5E0]">
                {entries.map((entry) => (
                  <li key={entry.key} className="py-4 first:pt-0 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917]">
                        {entry.item.name}
                      </p>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        {entry.milkPreference
                          ? `${entry.milkPreference} · ${entry.item.servingInfo}`
                          : entry.item.servingInfo}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="inline-flex items-center border border-[#D6D3CD] rounded-md bg-[#FFFFFF]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(entry.key, -1)}
                            aria-label={`Decrease quantity of ${entry.item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs tabular-nums text-[#1C1917]">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(entry.key, 1)}
                            aria-label={`Increase quantity of ${entry.item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveEntry(entry.key)}
                          aria-label={`Remove ${entry.item.name}`}
                          className="p-2 text-[#78716C] hover:text-[#991B1B] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <p className="font-mono text-sm tabular-nums text-[#1C1917] shrink-0">
                      ${(entry.item.price * entry.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <form onSubmit={handlePlaceOrder} className="pt-5 border-t border-[#E7E5E0] space-y-4">
                <div>
                  <span className="block text-xs font-medium text-[#44403C] mb-2">
                    Pickup Window
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {PICKUP_WINDOWS.map((win) => (
                      <button
                        key={win}
                        type="button"
                        onClick={() => setPickupWindow(win)}
                        className={`py-2 px-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                          pickupWindow === win
                            ? 'bg-[#1B4332] text-[#FAF9F6] border-[#1B4332]'
                            : 'bg-[#FFFFFF] text-[#44403C] border-[#D6D3CD] hover:border-[#1C1917]'
                        }`}
                      >
                        {win}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pickup-name"
                    className="block text-xs font-medium text-[#44403C] mb-1.5"
                  >
                    Name for Order
                  </label>
                  <input
                    id="pickup-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Clara Jensen"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#D6D3CD] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pickup-email"
                    className="block text-xs font-medium text-[#44403C] mb-1.5"
                  >
                    Email for Receipt
                  </label>
                  <input
                    id="pickup-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="clara@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#D6D3CD] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-[#991B1B]">
                    {formError}
                  </p>
                )}

                <div className="pt-3 border-t border-[#E7E5E0] space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#57534E]">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#57534E]">
                    <span>Estimated Tax</span>
                    <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#1C1917] pt-1.5">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-medium text-[#FAF9F6] bg-[#1B4332] hover:bg-[#143326] rounded-md transition-colors cursor-pointer min-h-[44px]"
                >
                  Confirm Counter Pickup
                </button>
              </form>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
