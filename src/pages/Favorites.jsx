import { Link } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'
import { formatPrice, getCategoryIcon, getCategoryColor, getBudgetColor, formatBudget } from '../utils/helpers'
import DestinationCard from '../components/DestinationCard'

const Favorites = () => {
  const { favorites, toggleFavorite, addToItinerary, isInItinerary } = useTravel()

  const totalValue = favorites.reduce((sum, d) => sum + d.price, 0)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white">
              My Favorites
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {favorites.length > 0
                ? `${favorites.length} saved destination${favorites.length !== 1 ? 's' : ''} · Est. ${formatPrice(totalValue)} total`
                : 'Your wishlist is waiting to be filled'}
            </p>
          </div>
          {favorites.length > 0 && (
            <Link to="/dashboard" className="btn-primary self-start sm:self-auto">
              View Travel Plan
            </Link>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24 animate-fade-up">
            <div className="w-24 h-24 rounded-full bg-sand-50 dark:bg-sand-900/20 flex items-center justify-center mx-auto mb-6 text-5xl">
              🤍
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              No favorites yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
              Tap the heart icon on any destination to save it here for easy access later.
            </p>
            <Link to="/" className="btn-primary">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="bg-gradient-to-r from-sand-50 to-ocean-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-5 mb-8 border border-sand-100 dark:border-gray-700 animate-fade-up">
              <div className="flex flex-wrap gap-6">
                {[
                  { label: 'Total Saved', value: favorites.length, icon: '❤️' },
                  { label: 'Beach', value: favorites.filter(d => d.category === 'beach').length, icon: '🏖️' },
                  { label: 'Mountain', value: favorites.filter(d => d.category === 'mountain').length, icon: '⛰️' },
                  { label: 'City', value: favorites.filter(d => d.category === 'city').length, icon: '🏙️' },
                  { label: 'Avg Rating', value: favorites.length > 0 ? (favorites.reduce((s,d) => s + d.rating, 0) / favorites.length).toFixed(1) + '★' : '–', icon: '⭐' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg leading-none">{s.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* List view for favorites */}
            <div className="space-y-4 mb-12">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4">
                Saved Destinations
              </h2>
              {favorites.map((dest, i) => (
                <div
                  key={dest.id}
                  className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all animate-fade-up group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl">${getCategoryIcon(dest.category)}</div>`
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg">
                          {dest.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          📍 {dest.country}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sand-600 dark:text-sand-400 text-lg">
                          {formatPrice(dest.price)}
                        </p>
                        <p className="text-xs text-gray-400">per person</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-2">
                      <span className={`badge text-xs px-2 py-0.5 ${getCategoryColor(dest.category)}`}>
                        {getCategoryIcon(dest.category)} {dest.category}
                      </span>
                      <span className={`badge text-xs px-2 py-0.5 ${getBudgetColor(dest.budget)}`}>
                        {formatBudget(dest.budget)}
                      </span>
                      <span className="badge text-xs px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                        ⭐ {dest.rating}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 hidden sm:block">
                      {dest.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => addToItinerary(dest)}
                      disabled={isInItinerary(dest.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap
                        ${isInItinerary(dest.id)
                          ? 'bg-ocean-100 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400'
                          : 'bg-sand-500 text-white hover:bg-sand-600 active:scale-95'
                        }`}
                    >
                      {isInItinerary(dest.id) ? '✓ Planned' : '✈️ Plan'}
                    </button>
                    <button
                      onClick={() => toggleFavorite(dest)}
                      className="px-3 py-2 rounded-xl text-xs font-medium border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95 whitespace-nowrap"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Card grid view */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">
                Card View
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((dest, i) => (
                  <DestinationCard key={`card-${dest.id}`} destination={dest} index={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Favorites
