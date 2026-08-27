import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="landing-nav">
        <Link to="/" className="landing-brand">
          <img src="/logo.png" alt="Pathpholio" />
          <span>Pathpholio</span>
        </Link>

        <nav className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#technology">Technology</a>
        </nav>

        <div className="landing-nav-actions">
          <Link to="/auth" className="landing-signin">
            Sign In
          </Link>

          <Link to="/auth" className="landing-nav-button">
            Get Started
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow">JOB APPLICATION TRACKER</p>

            <h1>
              Keep your job search
              <span> moving forward.</span>
            </h1>

            <p className="landing-hero-text">
              Pathpholio gives you one simple place to organise applications,
              track their progress, and keep important job opportunities within
              reach.
            </p>

            <div className="landing-hero-actions">
              <Link to="/auth" className="landing-primary-button">
                Start Tracking
              </Link>

              <Link to="/app" className="landing-secondary-button">
                Launch App
              </Link>
            </div>
          </div>

          <div className="landing-hero-screenshot">
            <img
              src="/screenshots/dashboard-overview.png"
              alt="Pathpholio dashboard showing application statistics and job tracking"
            />
          </div>
        </section>

        {/* Features */}
        <section className="landing-section" id="features">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">WHAT IT DOES</p>

            <h2>Your applications, without the chaos.</h2>

            <p>
              Keep the important parts of your job search organised in one
              straightforward workspace.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>

              <h3>Track applications</h3>

              <p>
                Save the role, company and original job-posting link for every
                application.
              </p>
            </article>

            <article className="feature-card">
              <span>02</span>

              <h3>Follow progress</h3>

              <p>
                Keep each opportunity organised by its current stage: Applied,
                Interview or Offer.
              </p>
            </article>

            <article className="feature-card">
              <span>03</span>

              <h3>Filter quickly</h3>

              <p>
                Focus on the applications that matter by filtering your
                workspace by status.
              </p>
            </article>

            <article className="feature-card">
              <span>04</span>

              <h3>Keep it synced</h3>

              <p>
                Sign in securely and access application data stored through
                Supabase.
              </p>
            </article>
          </div>
        </section>

        {/* Product View */}
        <section className="landing-product-section">
          <div className="landing-product-copy">
            <p className="landing-eyebrow">THE WORKSPACE</p>

            <h2>Everything you need to follow your applications.</h2>

            <p>
              Add new opportunities, keep their status updated and return to the
              original job posting whenever you need it.
            </p>
          </div>

          <div className="landing-product-screenshot">
            <img
              src="/screenshots/applications-section.png"
              alt="Pathpholio application form and job application list"
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="landing-section how-section" id="how-it-works">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">HOW IT WORKS</p>

            <h2>Simple from the first application.</h2>
          </div>

          <div className="steps-grid">
            <div className="step">
              <strong>01</strong>
              <h3>Create your account</h3>
              <p>
                Sign up with email and password or continue securely with
                Google.
              </p>
            </div>

            <div className="step">
              <strong>02</strong>
              <h3>Add your applications</h3>
              <p>Save the opportunities you want to keep track of.</p>
            </div>

            <div className="step">
              <strong>03</strong>
              <h3>Track the journey</h3>
              <p>Update each application as your job search progresses.</p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section
          className="landing-section technology-section"
          id="technology"
        >
          <div className="technology-copy">
            <p className="landing-eyebrow">BUILT WITH</p>

            <h2>A real application behind the interface.</h2>

            <p>
              Pathpholio is a React application with authentication and
              persistent job-application data powered by Supabase.
            </p>

            <div className="technology-list">
              <span>React</span>
              <span>JavaScript</span>
              <span>Vite</span>
              <span>React Router</span>
              <span>Supabase</span>
              <span>CSS</span>
            </div>
          </div>

          <div className="landing-mobile-preview">
            <img
              src="/screenshots/dashboard-mobile.png"
              alt="Pathpholio dashboard displayed on a mobile screen"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="landing-cta">
          <div>
            <p className="landing-eyebrow">READY TO START?</p>

            <h2>Put your job search in one place.</h2>
          </div>

          <Link to="/auth" className="landing-primary-button">
            Launch Pathpholio
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-brand">
          <img src="/logo.png" alt="" />
          <span>Pathpholio</span>
        </div>

        <p>Built by Git It Bunny.</p>

        <a
          href="https://github.com/gititbunny/pathpholio"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}