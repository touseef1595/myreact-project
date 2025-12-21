import { db } from '../firebase/config'
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

// Fetch all products from Firestore
export const fetchAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const productsList = []
    querySnapshot.forEach((doc) => {
      productsList.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return productsList
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      }
    } else {
      console.log('Product not found')
      return null
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const productsList = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.category && data.category.toLowerCase() === category.toLowerCase()) {
        productsList.push({
          id: doc.id,
          ...data
        })
      }
    })
    return productsList
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// CREATE - Add a new product
export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    console.log('Product created with ID:', docRef.id)
    return {
      id: docRef.id,
      ...productData
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// UPDATE - Update an existing product
export const updateProduct = async (productId, updatedData) => {
  try {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    })
    console.log('Product updated:', productId)
    return {
      id: productId,
      ...updatedData
    }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// DELETE - Delete a product
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId)
    await deleteDoc(docRef)
    console.log('Product deleted:', productId)
    return { success: true, id: productId }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// Batch DELETE - Delete multiple products
export const deleteMultipleProducts = async (productIds) => {
  try {
    const deletePromises = productIds.map(id => deleteDoc(doc(db, 'products', id)))
    await Promise.all(deletePromises)
    console.log('Products deleted:', productIds)
    return { success: true, deletedCount: productIds.length }
  } catch (error) {
    console.error('Error deleting multiple products:', error)
    throw error
  }
}
