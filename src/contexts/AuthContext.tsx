// # src/contexts/AuthContext.tsx
import { createContext, useContext, FC, PropsWithChildren } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null | undefined
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)