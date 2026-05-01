import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'
import { fetchDestinations } from '../services/api'
import { filterDestinations } from '../utils/helpers'
import useFetch from '../hooks/useFetch'
import DestinationCard from '../components/DestinationCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'

const HERO_STATS = [
  { value: '120+', label: 'Destinations' },
  { value: '50+', label: 'Countries' },
  { value: '4.8★', label: 'Avg Rating' },
  { value: '10k+', label: 'Happy Travelers' },
]

const Home = () => {
  const { searchQuery, filters } = useTravel()

  const fetchFn = useCallback(() => fetchDestinations(), [])
  const { data: destinations, loading, error } = useFetch(fetchFn, [])

  const filtered = destinations ? filterDestinations(destinations, searchQuery, filters) : []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Floating blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sand-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Smart Travel Planning · AI-Powered Recommendations
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up stagger-1">
            Discover Your Next
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand-300 to-ocean-300">
              Great Adventure
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-2">
            Explore handpicked destinations from serene beaches to towering peaks.
            Plan, save, and embark on journeys that leave you breathless.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-up stagger-3">
            <SearchBar
              placeholder="Search beaches, mountains, cities…"
              className="shadow-2xl"
            />
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up stagger-4">
            {['🏖️ Beach', '⛰️ Mountain', '🏙️ City', '💰 Budget', '✨ Luxury'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/20 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-up stagger-5">
            {HERO_STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 80L1440 20C1440 20 1200 80 720 60C240 40 0 80 0 80Z" className="fill-sand-50 dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title mb-1">
              {searchQuery ? `Results for "${searchQuery}"` : 'Top Destinations'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Curated experiences for every kind of traveler
            </p>
          </div>
          <Link
            to="/favorites"
            className="btn-secondary self-start sm:self-auto"
          >
            View Favorites →
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterPanel
            resultCount={filtered.length}
            totalCount={destinations?.length || 0}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-[380px] shimmer animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No destinations found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Section */}
      {!searchQuery && !loading && (
        <section className="bg-gradient-to-br from-sand-50 to-ocean-50 dark:from-gray-900 dark:to-gray-950 py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-4">Plan Your Trip Smarter</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Save favorites, build itineraries, and track your travel wishlist — all in one place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: '❤️', title: 'Save Favorites', desc: 'Bookmark destinations you love for later' },
                { icon: '✈️', title: 'Build Itineraries', desc: 'Organize your travel plan with ease' },
                { icon: '🗺️', title: 'Explore Maps', desc: 'Visualize destinations on interactive maps' },
              ].map(f => (
                <div key={f.title} className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
