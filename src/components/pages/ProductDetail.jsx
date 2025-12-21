import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../../services/productService'
import { addToCart } from '../../utils/cart'
import { FaCheckCircle } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        if (data) {
          setProduct(data)
          setError(null)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        console.error('Error loading product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAdd = () => {
    addToCart(product, qty)
    setAddedToCart(true)
    setTimeout(() => {
      navigate('/cart')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Product not found'}</p>
            <Link to="/products" className="px-5 py-3 bg-indigo-600 text-white rounded-lg">Back to Products</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Alert */}
        {addedToCart && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-3 animate-pulse">
            <FaCheckCircle className="text-green-600 text-xl animate-bounce" />
            <div>
              <p className="font-semibold text-green-700">Added to cart!</p>
              <p className="text-green-600 text-sm">Redirecting to cart...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>
          </div>

          <div>
            {product.category && (
              <p className="text-xs font-semibold text-indigo-600 uppercase mb-3">{product.category}</p>
            )}
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-3xl text-indigo-600 font-bold mb-4">${product.price?.toFixed(2) || '0.00'}</p>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <label className="font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={qty}
                min={1}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-20 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={addedToCart}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <Link to="/products" className="px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
