import { useTravel } from '../context/TravelContext'
import { getCategoryColor, getBudgetColor } from '../utils/helpers'

const CATEGORIES = [
  { value: '', label: 'All', icon: '🌍' },
  { value: 'beach', label: 'Beach', icon: '🏖️' },
  { value: 'mountain', label: 'Mountain', icon: '⛰️' },
  { value: 'city', label: 'City', icon: '🏙️' },
]

const BUDGETS = [
  { value: '', label: 'Any Budget' },
  { value: 'budget', label: '$ Budget' },
  { value: 'mid', label: '$$ Mid-Range' },
  { value: 'luxury', label: '$$$ Luxury' },
]

const RATINGS = [
  { value: '', label: 'Any Rating' },
  { value: '4.5', label: '4.5+ ⭐' },
  { value: '4.7', label: '4.7+ ⭐' },
  { value: '4.9', label: '4.9 ⭐ Only' },
]

const FilterPanel = ({ resultCount, totalCount }) => {
  const { filters, updateFilters, clearFilters } = useTravel()
  const hasFilters = filters.category || filters.budget || filters.rating

  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => updateFilters({ category: cat.value })}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 active:scale-95
              ${filters.category === cat.value
                ? 'bg-sand-500 text-white border-sand-500 shadow-sm'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-sand-300 hover:text-sand-600'
              }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Budget and Rating dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.budget}
          onChange={e => updateFilters({ budget: e.target.value })}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
            text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sand-400
            cursor-pointer transition-all hover:border-sand-300"
        >
          {BUDGETS.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>

        <select
          value={filters.rating}
          onChange={e => updateFilters({ rating: e.target.value })}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
            text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sand-400
            cursor-pointer transition-all hover:border-sand-300"
        >
          {RATINGS.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
              text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}

        {/* Result count */}
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {resultCount !== undefined && totalCount !== undefined && (
            <span>
              Showing <span className="font-semibold text-sand-600 dark:text-sand-400">{resultCount}</span>
              {' '}of {totalCount} destinations
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
