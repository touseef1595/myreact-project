import { db } from '../firebase/config'
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  deleteDoc 
} from 'firebase/firestore'

// Store user data in Firestore (prevent duplicates)
export const createOrUpdateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      // Create new user document
      await setDoc(userRef, {
        uid: userId,
        email: userData.email,
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
        role: userData.role || 'user', // Default role is 'user'
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log('New user created in Firestore')
    } else {
      // Update existing user (only update timestamp and other changeable fields)
      await updateDoc(userRef, {
        displayName: userData.displayName || userSnap.data().displayName,
        photoURL: userData.photoURL || userSnap.data().photoURL,
        updatedAt: serverTimestamp()
      })
      console.log('Existing user updated in Firestore')
    }

    return await getUserData(userId)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    throw error
  }
}

// Get user data from Firestore
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return {
        uid: userId,
        ...userSnap.data()
      }
    } else {
      console.log('User not found in Firestore')
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

// Update user role (Admin only functionality)
export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      role: newRole,
      updatedAt: serverTimestamp()
    })
    console.log('User role updated:', newRole)
  } catch (error) {
    console.error('Error updating user role:', error)
    throw error
  }
}

// Delete user data from Firestore
export const deleteUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
    console.log('User data deleted from Firestore')
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw error
  }
}
