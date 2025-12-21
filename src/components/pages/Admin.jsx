import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { fetchAllProducts, deleteProduct } from '../../services/productService'
import ProductForm from '../views/ProductForm'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchAllProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeleteLoading(productId)
        await deleteProduct(productId)
        setProducts(products.filter(p => p.id !== productId))
        setError(null)
      } catch (err) {
        console.error('Error deleting product:', err)
        setError('Failed to delete product')
      } finally {
        setDeleteLoading(null)
      }
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleFormSuccess = () => {
    loadProducts()
    handleFormClose()
  }

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your products with full CRUD operations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Top Actions */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <FaPlus /> Add New Product
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
              <ProductForm
                product={editingProduct}
                onSuccess={handleFormSuccess}
                onClose={handleFormClose}
              />
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/30 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-lg mb-4">No products found</p>
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Create First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-800/30 rounded-xl border border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img src={product.image} alt={product.title} className="w-10 h-10 rounded object-cover" />
                        )}
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                        {product.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-purple-400">
                      ${product.price?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {product.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteLoading === product.id}
                          className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          {deleteLoading === product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b border-red-400"></div>
                          ) : (
                            <FaTrash size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-500/30">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-4xl font-bold text-purple-400">{products.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-6 border border-blue-500/30">
            <p className="text-gray-400 text-sm">Filtered Results</p>
            <p className="text-4xl font-bold text-blue-400">{filteredProducts.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg p-6 border border-green-500/30">
            <p className="text-gray-400 text-sm">Total Value</p>
            <p className="text-4xl font-bold text-green-400">
              ${filteredProducts.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
