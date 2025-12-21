import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProducts } from '../../services/productService'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Products</h2>
          <p className="text-gray-600">Browse our featured products</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative bg-gray-200 h-48">
                  {p.image && (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  {p.category && (
                    <p className="text-xs font-semibold text-indigo-600 uppercase mb-2">{p.category}</p>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.description}</p>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">${p.price?.toFixed(2) || '0.00'}</p>
                  <div className="flex gap-2">
                    <Link to={`/product/${p.id}`} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition text-center">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
