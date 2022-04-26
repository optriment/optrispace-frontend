import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Cookies from 'js-cookie'

const { publicRuntimeConfig } = getConfig()

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [person, setPerson] = useState(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = !!person

  const logout = ({ redirectLocation }) => {
    Cookies.remove('token')
    setPerson(null)
    setIsLoading(false)
    router.push(redirectLocation || '/sign_in')
  }

  const authenticate = async (token) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${publicRuntimeConfig.api_url}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
      })

      const json = await response.json()

      setPerson(json.subject)
      Cookies.set('token', token)
    } catch (error) {
      console.error({ error })

      setPerson(null)
      Cookies.remove('token')
    }

    setIsLoading(false)
  }

  const signIn = async (login, password) => {
    return await fetch(`${publicRuntimeConfig.api_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ login, password }),
    })
  }

  const signUp = async (login, password) => {
    return await fetch(`${publicRuntimeConfig.api_url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ login, password }),
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
      return logout({ redirectLocation: Component.redirectUnauthenticatedTo })
    }

    // If we're not loading give the try to authenticate with the given token.
    if (!isLoading) {
      authenticate(token)
    }
  }, [isLoading, isAuthenticated, children.type.requiresAuth])

  return (
    <AuthContext.Provider
      value={{
        person,
        authenticate,
        signIn,
        signUp,
        logout,
        isLoading,
        isAuthenticated: !!person,
        token: Cookies.get('token'),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
