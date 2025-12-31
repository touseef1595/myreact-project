import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { FaGoogle, FaShoppingBag, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validatePassword = (pass) => {
    return pass.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setLoading(true)
      await signup(email, password, displayName)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      setError(null)
      setLoading(true)
      await loginWithGoogle()
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Create Account</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join ShopVerse and discover amazing products with exclusive deals
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-purple-100">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <FaShoppingBag className="text-3xl text-purple-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ShopVerse
                </span>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <div>
                  <p className="font-semibold text-green-700">Account created!</p>
                  <p className="text-green-600 text-sm">Redirecting...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-semibold text-sm">{error}</p>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Display Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm font-medium">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogle}
              disabled={loading || success}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-lg" />
              Sign up with Google
            </button>

            {/* Sign In Link */}
            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 font-semibold hover:text-pink-600 transition">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}