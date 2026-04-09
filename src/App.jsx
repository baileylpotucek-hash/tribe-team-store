import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8oQeV0hmEar0KevvLPUsBumFLytsizNyy5BGN1f-3Pc8ML0VH8Mljv_Cvg8HawpmBtQ/exe';

const PLAYER_OPTIONS = [
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

const PLAYER_T_LOGO_IMAGES = {
  Asher: '/images/Asher T Logo.png',
  Avila: '/images/Avila T Logo.png',
  Bjostad: '/images/Bjostad T Logo.png',
  Cooper: '/images/Cooper T Logo.png',
  Dingman: '/images/Dingman T Logo.png',
  Mercer: '/images/Mercer T Logo.png',
  Nichols: '/images/Nichols T Logo.png',
  Owens: '/images/Owens T Logo.png',
  Palmer: '/images/Palmer T Logo.png',
  Pineda: '/images/Pineda T Logo.png',
  Potucek: '/images/Potucek T Logo.png',
  Ross: '/images/Ross T Logo.png',
};

const PRODUCTS = [
  {
    id: 't-logo',
    name: 'T Logo Only',
    image: '/images/T Logo Only w_ Variations.png',
    description: 'Clean team logo decal.',
    basePrices: { small: 5, medium: 8, large: 12 },
    personalization: false,
    badge: 'Team Favorite',
  },
  {
    id: 't-logo-player',
    name: 'T Logo w/ Variation',
    image: '/images/T Logo Only w_ Variations.png',
    description: 'Columbia Blue T logo customized by player with name, number, or both.',
    basePrices: { small: 7, medium: 10, large: 14 },
    personalization: true,
    badge: 'Player Custom',
    fixedColor: 'Columbia Blue',
    playerSelection: true,
  },
  {
    id: 'tribe-bat',
    name: 'TRIBE w/ Bat',
    image: '/images/TRIBE w_ Bat.png',
    description: 'Bold wordmark decal with athletic styling.',
    basePrices: { small: 6, medium: 9, large: 13 },
    personalization: false,
    badge: 'Classic',
  },
  {
    id: 'tribe-feathers',
    name: 'TRIBE w/ Feathers',
    image: '/images/TRIBE w_ Feathers.png',
    description: 'Script-style decal with feather detail.',
    basePrices: { small: 6, medium: 9, large: 13 },
    personalization: false,
    badge: 'Popular',
  },
  {
    id: 'tribe-skull',
    name: 'Tribe Skull',
    image: '/images/Tribe Skull.png',
    description: 'Mascot-style option for fans wanting something bolder.',
    basePrices: { small: 7, medium: 10, large: 14 },
    personalization: false,
    badge: 'Bold',
  },
  {
    id: 'solid-plate',
    name: 'Solid Plate',
    image: '/images/Solid Plate w_ Name + Number.png',
    description: 'Home plate decal with name and/or number.',
    basePrices: { small: 8, medium: 12, large: 16 },
    personalization: true,
    badge: 'Customizable',
  },
  {
    id: 'transparent-plate',
    name: 'Transparent Plate',
    image: '/images/Transparent Plate w_ Name + Number.png',
    description: 'Transparent plate-style decal with name and/or number.',
    basePrices: { small: 8, medium: 12, large: 16 },
    personalization: true,
    badge: 'Customizable',
  },
];

const SIZES = [
  { id: 'small', label: 'Small (3")' },
  { id: 'medium', label: 'Medium (5")' },
  { id: 'large', label: 'Large (7")' },
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

function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function getPersonalizationLabel(id) {
  return PERSONALIZATION_OPTIONS.find((option) => option.id === id)?.label ?? 'No personalization';
}

function makeCartId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [background, setBackground] = useState('Die Cut');
  const [personalization, setPersonalization] = useState(
    product.playerSelection ? 'name' : 'none'
  );
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const personalizationChoices = product.playerSelection
    ? PERSONALIZATION_OPTIONS.filter((option) => option.id !== 'none')
    : PERSONALIZATION_OPTIONS;

  const addOn =
    PERSONALIZATION_OPTIONS.find((option) => option.id === personalization)?.price ?? 0;

  const unitPrice = (product.basePrices[size] ?? 0) + addOn;
  const itemTotal = unitPrice * quantity;

  const displayImage =
    product.playerSelection && selectedPlayer && PLAYER_T_LOGO_IMAGES[selectedPlayer]
      ? PLAYER_T_LOGO_IMAGES[selectedPlayer]
      : product.image;

  function handleAdd() {
    onAdd({
      cartId: makeCartId(),
      productId: product.id,
      name: product.name,
      image: displayImage,
      size,
      quantity,
      background,
      selectedColor: product.fixedColor || '',
      selectedPlayer,
      personalization,
      customName,
      customNumber,
      unitPrice,
      total: itemTotal,
    });

    setQuantity(1);
    setBackground('Die Cut');
    setCustomName('');
    setCustomNumber('');
    setSelectedPlayer('');
    setPersonalization(product.playerSelection ? 'name' : 'none');
  }

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={displayImage} alt={product.name} className="product-image" />
      </div>

      <div className="product-body">
        <div className="product-head">
          <div>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
          </div>
          <span className="badge">{product.badge}</span>
        </div>

        <div className="product-fields">
          <label>
            <span>Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              {SIZES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Quantity</span>
            <input
              type="number"
              min="1"
              max="25"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>

          <label>
            <span>Background</span>
            <select value={background} onChange={(e) => setBackground(e.target.value)}>
              {BACKGROUNDS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {product.playerSelection ? (
            <>
              <label>
                <span>Color</span>
                <input type="text" value={product.fixedColor} disabled />
              </label>

              <label>
                <span>Player</span>
                <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
                  <option value="">Select player</option>
                  {PLAYER_OPTIONS.map((player) => (
                    <option key={player} value={player}>
                      {player}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : null}

          {product.personalization && (
            <label>
              <span>Personalization</span>
              <select value={personalization} onChange={(e) => setPersonalization(e.target.value)}>
                {personalizationChoices.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!product.playerSelection && product.personalization ? (
            <>
              <label>
                <span>Custom Name</span>
                <input
                  type="text"
                  placeholder="Potucek"
                  value={customName}
                  disabled={personalization === 'none' || personalization === 'number'}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </label>

              <label>
                <span>Custom Number</span>
                <input
                  type="text"
                  placeholder="16"
                  value={customNumber}
                  disabled={personalization === 'none' || personalization === 'name'}
                  onChange={(e) => setCustomNumber(e.target.value)}
                />
              </label>
            </>
          ) : null}
        </div>

        <div className="product-footer">
          <div>
            <div className="muted">Item total</div>
            <div className="price">{money(itemTotal)}</div>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={handleAdd}
            disabled={product.playerSelection && !selectedPlayer}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [cart, setCart] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.total || 0), 0),
    [cart]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  function addToCart(item) {
    setCart((current) => [...current, item]);
    setShowOptions(true);
    setMessage('');
    setStatus('idle');

    setTimeout(() => {
      document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!cart.length) {
      setStatus('error');
      setMessage('Please add at least one item to your cart.');
      return;
    }

    if (!buyerName || !buyerEmail || !buyerPhone) {
      setStatus('error');
      setMessage('Please complete your buyer information.');
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
        design: item.name,
        player: item.selectedPlayer || '',
        size: SIZES.find((option) => option.id === item.size)?.label ?? item.size,
        quantity: item.quantity,
        background: item.background,
        color: item.selectedColor || '',
        personalization: getPersonalizationLabel(item.personalization),
        customName: item.customName,
        customNumber: item.customNumber,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
    };

    if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
      setStatus('error');
      setMessage('Add your Google Apps Script URL in App.jsx before using live submission.');
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
        throw new Error('Request failed');
      }

      setStatus('success');
      setMessage('Pre-order submitted successfully.');
      setCart([]);
      setBuyerName('');
      setBuyerEmail('');
      setBuyerPhone('');
      setPlayerName('');
      setNotes('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong while sending your order.');
    }
  }

  return (
    <div className="store-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Clearwater Tribe Baseball</p>
            <h1>Decals for players, families, and fans.</h1>
            <p className="hero-copy">
              Welcome to the Clearwater Tribe team store. Browse decal options,
              add what you want to your cart, and submit one clean pre-order at checkout.
            </p>

            <div className="pill-row">
              {TEAM_HIGHLIGHTS.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  setShowOptions(true);
                  setTimeout(() => {
                    document.getElementById('options-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
              >
                See Options Now
              </button>

              <a href="#cart-section" className="secondary-btn">
                View Cart {cartCount ? `(${cartCount})` : ''}
              </a>
            </div>
          </div>

          <div className="hero-slideshow">
            <div className="hero-slideshow-card">
              <div className="hero-slideshow-image">
                <img src={PRODUCTS[currentSlide].image} alt={PRODUCTS[currentSlide].name} />
              </div>
              <div className="hero-slideshow-text">
                <strong>{PRODUCTS[currentSlide].name}</strong>
              </div>
            </div>

            <div className="hero-dots">
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Show ${product.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {showOptions && (
        <section id="options-section" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Shop Options</p>
                <h2>Choose your decal style</h2>
              </div>
              <p className="section-copy">
                Three across, simple to browse, and easy to add to cart.
              </p>
            </div>

            <div className="product-grid">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="cart-section" className="section section-alt">
        <div className="container checkout-grid">
          <div className="cart-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Cart</p>
                <h2>Your selections</h2>
              </div>
              <span className="count-badge">
                {cartCount} item{cartCount === 1 ? '' : 's'}
              </span>
            </div>

            <div className="cart-list">
              {cart.length ? (
                cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-body">
                      <div className="cart-item-top">
                        <div>
                          <strong>{item.name}</strong>
                          <div className="muted">
                            {SIZES.find((option) => option.id === item.size)?.label} · Qty {item.quantity}
                          </div>
                        </div>
                        <div className="cart-item-price">{money(item.total)}</div>
                      </div>

                      <div className="cart-meta">
                        {item.selectedPlayer ? <div>Player: {item.selectedPlayer}</div> : null}
                        <div>Background: {item.background}</div>
                        {item.selectedColor ? <div>Color: {item.selectedColor}</div> : null}
                        <div>Personalization: {getPersonalizationLabel(item.personalization)}</div>
                        {item.customName ? <div>Name: {item.customName}</div> : null}
                        {item.customNumber ? <div>Number: {item.customNumber}</div> : null}
                      </div>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  Your cart is empty. Click <strong>See Options Now</strong> to start.
                </div>
              )}
            </div>

            <div className="cart-total">
              <span>Pre-order total</span>
              <strong>{money(cartTotal)}</strong>
            </div>
          </div>

          <form className="checkout-panel" onSubmit={handleSubmit}>
            <p className="eyebrow">Checkout</p>
            <h2>Submit your pre-order</h2>
            <p className="section-copy">
              Complete your details once and send the full cart to your Google Sheet.
            </p>

            <div className="form-grid">
              <label className="full">
                <span>Parent / Buyer Name *</span>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Full name"
                />
              </label>

              <label>
                <span>Email *</span>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="name@email.com"
                />
              </label>

              <label>
                <span>Phone *</span>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                />
              </label>

              <label className="full">
                <span>Player Name</span>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player name if applicable"
                />
              </label>

              <label className="full">
                <span>Notes</span>
                <textarea
                  rows="4"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know about your order"
                />
              </label>
            </div>

            <div className="checkout-actions">
              <button type="submit" className="primary-btn">
                Submit Pre-Order
              </button>
              <div className="checkout-total">
                Total: <strong>{money(cartTotal)}</strong>
              </div>
            </div>

            {message ? <div className={`status-box ${status}`}>{message}</div> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
