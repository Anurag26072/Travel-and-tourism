import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sand-400 to-ocean-500 flex items-center justify-center">
                <span className="text-white text-sm">✦</span>
              </div>
              <span className="font-display text-xl font-bold text-white">Wanderlust</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-500">
              Your intelligent travel companion for discovering extraordinary destinations
              and crafting unforgettable journeys around the globe.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {['Twitter', 'Instagram', 'Pinterest'].map(s => (
                <button key={s} className="w-9 h-9 rounded-full bg-gray-800 hover:bg-sand-600 flex items-center justify-center transition-colors text-xs text-gray-400 hover:text-white">
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2.5">
              {['All Destinations', 'Beach Escapes', 'Mountain Trails', 'City Breaks', 'Luxury Retreats'].map(l => (
                <li key={l}>
                  <Link to="/" className="text-sm text-gray-500 hover:text-sand-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Account</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Favorites', to: '/favorites' },
                { label: 'Sign In', to: '/login' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-sand-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Crafted with care · Built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
