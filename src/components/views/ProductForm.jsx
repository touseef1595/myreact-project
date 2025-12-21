import React, { useState, useEffect } from 'react'
import { FaTimes, FaSpinner } from 'react-icons/fa'
import { createProduct, updateProduct } from '../../services/productService'

const ProductForm = ({ product, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        image: product.image || ''
      })
    }
  }, [product])

  const categories = ['electronics', 'fashion', 'home & living', 'beauty', 'sports', 'books', 'food']

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
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

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Valid image URL is required'
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

    try {
      setLoading(true)
      setMessage(null)

      const productPayload = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category.toLowerCase(),
        image: formData.image.trim()
      }

      if (product) {
        // UPDATE
        await updateProduct(product.id, productPayload)
        setMessage({ type: 'success', text: 'Product updated successfully!' })
      } else {
        // CREATE
        await createProduct(productPayload)
        setMessage({ type: 'success', text: 'Product created successfully!' })
      }

      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (error) {
      console.error('Error saving product:', error)
      setMessage({ type: 'error', text: 'Failed to save product. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-lg transition"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-500/20 border border-green-500 text-green-300'
            : 'bg-red-500/20 border border-red-500 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
              errors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'
            }`}
            placeholder="Product title"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                errors.price ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none transition ${
                errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'
              }`}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition resize-none ${
              errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'
            }`}
            placeholder="Product description"
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
              errors.image ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}

          {/* Image Preview */}
          {formData.image && !errors.image && (
            <div className="mt-3">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <img
                src={formData.image}
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
      <div className="flex gap-3 mt-8">
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
          className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProductForm
