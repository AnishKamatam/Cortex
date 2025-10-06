import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">Aurora</div>
          <div className="header-buttons">
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Aurora</h1>
          <p className="hero-tagline">From voice to vision, instantly.</p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large">Get Started</button>
            <button className="btn-secondary btn-large">Learn More</button>
          </div>
        </div>
      </main>

      {/* Help Icon */}
      <div className="help-icon">
        <button className="help-button" aria-label="Help">
          <span className="help-question-mark">?</span>
        </button>
      </div>
    </div>
  )
}

export default App
