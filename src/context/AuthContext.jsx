// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { 
  signupWithEmail, 
  signinWithEmail, 
  signInWithGoogle, 
  signOutUser, 
  resetPassword, 
  deleteAccount 
} from '../services/authService'
import { createOrUpdateUser, getUserData, deleteUserData } from '../services/userService'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setCurrentUser(firebaseUser)
      
      if (firebaseUser) {
        // Fetch user profile from Firestore
        try {
          const profile = await getUserData(firebaseUser.uid)
          setUserProfile(profile)
        } catch (error) {
          console.error('Error loading user profile:', error)
          setUserProfile(null)
        }
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Email & Password Sign Up
  const signup = async (email, password, displayName = '') => {
    const result = await signupWithEmail(email, password)
    
    // Store user data in Firestore
    await createOrUpdateUser(result.user.uid, {
      email: result.user.email,
      displayName: displayName,
      photoURL: '',
      role: 'user'
    })
    
    return result
  }

  // Email & Password Sign In
  const login = async (email, password) => {
    const result = await signinWithEmail(email, password)
    
    // Ensure user data exists in Firestore
    await createOrUpdateUser(result.user.uid, {
      email: result.user.email,
      displayName: result.user.displayName || '',
      photoURL: result.user.photoURL || ''
    })
    
    return result
  }

  // Google Sign-In
  const loginWithGoogle = async () => {
    const result = await signInWithGoogle()
    
    // Store user data in Firestore
    await createOrUpdateUser(result.user.uid, {
      email: result.user.email,
      displayName: result.user.displayName || '',
      photoURL: result.user.photoURL || '',
      role: 'user'
    })
    
    return result
  }

  // Sign Out
  const logout = async () => {
    await signOutUser()
    setUserProfile(null)
  }

  // Reset Password
  const forgotPassword = async (email) => {
    return await resetPassword(email)
  }

  // Delete Account
  const deleteUserAccount = async (password = null) => {
    if (currentUser) {
      await deleteUserData(currentUser.uid)
      await deleteAccount(password)
      setUserProfile(null)
    }
  }

  // Check if user is admin
  const isAdmin = () => {
    return userProfile?.role === 'admin'
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser
  }

  const value = {
    currentUser,
    userProfile,
    user: currentUser, // Keep for backward compatibility
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    forgotPassword,
    deleteUserAccount,
    isAdmin,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
