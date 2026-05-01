import { useState, useEffect, useRef } from 'react'
import { useTravel } from '../context/TravelContext'
import { useDebounce } from '../hooks/useDebounce'

const SearchBar = ({ placeholder = 'Search destinations, countries, experiences…', className = '' }) => {
  const { searchQuery, setSearchQuery } = useTravel()
  const [localValue, setLocalValue] = useState(searchQuery)
  const debouncedSearchTerm = useDebounce(localValue, 500)
  const inputRef = useRef(null)

  // Update global search query when debounced value changes
  useEffect(() => {
    setSearchQuery(debouncedSearchTerm)
  }, [debouncedSearchTerm, setSearchQuery])

  // Sync with global state if it changes externally
  useEffect(() => {
    setLocalValue(searchQuery)
  }, [searchQuery])

  const handleChange = (e) => {
    setLocalValue(e.target.value)
  }

  const handleClear = () => {
    setLocalValue('')
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400 group-focus-within:text-sand-500 transition-colors"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-sand-200 dark:border-gray-700
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-sand-400 dark:focus:ring-sand-500
          focus:border-transparent transition-all duration-200 text-base shadow-sm
          hover:shadow-md focus:shadow-md"
      />

      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
