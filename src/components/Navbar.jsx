import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { favorites, itinerary, darkMode, toggleDarkMode, notification } = useTravel()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Explore' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/favorites', label: 'Favorites', badge: favorites.length },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div
          key={notification.id}
          className={`fixed top-20 right-4 z-50 max-w-xs px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium
            animate-fade-up transition-all
            ${notification.type === 'success' ? 'bg-emerald-500' :
              notification.type === 'info' ? 'bg-ocean-500' :
              notification.type === 'warning' ? 'bg-sand-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${scrolled
            ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-sand-100 dark:border-gray-800'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sand-400 to-ocean-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white text-sm">✦</span>
              </div>
              <span className={`font-display text-xl font-bold tracking-tight transition-colors
                ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                Wanderlust
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                    ${isActive
                      ? 'bg-sand-500 text-white shadow-sm'
                      : scrolled
                        ? 'text-gray-700 dark:text-gray-300 hover:bg-sand-50 dark:hover:bg-gray-800'
                        : 'text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                  {link.badge > 0 && (
                    <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-red-500 text-white rounded-full">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                  ${scrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white/80 hover:bg-white/10'
                  }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Itinerary badge */}
              {itinerary.length > 0 && (
                <Link
                  to="/dashboard"
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${scrolled
                      ? 'bg-ocean-50 text-ocean-600 dark:bg-ocean-900/30 dark:text-ocean-400 hover:bg-ocean-100'
                      : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  <span>✈️</span> {itinerary.length} planned
                </Link>
              )}

              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sand-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block max-w-24 truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-sand-500 text-white hover:bg-sand-600 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all
                  ${scrolled ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
              >
                {menuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-lg animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-sand-50 dark:bg-sand-900/20 text-sand-600 dark:text-sand-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
