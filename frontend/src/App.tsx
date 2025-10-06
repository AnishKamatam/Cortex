import { useState, useEffect } from 'react'
import { auth } from './lib/auth'
import LoginModal from './components/LoginModal'
import SignUpModal from './components/SignUpModal'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  useEffect(() => {
    // Get initial session
    auth.getCurrentUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
  }

  const handleSignUpSuccess = () => {
    setShowSignUpModal(false)
  }

  const handleLogout = async () => {
    await auth.signOut()
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">Cortex</div>
          <nav className="nav-links">
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>
          <div className="header-buttons">
            {user ? (
              <>
                <span className="user-info">
                  Welcome, {user.firstName || user.email}
                </span>
                <button className="btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn-secondary" onClick={() => setShowLoginModal(true)}>
                  Login
                </button>
                <button className="btn-primary" onClick={() => setShowSignUpModal(true)}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Cortex</h1>
          <p className="hero-tagline">Think. Write. Refine — all in one workspace..</p>
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

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={() => {
          setShowLoginModal(false)
          setShowSignUpModal(true)
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={() => {
          setShowSignUpModal(false)
          setShowLoginModal(true)
        }}
        onSignUpSuccess={handleSignUpSuccess}
      />
    </div>
  )
}

export default App
