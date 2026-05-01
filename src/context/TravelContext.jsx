import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const TravelContext = createContext(null)

export const useTravel = () => {
  const ctx = useContext(TravelContext)
  if (!ctx) throw new Error('useTravel must be used within TravelProvider')
  return ctx
}

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export const TravelProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => loadFromStorage('travel_favorites', []))
  const [itinerary, setItinerary] = useState(() => loadFromStorage('travel_itinerary', []))
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('travel_darkmode')
    if (stored !== null) return JSON.parse(stored)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ budget: '', rating: '', category: '' })
  const [notification, setNotification] = useState(null)

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('travel_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('travel_itinerary', JSON.stringify(itinerary))
  }, [itinerary])

  useEffect(() => {
    localStorage.setItem('travel_darkmode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const toggleFavorite = useCallback((destination) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === destination.id)
      if (isFav) {
        showNotification(`Removed "${destination.name}" from favorites`, 'info')
        return prev.filter(f => f.id !== destination.id)
      } else {
        showNotification(`Added "${destination.name}" to favorites! ❤️`)
        return [...prev, destination]
      }
    })
  }, [showNotification])

  const isFavorite = useCallback((id) => favorites.some(f => f.id === id), [favorites])

  const addToItinerary = useCallback((destination) => {
    setItinerary(prev => {
      const exists = prev.some(i => i.id === destination.id)
      if (exists) {
        showNotification(`"${destination.name}" is already in your plan`, 'warning')
        return prev
      }
      showNotification(`Added "${destination.name}" to your travel plan! ✈️`)
      return [...prev, { ...destination, addedAt: new Date().toISOString() }]
    })
  }, [showNotification])

  const removeFromItinerary = useCallback((id) => {
    setItinerary(prev => prev.filter(i => i.id !== id))
    showNotification('Removed from travel plan', 'info')
  }, [showNotification])

  const isInItinerary = useCallback((id) => itinerary.some(i => i.id === id), [itinerary])

  const toggleDarkMode = () => setDarkMode(d => !d)

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({ budget: '', rating: '', category: '' })
    setSearchQuery('')
  }, [])

  return (
    <TravelContext.Provider value={{
      favorites, itinerary, darkMode,
      searchQuery, setSearchQuery,
      filters, updateFilters, clearFilters,
      toggleFavorite, isFavorite,
      addToItinerary, removeFromItinerary, isInItinerary,
      toggleDarkMode, notification, showNotification,
    }}>
      {children}
    </TravelContext.Provider>
  )
}
