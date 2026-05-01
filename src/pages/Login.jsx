import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login, register, loading, error } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!isLogin && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const result = isLogin
      ? await login(form.email, form.password)
      : await register(form.name, form.email, form.password)
    if (result.success) navigate('/dashboard')
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const demoLogin = async () => {
    setForm({ name: '', email: 'demo@wanderlust.com', password: 'demo123' })
    const result = await login('demo@wanderlust.com', 'demo123')
    if (result.success) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-950/70 to-gray-950/90" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl animate-fade-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sand-400 to-ocean-500 flex items-center justify-center shadow-md">
                <span className="text-white">✦</span>
              </div>
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">Wanderlust</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Welcome back' : 'Start your journey'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {isLogin ? 'Sign in to access your travel plans' : 'Create your free account'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
            {['Sign In', 'Register'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setErrors({}) }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
                  ${(isLogin ? i === 0 : i === 1)
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Alex Johnson"
                  className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Min. 6 characters"
                className={`input-field ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-sand-500 text-white hover:bg-sand-600
                transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Demo */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-gray-900 px-3 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={demoLogin}
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-medium border border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all
                text-sm active:scale-95 disabled:opacity-60"
            >
              🎯 Try Demo Account
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p className="text-center text-sm text-white/60 mt-6">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Explore
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
