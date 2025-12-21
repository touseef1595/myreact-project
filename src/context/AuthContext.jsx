// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Email / Password
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    // optional: send email verification
    await sendEmailVerification(res.user)
    return res
  }

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  // Password reset
  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  // Google Sign-in
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      resetPassword,
      signInWithGoogle
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
