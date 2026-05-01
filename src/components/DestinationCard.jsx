import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTravel } from '../context/TravelContext'
import { formatPrice, getCategoryColor, getBudgetColor, formatBudget, getCategoryIcon } from '../utils/helpers'

const DestinationCard = React.memo(({ destination, index = 0 }) => {
  const { toggleFavorite, isFavorite, addToItinerary, isInItinerary } = useTravel()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fav = isFavorite(destination.id)
  const planned = isInItinerary(destination.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100
        dark:border-gray-800"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shimmer" />
        )}
        {!imgError ? (
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sand-200 to-ocean-200 dark:from-sand-900 dark:to-ocean-900 flex items-center justify-center">
            <span className="text-5xl">{getCategoryIcon(destination.category)}</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`badge text-xs px-2.5 py-1 font-medium ${getCategoryColor(destination.category)}`}>
            {getCategoryIcon(destination.category)} {destination.category}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(destination) }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 shadow-md
            ${fav
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 hover:bg-white'
            }`}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill={fav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Rating pill */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          ⭐ {destination.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-tight">
              {destination.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {destination.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-sand-600 dark:text-sand-400">
              {formatPrice(destination.price)}
            </p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {destination.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className={`badge text-xs px-2 py-0.5 ${getBudgetColor(destination.budget)}`}>
            {formatBudget(destination.budget)}
          </span>
          {destination.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="badge text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {tag}
            </span>
          ))}
          {destination.duration && (
            <span className="badge text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              🕐 {destination.duration}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => addToItinerary(destination)}
            disabled={planned}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95
              ${planned
                ? 'bg-ocean-100 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400 cursor-default'
                : 'bg-sand-500 text-white hover:bg-sand-600 shadow-sm hover:shadow-md'
              }`}
          >
            {planned ? '✓ In Plan' : '✈️ Add to Plan'}
          </button>

          <button
            onClick={() => toggleFavorite(destination)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 active:scale-95
              ${fav
                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-500'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
              }`}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </motion.div>
  )
})

export default DestinationCard
