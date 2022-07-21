import React, { createContext, useReducer } from 'react'

export const defaultDisplayContext = {
  isSmallScreen: false,
  dispatch: () => {},
}

const DisplayContext = createContext(defaultDisplayContext)
export default DisplayContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSmallScreen':
      return { ...state, isSmallScreen: action.payload }
    default:
      return state
  }
}

export const DisplayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultDisplayContext)

  const setSmallScreen = (value) => {
    dispatch({ type: 'setSmallScreen', payload: value })
  }

  return (
    <DisplayContext.Provider
      value={{
        ...state,
        setSmallScreen,
        dispatch,
      }}
    >
      {children}
    </DisplayContext.Provider>
  )
}
