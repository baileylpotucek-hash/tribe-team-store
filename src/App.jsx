import { useMemo, useState } from 'react';

const PRODUCTS = [
  {
    id: 't-logo',
    name: 'T Logo Only',
    image: '/images/T Logo Only w_ Variations.png',
    description: 'Clean team mark decal with multiple variation options.',
    basePrices: { small: 5, medium: 8, large: 12 },
    personalization: false,
    badge: 'Team Favorite',
  },
  {
    id: 'tribe-bat',
    name: 'TRIBE w/ Bat',
    image: '/images/TRIBE w_ Bat.png',
    description: 'Bold wordmark option with athletic styling.',
    basePrices: { small: 6, medium: 9, large: 13 },
    personalization: false,
    badge: 'Classic',
  },
  {
    id: 'tribe-feathers',
    name: 'TRIBE w/ Feathers',
    image: '/images/TRIBE w_ Feathers.png',
    description: 'Script-style logo option with feather detail.',
    basePrices: { small: 6, medium: 9, large: 13 },
    personalization: false,
    badge: 'Popular',
  },
  {
    id: 'tribe-skull',
    name: 'Tribe Skull',
    image: '/images/Tribe Skull.png',
    description: 'Mascot-style design for fans wanting something bolder.',
    basePrices: { small: 7, medium: 10, large: 14 },
    personalization: false,
    badge: 'Bold',
  },
  {
    id: 'solid-plate',
    name: 'Solid Plate',
    image: '/images/Solid Plate w_ Name + Number.png',
    description: 'Home plate decal that supports player name and number.',
    basePrices: { small: 8, medium: 12, large: 16 },
    personalization: true,
    badge: 'Customizable',
  },
  {
    id: 'transparent-plate',
    name: 'Transparent Plate',
    image: '/images/Transparent Plate w_ Name + Number.png',
    description: 'Transparent plate-style option with name/number support.',
    basePrices: { small: 8, medium: 12, large: 16 },
    personalization: true,
    badge: 'Customizable',
  },
];

const SIZES = [
  { id: 'small', label: 'Small (3”)' },
  { id: 'medium', label: 'Medium (5”)' },
  { id: 'large', label: 'Large (7”)' },
];

const BACKGROUNDS = ['Die Cut', 'White Background', 'Black Background'];

const PERSONALIZATION_OPTIONS = [
  { id: 'none', label: 'No personalization', price: 0 },
  { id: 'name', label: 'Name only', price: 2 },
  { id: 'number', label: 'Number only', price: 2 },
  { id: 'name-number', label: 'Name + Number', price: 4 },
];

const TEAM_HIGHLIGHTS = [
  'Competitive youth baseball program',
  'Custom decals and fan gear',
  'Simple pre-order pickup process',
];

const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function getPersonalizationLabel(id) {
  return PERSONALIZATION_OPTIONS.find((option) => option.id === id)?.label ?? 'No personalization';
}

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState('medium');
  const [background, setBackground] = useState('Die Cut');
  const [personalization, setPersonalization] = useState('none');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addOn = PERSONALIZATION_OPTIONS.find((option) => option.id === personalization)?.price ?? 0;
  const unitPrice = (product.basePrices[size] ?? 0) + addOn;

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/70 shadow-xl shadow-sky-950/20">
      <div className="aspect-[1/1] bg-slate-950">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-4" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-white">{product.name}</div>
            <p className="mt-1 text-sm leading-6 text-slate-300">{product.description}</p>
          </div>
          <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-200">
            {product.badge}
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Size</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
            >
              {SIZES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Quantity</span>
              <input
                type="number"
                min="1"
                max="25"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Background</span>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
              >
                {BACKGROUNDS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {product.personalization ? (
            <>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Personalization</span>
                <select
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                >
                  {PERSONALIZATION_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-200">Custom name</span>
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    disabled={personalization === 'none' || personalization === 'number'}
                    placeholder="Potucek"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300 disabled:opacity-50"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-200">Custom number</span>
                  <input
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    disabled={personalization === 'none' || personalization === 'name'}
                    placeholder="16"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300 disabled:opacity-50"
                  />
                </label>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-slate-950/80 px-4 py-3">
          <div>
            <div className="text-sm text-slate-400">Item total</div>
            <div className="text-lg font-bold text-white">{money(unitPrice * quantity)}</div>
          </div>
          <button
            type="button"
            onClick={() =>
              onAdd({
                productId: product.id,
                name: product.name,
                image: product.image,
                size,
                background,
                personalization,
                customName,
                customNumber,
                quantity,
                unitPrice,
                total: unitPrice * quantity,
              })
            }
            className="rounded-2xl bg-sky-400 px-4 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TribeTeamStoreWebsite() {
  const [cart, setCart] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.total, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(item) {
    setCart((current) => [...current, { ...item, cartId: crypto.randomUUID() }]);
    setShowOptions(true);
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!cart.length) {
      setStatus('error');
      setMessage('Please add at least one decal before submitting your pre-order.');
      return;
    }

    if (!buyerName || !buyerEmail || !buyerPhone) {
      setStatus('error');
      setMessage('Please complete your contact information.');
      return;
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      buyerName,
      buyerEmail,
      buyerPhone,
      playerName,
      notes,
      total: cartTotal,
      items: cart.map((item) => ({
        name: item.name,
        size: item.size,
        background: item.background,
        personalization: getPersonalizationLabel(item.personalization),
        customName: item.customName,
        customNumber: item.customNumber,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
    };

    if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
      setStatus('error');
      setMessage('Add your Google Apps Script web app URL before using live submission.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('Submitting your pre-order...');

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      setStatus('success');
      setMessage('Pre-order submitted successfully. We will follow up with confirmation and payment details.');
      setCart([]);
      setBuyerName('');
      setBuyerEmail('');
      setBuyerPhone('');
      setPlayerName('');
      setNotes('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong while sending your order. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
                Clearwater Tribe Baseball
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                Decals for players, families, and fans.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Welcome to the Clearwater Tribe team store. This pre-order page is built for custom decals and sticker options featuring team marks, player personalization, and fan favorites.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {TEAM_HIGHLIGHTS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(true);
                    setTimeout(() => {
                      document.getElementById('options-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="rounded-2xl bg-sky-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  See Options Now
                </button>
                <a
                  href="#cart-section"
                  className="rounded-2xl border border-slate-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5"
                >
                  View Cart {cartCount ? `(${cartCount})` : ''}
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-sky-950/20 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {PRODUCTS.slice(0, 4).map((product) => (
                  <div key={product.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
                    <div className="aspect-square bg-slate-950">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-bold">{product.name}</div>
                      <div className="mt-1 text-xs text-slate-400">From {money(product.basePrices.medium)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showOptions ? (
        <section id="options-section" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Shop Options</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Choose your decal style</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Add items to your cart first. After that, fill out your contact details once and submit your full pre-order.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>
      ) : null}

      <section id="cart-section" className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-sky-950/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Cart</p>
                <h2 className="mt-2 text-3xl font-black">Your selections</h2>
              </div>
              <span className="rounded-full bg-sky-400/15 px-3 py-1 text-sm font-semibold text-sky-200">
                {cartCount} item{cartCount === 1 ? '' : 's'}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {cart.length ? (
                cart.map((item) => (
                  <div key={item.cartId} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                    <div className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-950">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-bold text-white">{item.name}</div>
                            <div className="mt-1 text-sm text-slate-400">
                              {SIZES.find((option) => option.id === item.size)?.label} · Qty {item.quantity}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-bold text-white">{money(item.total)}</div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartId)}
                              className="mt-2 text-xs font-semibold text-rose-300 hover:text-rose-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-1 text-sm text-slate-300">
                          <div>Background: {item.background}</div>
                          <div>Personalization: {getPersonalizationLabel(item.personalization)}</div>
                          {item.customName ? <div>Name: {item.customName}</div> : null}
                          {item.customNumber ? <div>Number: {item.customNumber}</div> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center text-slate-400">
                  Your cart is empty. Click <span className="font-semibold text-slate-200">See Options Now</span> to start building your order.
                </div>
              )}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-900/90 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Pre-order total</span>
                <span className="text-xl font-bold text-white">{money(cartTotal)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[30px] border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-sky-950/10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Checkout</p>
            <h2 className="mt-2 text-3xl font-black">Submit your pre-order</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Complete this once after your cart is ready. The form can send directly to a Google Sheet through a Google Apps Script endpoint.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Parent / Buyer Name *</span>
                <input
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                  placeholder="Full name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Email *</span>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                  placeholder="name@email.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Phone *</span>
                <input
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                  placeholder="(555) 555-5555"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Player Name</span>
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                  placeholder="Player name if applicable"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Notes</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-300"
                  placeholder="Anything we should know about your order"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-2xl bg-sky-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Submit Pre-Order
              </button>
              <div className="text-sm text-slate-400">Total: <span className="font-bold text-white">{money(cartTotal)}</span></div>
            </div>

            {message ? (
              <div
                className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                    : status === 'loading'
                    ? 'border border-sky-400/30 bg-sky-500/10 text-sky-200'
                    : 'border border-rose-400/30 bg-rose-500/10 text-rose-200'
                }`}
              >
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
