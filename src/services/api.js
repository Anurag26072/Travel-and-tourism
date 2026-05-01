import axios from 'axios'

// Mock destinations data — production would point to a real API base
const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    category: 'beach',
    rating: 4.9,
    price: 2400,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    description: 'Iconic white-washed buildings perched on volcanic cliffs overlooking the azure Aegean Sea.',
    tags: ['romantic', 'sunset', 'wine'],
    weather: { temp: 27, condition: 'Sunny', humidity: 55 },
    duration: '5-7 days',
    highlights: ['Oia Sunset', 'Caldera View', 'Wine Tasting', 'Black Sand Beach'],
    lat: 36.3932, lng: 25.4615,
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    category: 'city',
    rating: 4.8,
    price: 1800,
    budget: 'mid',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    description: 'Ancient temples, bamboo groves, and geisha districts preserve Japan\'s imperial heritage.',
    tags: ['culture', 'temples', 'cherry blossom'],
    weather: { temp: 20, condition: 'Partly Cloudy', humidity: 70 },
    duration: '4-6 days',
    highlights: ['Fushimi Inari', 'Arashiyama Bamboo', 'Gion District', 'Nishiki Market'],
    lat: 35.0116, lng: 135.7681,
  },
  {
    id: 3,
    name: 'Patagonia',
    country: 'Argentina/Chile',
    category: 'mountain',
    rating: 4.9,
    price: 3200,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    description: 'Raw wilderness at the edge of the world — jagged peaks, glaciers, and infinite sky.',
    tags: ['hiking', 'adventure', 'glaciers'],
    weather: { temp: 8, condition: 'Windy', humidity: 80 },
    duration: '10-14 days',
    highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'Los Glaciares NP', 'Ushuaia'],
    lat: -50.9423, lng: -73.4068,
  },
  {
    id: 4,
    name: 'Bali',
    country: 'Indonesia',
    category: 'beach',
    rating: 4.7,
    price: 900,
    budget: 'budget',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Tropical paradise with emerald rice terraces, sacred temples, and surf-kissed shores.',
    tags: ['yoga', 'surf', 'spiritual'],
    weather: { temp: 30, condition: 'Tropical', humidity: 85 },
    duration: '7-10 days',
    highlights: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur'],
    lat: -8.3405, lng: 115.0920,
  },
  {
    id: 5,
    name: 'Norwegian Fjords',
    country: 'Norway',
    category: 'mountain',
    rating: 4.8,
    price: 2800,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80',
    description: 'Dramatic fjords carved by ancient glaciers, flanked by waterfalls and charming fishing villages.',
    tags: ['nature', 'aurora', 'cruise'],
    weather: { temp: 12, condition: 'Overcast', humidity: 75 },
    duration: '7-9 days',
    highlights: ['Geirangerfjord', 'Trolltunga', 'Northern Lights', 'Bergen'],
    lat: 60.4720, lng: 8.4689,
  },
  {
    id: 6,
    name: 'Marrakech',
    country: 'Morocco',
    category: 'city',
    rating: 4.6,
    price: 800,
    budget: 'budget',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
    description: 'A sensory labyrinth of souks, spice markets, riads, and the vibrant Djemaa el-Fna square.',
    tags: ['culture', 'food', 'souks'],
    weather: { temp: 32, condition: 'Hot & Dry', humidity: 30 },
    duration: '3-5 days',
    highlights: ['Djemaa el-Fna', 'Majorelle Garden', 'Bahia Palace', 'Medina Souks'],
    lat: 31.6295, lng: -7.9811,
  },
  {
    id: 7,
    name: 'Maldives',
    country: 'Maldives',
    category: 'beach',
    rating: 4.9,
    price: 4500,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Overwater bungalows above crystal-clear lagoons teeming with coral reefs and sea life.',
    tags: ['luxury', 'snorkeling', 'honeymoon'],
    weather: { temp: 29, condition: 'Sunny', humidity: 78 },
    duration: '5-7 days',
    highlights: ['Overwater Villas', 'Coral Snorkeling', 'Whale Shark Diving', 'Sandbank Dining'],
    lat: 3.2028, lng: 73.2207,
  },
  {
    id: 8,
    name: 'Prague',
    country: 'Czech Republic',
    category: 'city',
    rating: 4.7,
    price: 1100,
    budget: 'mid',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    description: 'The City of a Hundred Spires — Gothic cathedrals, Baroque palaces, and medieval magic.',
    tags: ['history', 'architecture', 'beer'],
    weather: { temp: 15, condition: 'Mild', humidity: 65 },
    duration: '3-4 days',
    highlights: ['Prague Castle', 'Charles Bridge', 'Old Town Square', 'Josefov Quarter'],
    lat: 50.0755, lng: 14.4378,
  },
  {
    id: 9,
    name: 'Himalayas Trek',
    country: 'Nepal',
    category: 'mountain',
    rating: 4.8,
    price: 1500,
    budget: 'mid',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    description: 'Trek through the roof of the world — prayer flags, Sherpa villages, and Everest\'s shadow.',
    tags: ['trekking', 'spiritual', 'extreme'],
    weather: { temp: 5, condition: 'Clear', humidity: 40 },
    duration: '14-21 days',
    highlights: ['Everest Base Camp', 'Namche Bazaar', 'Tengboche Monastery', 'Khumbu Icefall'],
    lat: 27.9878, lng: 86.9250,
  },
  {
    id: 10,
    name: 'Amalfi Coast',
    country: 'Italy',
    category: 'beach',
    rating: 4.8,
    price: 2200,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&q=80',
    description: 'Lemon-scented villages clinging to cliffs above the sapphire Tyrrhenian Sea.',
    tags: ['romantic', 'food', 'scenic drive'],
    weather: { temp: 26, condition: 'Mediterranean', humidity: 60 },
    duration: '4-6 days',
    highlights: ['Positano', 'Ravello Gardens', 'Boat Tour', 'Limoncello Tasting'],
    lat: 40.6340, lng: 14.6027,
  },
  {
    id: 11,
    name: 'Bangkok',
    country: 'Thailand',
    category: 'city',
    rating: 4.6,
    price: 700,
    budget: 'budget',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
    description: 'Where golden temples rise beside neon-lit markets and Michelin-starred street food stalls.',
    tags: ['street food', 'temples', 'nightlife'],
    weather: { temp: 34, condition: 'Hot & Humid', humidity: 90 },
    duration: '4-5 days',
    highlights: ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Chao Phraya River'],
    lat: 13.7563, lng: 100.5018,
  },
  {
    id: 12,
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'mountain',
    rating: 4.9,
    price: 3800,
    budget: 'luxury',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    description: 'Crystalline peaks, cozy chalets, world-class skiing, and chocolate-box villages.',
    tags: ['skiing', 'luxury', 'alpine'],
    weather: { temp: -2, condition: 'Snow', humidity: 55 },
    duration: '5-8 days',
    highlights: ['Matterhorn', 'Jungfraujoch', 'Zermatt', 'Interlaken'],
    lat: 46.8182, lng: 8.2275,
  },
]

// Create axios instance (would use base URL in production)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 5000,
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Attach tokens here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login...");
      } else if (error.response.status === 500) {
        console.error("Server error");
      }
    } else if (error.request) {
      console.error("Network error - no response received");
    }
    return Promise.reject(error);
  }
);

// Simulate network delay
const delay = (ms = 600) => new Promise(r => setTimeout(r, ms))

export const fetchDestinations = async () => {
  await delay()
  return { data: MOCK_DESTINATIONS }
}

export const fetchDestinationById = async (id) => {
  await delay(300)
  const dest = MOCK_DESTINATIONS.find(d => d.id === Number(id))
  if (!dest) throw new Error('Destination not found')
  return { data: dest }
}

export const fetchWeather = async (city) => {
  await delay(400)
  // Mock weather data
  const conditions = ['Sunny', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Clear']
  return {
    data: {
      city,
      temp: Math.floor(Math.random() * 30) + 5,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 40) + 40,
      wind: Math.floor(Math.random() * 30) + 5,
    }
  }
}

export const searchDestinations = async (query, filters = {}) => {
  await delay(300)
  let results = [...MOCK_DESTINATIONS]

  if (query) {
    const q = query.toLowerCase()
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q)) ||
      d.description.toLowerCase().includes(q)
    )
  }

  if (filters.category) {
    results = results.filter(d => d.category === filters.category)
  }

  if (filters.budget) {
    results = results.filter(d => d.budget === filters.budget)
  }

  if (filters.rating) {
    results = results.filter(d => d.rating >= parseFloat(filters.rating))
  }

  return { data: results }
}

export const getStats = async () => {
  await delay(400)
  return {
    data: {
      totalDestinations: MOCK_DESTINATIONS.length,
      countries: [...new Set(MOCK_DESTINATIONS.map(d => d.country))].length,
      avgRating: (MOCK_DESTINATIONS.reduce((s, d) => s + d.rating, 0) / MOCK_DESTINATIONS.length).toFixed(1),
      categories: {
        beach: MOCK_DESTINATIONS.filter(d => d.category === 'beach').length,
        mountain: MOCK_DESTINATIONS.filter(d => d.category === 'mountain').length,
        city: MOCK_DESTINATIONS.filter(d => d.category === 'city').length,
      }
    }
  }
}

export default api
