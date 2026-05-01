import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { fetchDestinations, getStats } from '../services/api'
import { formatPrice, getCategoryIcon, getCategoryColor } from '../utils/helpers'
import useFetch from '../hooks/useFetch'
import DestinationCard from '../components/DestinationCard'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#d98c30', '#1ca0be', '#9333ea', '#10b981'];

const StatCard = ({ icon, label, value, sublabel, color = 'sand' }) => (
  <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow animate-fade-up`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
      ${color === 'ocean' ? 'bg-ocean-50 dark:bg-ocean-900/30' :
        color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/30' :
        color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/30' :
        'bg-sand-50 dark:bg-sand-900/30'
      }`}>
      {icon}
    </div>
    <div className="font-display text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{label}</div>
    {sublabel && <div className="text-xs text-gray-400 mt-0.5">{sublabel}</div>}
  </div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const { favorites, itinerary, removeFromItinerary } = useTravel()

  const fetchFn = useCallback(() => fetchDestinations(), [])
  const statsFn = useCallback(() => getStats(), [])

  const { data: allDestinations, loading } = useFetch(fetchFn, [])
  const { data: stats } = useFetch(statsFn, [])

  // Recommend destinations not in favorites or itinerary
  const recommended = allDestinations
    ?.filter(d => !favorites.some(f => f.id === d.id) && !itinerary.some(i => i.id === d.id))
    .slice(0, 4) || []

  const totalPlannedBudget = itinerary.reduce((sum, d) => sum + (d.price || 0), 0)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white">
              {user ? `Welcome back, ${user.name.split(' ')[0]}! 👋` : 'Your Dashboard'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {user ? `Member since ${new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : 'Track your travel plans and favorites'}
            </p>
          </div>
          {!user && (
            <Link to="/login" className="btn-primary self-start">
              Sign In for Personalization
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard
            icon="❤️"
            label="Favorites"
            value={favorites.length}
            sublabel="Saved destinations"
            color="sand"
          />
          <StatCard
            icon="✈️"
            label="Travel Plan"
            value={itinerary.length}
            sublabel="Trips planned"
            color="ocean"
          />
          <StatCard
            icon="💰"
            label="Est. Budget"
            value={formatPrice(totalPlannedBudget)}
            sublabel="For your itinerary"
            color="emerald"
          />
          <StatCard
            icon="🌍"
            label="Destinations"
            value={stats?.totalDestinations || 0}
            sublabel={`Across ${stats?.countries || 0} countries`}
            color="purple"
          />
        </div>

        {/* Itinerary Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              My Travel Plan
            </h2>
            <Link to="/" className="text-sm text-sand-600 dark:text-sand-400 hover:underline font-medium">
              + Add destinations
            </Link>
          </div>

          {itinerary.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="text-5xl mb-3">✈️</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                No trips planned yet
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Browse destinations and click "Add to Plan" to start building your itinerary
              </p>
              <Link to="/" className="btn-primary">
                Explore Destinations
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {itinerary.map((dest, i) => (
                <div
                  key={dest.id}
                  className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all animate-fade-up group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sand-100 dark:bg-sand-900/30 text-sand-600 dark:text-sand-400 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{dest.name}</h4>
                      <span className={`badge text-xs px-2 py-0.5 ${getCategoryColor(dest.category)}`}>
                        {getCategoryIcon(dest.category)} {dest.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{dest.country} · {dest.duration}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sand-600 dark:text-sand-400">{formatPrice(dest.price)}</p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                  <button
                    onClick={() => removeFromItinerary(dest.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove from plan"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Budget Summary */}
              <div className="flex items-center justify-between bg-sand-50 dark:bg-sand-900/20 rounded-2xl p-4 border border-sand-100 dark:border-sand-800/30 mt-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Total estimated budget ({itinerary.length} destination{itinerary.length !== 1 ? 's' : ''})
                </span>
                <span className="font-bold text-xl text-sand-600 dark:text-sand-400">
                  {formatPrice(totalPlannedBudget)}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Analytics Dashboard using Recharts */}
        {stats && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Travel Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">Destinations by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(stats.categories).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {Object.entries(stats.categories).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1a1208', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {Object.keys(stats.categories).map((cat, i) => (
                    <div key={cat} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart (Itinerary Budget Allocation) */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">Budget Breakdown</h3>
                {itinerary.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={itinerary}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                          cursor={{ fill: 'rgba(217, 140, 48, 0.05)' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="price" fill="#1ca0be" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400 text-sm italic">
                    Add destinations to your plan to see budget analytics
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Recommended */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Recommended For You
            </h2>
            <Link to="/" className="text-sm text-sand-600 dark:text-sand-400 hover:underline font-medium">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-80 shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
