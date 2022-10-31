import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Cookies from 'js-cookie'
import { getWithToken, postWithoutToken } from '../lib/fetcher'
import { errorHandler } from '../lib/errorHandler'

const { publicRuntimeConfig } = getConfig()

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(undefined)
  const [person, setPerson] = useState(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = !!person

  const logout = () => {
    Cookies.remove('token')
    setPerson(null)
    setIsLoading(false)
    router.push('/sign_in')
  }

  const authenticate = async (token) => {
    setIsLoading(true)
    setError(undefined)

    try {
      const res = await getWithToken(`${publicRuntimeConfig.api_url}/me`, token)

      setPerson(res.subject)
      Cookies.set('token', token)
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (login, password) => {
    return await postWithoutToken(`${publicRuntimeConfig.api_url}/login`, {
      login,
      password,
    })
  }

  const signUp = async ({ login, password, email, display_name }) => {
    return await postWithoutToken(`${publicRuntimeConfig.api_url}/signup`, {
      login,
      password,
      email,
      display_name,
    })
  }

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) return

    authenticate(token)
  }, [])

  useEffect(() => {
    const Component = children.type

    // If it doesn't require auth, everything's good.
    if (!Component.requiresAuth) return

    // If we're already authenticated, everything's good.
    if (isAuthenticated) return

    // If we don't have a token in the cookies, logout
    const token = Cookies.get('token')
    if (!token) {
      return logout()
    }

    // If we're not loading give the try to authenticate with the given token.
    if (!isLoading) {
      authenticate(token)
    }
  }, [isLoading, isAuthenticated, children.type.requiresAuth])

  return (
    <AuthContext.Provider
      value={{
        error,
        person,
        authenticate,
        signIn,
        signUp,
        logout,
        isLoading,
        isAuthenticated: !error && !!person,
        token: Cookies.get('token'),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
