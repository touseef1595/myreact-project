import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { fetchAllProducts, deleteProduct } from '../../services/productService'
import ProductForm from '../views/ProductForm'
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaUser, FaUserTimes } from 'react-icons/fa'

export default function UserDashboard() {
  const { currentUser, userProfile, logout, deleteUserAccount } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    const productsData = await fetchAllProducts()
    // Filter products created by this user
    const userProducts = productsData.filter(p => p.createdBy === currentUser?.uid)
    setProducts(userProducts)
    setLoading(false)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId, currentUser.uid, userProfile?.role)
        await loadProducts()
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product: ' + error.message)
      }
    }
  }

  const handleProductSaved = () => {
    setShowProductForm(false)
    setSelectedProduct(null)
    loadProducts()
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      try {
        await deleteUserAccount(deletePassword)
        navigate('/signup')
        alert('Your account has been deleted successfully')
      } catch (error) {
        console.error('Error deleting account:', error)
        alert('Failed to delete account: ' + error.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaUser className="text-4xl" />
              <div>
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <p className="text-blue-100">Welcome, {userProfile?.displayName || currentUser?.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteAccount(!showDeleteAccount)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                <FaUserTimes />
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Delete Account Section */}
        {showDeleteAccount && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-red-800 mb-4">Delete Your Account</h3>
            <p className="text-red-700 mb-4">
              Warning: This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <input
                type="password"
                placeholder="Enter your password to confirm"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteAccount(false)
                  setDeletePassword('')
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Product Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <FaPlus />
              Add New Product
            </button>
          </div>

          {/* Product Form Modal */}
          {showProductForm && (
            <div className="mb-6 border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="text-xl font-semibold mb-4">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <ProductForm
                product={selectedProduct}
                onSave={handleProductSaved}
                onCancel={() => {
                  setShowProductForm(false)
                  setSelectedProduct(null)
                }}
              />
            </div>
          )}

          {/* Products List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">You haven't created any products yet. Add your first product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-blue-600">${product.price}</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">My Products</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Email</h3>
            <p className="text-lg font-medium text-gray-800 truncate">{currentUser?.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Role</h3>
            <p className="text-3xl font-bold text-blue-600">User</p>
          </div>
        </div>
      </div>
    </div>
  )
}
