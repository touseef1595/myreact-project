import { db } from '../firebase/config'
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, where } from 'firebase/firestore'

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

// Fetch products created by a specific user
export const fetchUserProducts = async (userId) => {
  try {
    const q = query(collection(db, 'products'), where('createdBy', '==', userId))
    const querySnapshot = await getDocs(q)
    const productsList = []
    querySnapshot.forEach((doc) => {
      productsList.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return productsList
  } catch (error) {
    console.error('Error fetching user products:', error)
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

// CREATE - Add a new product (requires authentication)
export const createProduct = async (productData, userId) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to create products')
    }

    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    console.log('Product created with ID:', docRef.id)
    return {
      id: docRef.id,
      ...productData,
      createdBy: userId
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// UPDATE - Update an existing product (with access control)
export const updateProduct = async (productId, updatedData, userId, userRole) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to update products')
    }

    // Check if user is authorized to update this product
    const product = await fetchProductById(productId)
    
    if (!product) {
      throw new Error('Product not found')
    }

    // Admin can update any product, users can only update their own
    if (userRole !== 'admin' && product.createdBy !== userId) {
      throw new Error('You do not have permission to update this product')
    }

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

// DELETE - Delete a product (with access control)
export const deleteProduct = async (productId, userId, userRole) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to delete products')
    }

    // Check if user is authorized to delete this product
    const product = await fetchProductById(productId)
    
    if (!product) {
      throw new Error('Product not found')
    }

    // Admin can delete any product, users can only delete their own
    if (userRole !== 'admin' && product.createdBy !== userId) {
      throw new Error('You do not have permission to delete this product')
    }

    const docRef = doc(db, 'products', productId)
    await deleteDoc(docRef)
    console.log('Product deleted:', productId)
    return { success: true, id: productId }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// Batch DELETE - Delete multiple products (with access control)
export const deleteMultipleProducts = async (productIds, userId, userRole) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to delete products')
    }

    // If not admin, verify ownership of all products
    if (userRole !== 'admin') {
      for (const productId of productIds) {
        const product = await fetchProductById(productId)
        if (product && product.createdBy !== userId) {
          throw new Error(`You do not have permission to delete product: ${productId}`)
        }
      }
    }

    const deletePromises = productIds.map(id => deleteDoc(doc(db, 'products', id)))
    await Promise.all(deletePromises)
    console.log('Products deleted:', productIds)
    return { success: true, deletedCount: productIds.length }
  } catch (error) {
    console.error('Error deleting multiple products:', error)
    throw error
  }
}

// Check if user can edit product
export const canEditProduct = (product, userId, userRole) => {
  if (!userId) return false
  if (userRole === 'admin') return true
  return product.createdBy === userId
}

// Check if user can delete product
export const canDeleteProduct = (product, userId, userRole) => {
  if (!userId) return false
  if (userRole === 'admin') return true
  return product.createdBy === userId
}
