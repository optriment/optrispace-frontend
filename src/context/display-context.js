import React, { createContext, useReducer } from 'react'

export const defaultDisplayContext = {
  isSmallScreen: false,
  isWeb3DebugMode: true,
  dispatch: () => {},
}

const DisplayContext = createContext(defaultDisplayContext)
export default DisplayContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSmallScreen':
      return { ...state, isSmallScreen: action.payload }
    case 'setIsWeb3DebugMode':
      return { ...state, isWeb3DebugMode: action.payload }
    default:
      return state
  }
}

export const DisplayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultDisplayContext)

  const setSmallScreen = (value) => {
    dispatch({ type: 'setSmallScreen', payload: value })
  }

  const setIsWeb3DebugMode = (value) => {
    dispatch({ type: 'setIsWeb3DebugMode', payload: value })
  }

  return (
    <DisplayContext.Provider
      value={{
        ...state,
        setSmallScreen,
        setIsWeb3DebugMode,
        dispatch,
      }}
    >
      {children}
    </DisplayContext.Provider>
  )
}
