import { useMemo, useState } from 'react';

const designOptions = [
  {
    id: 't-logo',
    name: 'T Logo Only',
    category: 'Team',
    image: '/images/T Logo Only w_ Variations.png',
    description: 'Clean logo-only decal with multiple layout variations.',
    basePrices: { small: 5, medium: 8, large: 12 },
    supportsPersonalization: false,
  },
  {
    id: 'tribe-bat',
    name: 'TRIBE w/ Bat',
    category: 'Team',
    image: '/images/TRIBE w_ Bat.png',
    description: 'Bold team wordmark with bat styling.',
    basePrices: { small: 6, medium: 9, large: 13 },
    supportsPersonalization: false,
  },
  {
    id: 'tribe-feathers',
    name: 'TRIBE w/ Feathers',
    category: 'Team',
    image: '/images/TRIBE w_ Feathers.png',
    description: 'Script-style team wordmark with feather detail.',
    basePrices: { small: 6, medium: 9, large: 13 },
    supportsPersonalization: false,
  },
  {
    id: 'tribe-skull',
    name: 'Tribe Skull',
    category: 'Team',
    image: '/images/Tribe Skull.png',
    description: 'Mascot-style team decal option.',
    basePrices: { small: 7, medium: 10, large: 14 },
    supportsPersonalization: false,
  },
  {
    id: 'solid-plate',
    name: 'Solid Plate',
    category: 'Personalized',
    image: '/images/Solid Plate w_ Name + Number.png',
    description: 'Home plate decal with personalized name and number.',
    basePrices: { small: 8, medium: 12, large: 16 },
    supportsPersonalization: true,
  },
  {
    id: 'transparent-plate',
    name: 'Transparent Plate',
    category: 'Personalized',
    image: '/images/Transparent Plate w_ Name + Number.png',
    description: 'Transparent home plate style with personalized name and number.',
    basePrices: { small: 8, medium: 12, large: 16 },
    supportsPersonalization: true,
  },
];

const playerOptions = [
  'Asher',
  'Avila',
  'Bjostad',
  'Cooper',
  'Dingman',
  'Mercer',
  'Nichols',
  'Owens',
  'Palmer',
  'Pineda',
  'Potucek',
  'Ross',
];

const personalizationOptions = [
  { id: 'none', label: 'No personalization', price: 0 },
  { id: 'name', label: 'Name only', price: 2 },
  { id: 'number', label: 'Number only', price: 2 },
  { id: 'name-number', label: 'Name + Number', price: 4 },
];

const quantityOptions = [1, 2, 3, 5];
const sizeOptions = [
  { id: 'small', label: 'Small (3”)' },
  { id: 'medium', label: 'Medium (5”)' },
  { id: 'large', label: 'Large (7”)' },
];
const backgroundOptions = ['Die Cut', 'White Background', 'Black Background'];

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-200">
      {children}
    </span>
  );
}

function Input({ label, required = false, children, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-200">
        {label} {required ? <span className="text-sky-300">*</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export default function TribeTeamStoreWebsite() {
  const [selectedDesignId, setSelectedDesignId] = useState(designOptions[0].id);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [personalization, setPersonalization] = useState('none');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [background, setBackground] = useState('Die Cut');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedDesign = useMemo(
    () => designOptions.find((option) => option.id === selectedDesignId) ?? designOptions[0],
    [selectedDesignId],
  );

  const allowedPersonalization = selectedDesign.supportsPersonalization
    ? personalizationOptions
    : [personalizationOptions[0]];

  const effectivePersonalization = selectedDesign.supportsPersonalization ? personalization : 'none';

  const addOnPrice = useMemo(() => {
    const option = personalizationOptions.find((item) => item.id === effectivePersonalization);
    return option?.price ?? 0;
  }, [effectivePersonalization]);

  const unitPrice = (selectedDesign.basePrices[size] ?? 0) + addOnPrice;
  const totalPrice = unitPrice * Number(quantity || 0);

  const summaryLines = [
    selectedDesign.name,
    sizeOptions.find((option) => option.id === size)?.label,
    `Qty ${quantity}`,
    background,
    effectivePersonalization !== 'none'
      ? personalizationOptions.find((item) => item.id === effectivePersonalization)?.label
      : 'No personalization',
  ].filter(Boolean);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
                Clearwater Tribe Team Store
              </p>
              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                Custom decals, player stickers, and team designs.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Pick a design, add personalization if you want it, and submit a clean pre-order right on the site.
                This version is built around your real decal options.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#designs"
                  className="rounded-2xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
                >
                  Shop Decals
                </a>
                <a
                  href="#order-form"
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
                >
                  Build Your Order
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>Team Designs</Badge>
                <Badge>Player Personalization</Badge>
                <Badge>Size-Based Pricing</Badge>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {designOptions.slice(0, 4).map((design) => (
                  <div key={design.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
                    <div className="aspect-square bg-slate-900">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-bold">{design.name}</div>
                      <div className="mt-1 text-xs text-slate-400">{design.category}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Tip: put your actual image files inside <span className="font-mono text-slate-200">public/images</span> so these previews load automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="designs" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Design Gallery</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Your real order options</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            Team-wide decals stay simple. Plate-style decals allow name and number personalization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {designOptions.map((design) => {
            const isSelected = design.id === selectedDesignId;
            return (
              <button
                key={design.id}
                type="button"
                onClick={() => {
                  setSelectedDesignId(design.id);
                  if (!design.supportsPersonalization) {
                    setPersonalization('none');
                    setSelectedPlayer('');
                    setCustomName('');
                    setCustomNumber('');
                  }
                }}
                className={`overflow-hidden rounded-3xl border text-left transition ${
                  isSelected
                    ? 'border-sky-300 bg-sky-400/10 shadow-lg shadow-sky-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className="aspect-[1/1] bg-slate-900">
                  <img src={design.image} alt={design.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold">{design.name}</div>
                      <div className="mt-1 text-sm text-sky-200">{design.category}</div>
                    </div>
                    <Badge>{currency(design.basePrices.medium)} mid</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{design.description}</p>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {design.supportsPersonalization ? 'Name / Number Ready' : 'Team Design'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="order-form" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl md:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Custom Order Form</p>
              <h2 className="mt-2 text-3xl font-black">Build your decal order</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                This version keeps everything on-site. You can wire the submit button to email, AWS, or another backend later.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Selected design" required>
                <select
                  value={selectedDesignId}
                  onChange={(e) => {
                    const nextDesign = designOptions.find((option) => option.id === e.target.value);
                    setSelectedDesignId(e.target.value);
                    if (nextDesign && !nextDesign.supportsPersonalization) {
                      setPersonalization('none');
                      setSelectedPlayer('');
                      setCustomName('');
                      setCustomNumber('');
                    }
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-0 transition focus:border-sky-300"
                >
                  {designOptions.map((design) => (
                    <option key={design.id} value={design.id}>
                      {design.name}
                    </option>
                  ))}
                </select>
              </Input>

              <Input label="Sticker size" required>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                >
                  {sizeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Input>

              <Input label="Quantity" required>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                >
                  {quantityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Input>

              <Input label="Background style">
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                >
                  {backgroundOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Input>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">Personalization</h3>
                <Badge>{selectedDesign.supportsPersonalization ? 'Available' : 'Not needed'}</Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Preset player (optional)" hint="Use this if you want to match one of your existing player files.">
                  <select
                    value={selectedPlayer}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedPlayer(value);
                      if (value && !customName) setCustomName(value);
                    }}
                    disabled={!selectedDesign.supportsPersonalization}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select player</option>
                    {playerOptions.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </Input>

                <Input label="Personalization option">
                  <select
                    value={effectivePersonalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    disabled={!selectedDesign.supportsPersonalization}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {allowedPersonalization.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Input>

                <Input label="Custom name" hint="Leave blank if not needed.">
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    disabled={!selectedDesign.supportsPersonalization || effectivePersonalization === 'number' || effectivePersonalization === 'none'}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Player or family name"
                  />
                </Input>

                <Input label="Custom number" hint="Leave blank if not needed.">
                  <input
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    disabled={!selectedDesign.supportsPersonalization || effectivePersonalization === 'name' || effectivePersonalization === 'none'}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="16"
                  />
                </Input>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold">Buyer information</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <Input label="Buyer name" required>
                  <input
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                    placeholder="Parent or buyer name"
                  />
                </Input>
                <Input label="Email" required>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                    placeholder="name@email.com"
                  />
                </Input>
                <Input label="Phone number" required>
                  <input
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                    placeholder="(555) 555-5555"
                  />
                </Input>
                <Input label="Order notes">
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                    placeholder="Anything you want noted for the order"
                  />
                </Input>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="submit"
                className="rounded-2xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
              >
                Submit Order Request
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDesignId(designOptions[0].id);
                  setSelectedPlayer('');
                  setPersonalization('none');
                  setCustomName('');
                  setCustomNumber('');
                  setSize('medium');
                  setQuantity(1);
                  setBackground('Die Cut');
                  setBuyerName('');
                  setBuyerEmail('');
                  setBuyerPhone('');
                  setNotes('');
                  setSubmitted(false);
                }}
                className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Reset Form
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Order preview captured. Next step: connect this submit action to email, AWS, or your order tracker.
              </div>
            ) : null}
          </form>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Live Summary</p>
                  <h3 className="mt-2 text-2xl font-black">Current order</h3>
                </div>
                <Badge>{currency(totalPrice)}</Badge>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                <img src={selectedDesign.image} alt={selectedDesign.name} className="h-full w-full object-cover" />
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {summaryLines.map((line) => (
                  <div key={line} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <span>{line}</span>
                  </div>
                ))}
                {customName ? (
                  <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <span>Name</span>
                    <span className="font-semibold text-white">{customName}</span>
                  </div>
                ) : null}
                {customNumber ? (
                  <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <span>Number</span>
                    <span className="font-semibold text-white">{customNumber}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Base price</span>
                  <span>{currency(selectedDesign.basePrices[size] ?? 0)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Personalization</span>
                  <span>{currency(addOnPrice)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Quantity</span>
                  <span>x{quantity}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-base font-bold text-white">
                  <span>Total</span>
                  <span>{currency(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sky-300/20 bg-gradient-to-b from-sky-400/10 to-transparent p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Implementation Notes</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>Put the uploaded PNG files inside <span className="font-mono">public/images</span>.</li>
                <li>Wire this form to AWS Lambda, Amplify Data, or an email API when you are ready.</li>
                <li>Use the player preset list for your existing custom name and number assets.</li>
                <li>Keep team-wide logos simple and use plate styles for custom orders.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
