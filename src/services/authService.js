import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { auth } from '../firebase/config'

// Email & Password Sign Up
export const signupWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(result.user)
  return result
}

// Email & Password Sign In
export const signinWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

// Google Sign-In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth, provider)
}

// Sign Out
export const signOutUser = async () => {
  return await signOut(auth)
}

// Reset Password
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}

// Delete Account
export const deleteAccount = async (password = null) => {
  const user = auth.currentUser
  
  if (!user) {
    throw new Error('No user is currently signed in')
  }

  // If user signed in with password, reauthenticate first
  if (password && user.providerData[0]?.providerId === 'password') {
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
  }

  return await deleteUser(user)
}
