/**
 * Format a price number to currency string
 */
export const formatPrice = (price, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)

/**
 * Truncate text to a given length
 */
export const truncate = (str, len = 100) =>
  str.length <= len ? str : str.slice(0, len).trim() + '…'

/**
 * Generate star display string for a rating
 */
export const ratingToStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  return { full, half, empty: 5 - full - half }
}

/**
 * Get badge color class by category
 */
export const getCategoryColor = (category) => {
  const map = {
    beach: 'bg-ocean-100 text-ocean-700 dark:bg-ocean-900/30 dark:text-ocean-300',
    mountain: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    city: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  }
  return map[category] || 'bg-gray-100 text-gray-700'
}

/**
 * Get budget label color
 */
export const getBudgetColor = (budget) => {
  const map = {
    budget: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    mid: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    luxury: 'bg-sand-100 text-sand-700 dark:bg-sand-900/30 dark:text-sand-300',
  }
  return map[budget] || 'bg-gray-100 text-gray-700'
}

/**
 * Format budget label for display
 */
export const formatBudget = (budget) => {
  const map = { budget: 'Budget', mid: 'Mid-Range', luxury: 'Luxury' }
  return map[budget] || budget
}

/**
 * Get category icon
 */
export const getCategoryIcon = (category) => {
  const map = { beach: '🏖️', mountain: '⛰️', city: '🏙️' }
  return map[category] || '📍'
}

/**
 * Debounce a function call
 */
export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Filter destinations based on search query and filters
 */
export const filterDestinations = (destinations, query, filters) => {
  let results = [...destinations]

  if (query?.trim()) {
    const q = query.toLowerCase()
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags?.some(t => t.toLowerCase().includes(q))
    )
  }

  if (filters?.category) results = results.filter(d => d.category === filters.category)
  if (filters?.budget) results = results.filter(d => d.budget === filters.budget)
  if (filters?.rating) results = results.filter(d => d.rating >= parseFloat(filters.rating))

  return results
}

/**
 * Format a relative date
 */
export const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

/**
 * Capitalize first letter
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
