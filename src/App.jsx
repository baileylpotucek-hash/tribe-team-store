const designs = [
  {
    name: 'T Logo Only',
    image: 'https://placehold.co/900x900/0f172a/e2e8f0?text=T+Logo+Only',
    description:
      'Simple and clean team decal. Great for bottles, binders, coolers, and cars.',
    price: 'From $5',
    formLink: 'https://forms.gle/replace-this-with-your-google-form-link',
  },
  {
    name: 'Name + Number',
    image: 'https://placehold.co/900x900/0f172a/e2e8f0?text=Name+%2B+Number',
    description:
      'Personalized design with player name and number. Perfect for custom orders.',
    price: 'From $9',
    formLink: 'https://forms.gle/replace-this-with-your-google-form-link',
  },
  {
    name: 'Home Plate + Bats',
    image: 'https://placehold.co/900x900/0f172a/e2e8f0?text=Home+Plate+%2B+Bats',
    description:
      'Bold badge-style decal with a classic baseball look.',
    price: 'From $8',
    formLink: 'https://forms.gle/replace-this-with-your-google-form-link',
  },
  {
    name: 'Script Tribe',
    image: 'https://placehold.co/900x900/0f172a/e2e8f0?text=Script+Tribe',
    description:
      'Full team vibe in a script-style logo for fans who want the complete look.',
    price: 'From $8',
    formLink: 'https://forms.gle/replace-this-with-your-google-form-link',
  },
]

const faqs = [
  {
    question: 'How do orders work?',
    answer:
      'Choose your design, pick your size, add a name and/or number if you want, and submit your pre-order. Orders are fulfilled after the deadline.',
  },
  {
    question: 'Can I personalize a decal?',
    answer:
      'Yes. Most designs can be ordered plain or customized with a name, number, or both.',
  },
  {
    question: 'How will I pay?',
    answer:
      'Use your Google Form process to collect order details, then invoice separately through your preferred payment method.',
  },
]

export default function App() {
  return (
    <div className="site-shell">
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Tribe Baseball</div>
            <h1>Custom decal pre-orders made simple.</h1>
            <p className="hero-copy">
              Launch a clean team store for decals, stickers, and personalized
              player items. Parents pick a design, add a name or number, and
              submit their order in minutes.
            </p>
            <div className="button-row">
              <a className="btn btn-primary" href="#designs">
                Shop Designs
              </a>
              <a className="btn btn-secondary" href="#how-it-works">
                How It Works
              </a>
            </div>
          </div>

          <div className="hero-cards">
            <div className="info-card">
              <div className="placeholder-box" />
              <h3>Player Decals</h3>
              <p>Add player name, number, and preferred style.</p>
            </div>
            <div className="info-card shifted">
              <div className="placeholder-box" />
              <h3>Simple Checkout Flow</h3>
              <p>Ideal for pre-orders fulfilled through your vendor.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="designs" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Shop</div>
                <h2>Choose your decal style</h2>
              </div>
              <p>
                Swap in your real design images, update pricing, and link each
                order button to your Google Form.
              </p>
            </div>

            <div className="card-grid">
              {designs.map((design) => (
                <article className="product-card" key={design.name}>
                  <img src={design.image} alt={design.name} />
                  <div className="product-card-body">
                    <div className="product-title-row">
                      <h3>{design.name}</h3>
                      <span className="pill">{design.price}</span>
                    </div>
                    <p>{design.description}</p>
                    <a
                      className="btn btn-light"
                      href={design.formLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Order This Design
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container steps-grid">
            <div className="step-card">
              <h3>1. Pick a design</h3>
              <p>Choose the decal style that fits your player, family, or fan gear best.</p>
            </div>
            <div className="step-card">
              <h3>2. Customize it</h3>
              <p>Add a player name, number, size, and any optional details you want included.</p>
            </div>
            <div className="step-card">
              <h3>3. Submit pre-order</h3>
              <p>Complete the order form before the deadline and wait for your invoice or confirmation.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section">
          <div className="container feature-grid">
            <div className="feature-panel">
              <div className="eyebrow">Customization</div>
              <h2>Offer simple add-ons without making ordering confusing.</h2>
              <div className="mini-grid">
                <div className="mini-card">
                  <h3>Size Tiers</h3>
                  <p>Small, Medium, Large</p>
                </div>
                <div className="mini-card">
                  <h3>Personalization</h3>
                  <p>Optional name and number add-on</p>
                </div>
                <div className="mini-card">
                  <h3>Background Styles</h3>
                  <p>Black, white, or die-cut</p>
                </div>
                <div className="mini-card">
                  <h3>Order Deadline</h3>
                  <p>Create urgency for faster submissions</p>
                </div>
              </div>
            </div>

            <aside className="checklist-panel">
              <div className="eyebrow">Launch Checklist</div>
              <ul>
                <li>Upload your real decal images</li>
                <li>Set base prices by size</li>
                <li>Add name/number upcharges</li>
                <li>Replace the Google Form links</li>
                <li>Share the site with parents and team chat</li>
              </ul>
              <a
                className="btn btn-primary full"
                href="https://forms.gle/replace-this-with-your-google-form-link"
                target="_blank"
                rel="noreferrer"
              >
                Add Google Form Link
              </a>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container faq-wrap">
            <div className="eyebrow">FAQ</div>
            <h2>Quick answers for parents and team supporters</h2>
            <div className="faq-grid">
              {faqs.map((faq) => (
                <div className="faq-card" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <div className="eyebrow dark">Ready to launch?</div>
            <h2>Turn this into your live team pre-order page.</h2>
            <p>
              Replace the sample images, update your real pricing, and publish
              it as a simple team merch landing page.
            </p>
          </div>
          <a className="btn btn-dark" href="#designs">
            Start Customizing
          </a>
        </div>
      </footer>
    </div>
  )
}
