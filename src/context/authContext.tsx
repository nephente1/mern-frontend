import { createContext, useReducer, useEffect } from 'react';


interface AuthContextTypes {
  user: {email: string; token: string},
  dispatch: (action: any) => void,
}

export const AuthContext = createContext<AuthContextTypes>({
  user: {email: '', token: ''},
  dispatch: () => {},
});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': 
      return { user: action.payload }
    case 'SIGNUP': 
      return { user: null }
    case 'LOGOUT': 
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user})
    }
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}