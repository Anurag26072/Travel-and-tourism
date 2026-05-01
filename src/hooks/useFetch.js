import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Generic fetch hook that handles loading, error, and data states.
 * @param {Function} fetchFn - Async function that returns { data }
 * @param {Array} deps - Dependency array for re-fetching
 * @param {Object} options - { immediate: bool, initialData: any }
 */
const useFetch = (fetchFn, deps = [], options = {}) => {
  const { immediate = true, initialData = null } = options
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn(...args)
      if (mountedRef.current) {
        setData(result.data)
        return result.data
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message || 'Something went wrong')
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [fetchFn]) // eslint-disable-line

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, deps) // eslint-disable-line

  const reset = useCallback(() => {
    setData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return { data, loading, error, execute, reset }
}

export default useFetch
