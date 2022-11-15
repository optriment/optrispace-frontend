import React, { createContext, useReducer } from 'react'

export const defaultDisplayContext = {
  isWeb3DebugMode: false,
  dispatch: () => {},
}

const DisplayContext = createContext(defaultDisplayContext)
export default DisplayContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'setIsWeb3DebugMode':
      return { ...state, isWeb3DebugMode: action.payload }
    default:
      return state
  }
}

export const DisplayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultDisplayContext)

  const setIsWeb3DebugMode = (value) => {
    dispatch({ type: 'setIsWeb3DebugMode', payload: value })
  }

  return (
    <DisplayContext.Provider
      value={{
        ...state,
        setIsWeb3DebugMode,
        dispatch,
      }}
    >
      {children}
    </DisplayContext.Provider>
  )
}
