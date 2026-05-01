import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import React, { Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import { TravelProvider } from './context/TravelContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy load pages for performance optimization
const Home = React.lazy(() => import('./pages/Home'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Favorites = React.lazy(() => import('./pages/Favorites'))
const Login = React.lazy(() => import('./pages/Login'))

// Wrapper to conditionally show footer (hide on Login)
const AppLayout = () => {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-sand-200 border-t-sand-500 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
                <div className="text-8xl mb-4">🗺️</div>
                <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                  The destination you're looking for doesn't exist. Let's get you back on track.
                </p>
                <a href="/" className="btn-primary">← Back to Home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      {!isLogin && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TravelProvider>
          <AppLayout />
        </TravelProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
