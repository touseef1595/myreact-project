import React, { useState, useEffect } from 'react'
import { FaTimes, FaSpinner } from 'react-icons/fa'
import { createProduct, updateProduct } from '../../services/productService'
import { useAuth } from '../../context/AuthContext'

const ProductForm = ({ product, onSuccess, onClose }) => {
  const { currentUser, userProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    stock: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        stock: product.stock || ''
      })
    }
  }, [product])

  const categories = ['electronics', 'fashion', 'home & living', 'beauty', 'sports', 'books', 'food']

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Valid image URL is required'
    }

    if (formData.stock && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      newErrors.stock = 'Valid stock quantity is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!currentUser) {
      setMessage({ type: 'error', text: 'You must be logged in to manage products' })
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      const productPayload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category.toLowerCase(),
        imageUrl: formData.imageUrl.trim(),
        stock: formData.stock ? parseInt(formData.stock) : 0
      }

      if (product) {
        // UPDATE
        await updateProduct(product.id, productPayload, currentUser.uid, userProfile?.role)
        setMessage({ type: 'success', text: 'Product updated successfully!' })
      } else {
        // CREATE
        await createProduct(productPayload, currentUser.uid)
        setMessage({ type: 'success', text: 'Product created successfully!' })
      }

      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (error) {
      console.error('Error saving product:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to save product. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-500 text-green-700'
            : 'bg-red-50 border border-red-500 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="Product name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                errors.price ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                errors.stock ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
              placeholder="0"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition resize-none ${
              errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="Product description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              errors.imageUrl ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}

          {/* Image Preview */}
          {formData.imageUrl && !errors.imageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {product ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProductForm