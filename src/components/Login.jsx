import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { FaGoogle, FaShoppingBag, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const { login, loginWithGoogle, forgotPassword, userProfile } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setLoading(true)
      await login(email, password)
      setSuccess(true)
      
      // Redirect based on user role
      setTimeout(() => {
        // Note: userProfile will be updated after login completes
        navigate('/')
      }, 1500)
    } catch (err) {
      setError(err.message)
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

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      await forgotPassword(resetEmail)
      setResetSuccess(true)
      setTimeout(() => {
        setShowForgotPassword(false)
        setResetSuccess(false)
        setResetEmail('')
      }, 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Sign in to access your ShopVerse account and continue shopping
          </p>
        </div>
      </section>

      {/* Login Form */}
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
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-3 animate-pulse">
                <FaCheckCircle className="text-green-600 text-xl animate-bounce" />
                <div>
                  <p className="font-semibold text-green-700">Sign in successful!</p>
                  <p className="text-green-600 text-sm">Redirecting...</p>
                </div>
              </div>
            )}

            {/* Reset Password Success */}
            {resetSuccess && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-semibold text-green-700">Password reset email sent!</p>
                <p className="text-green-600 text-sm">Check your inbox for reset instructions.</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-semibold text-sm">{error}</p>
              </div>
            )}

            {/* Forgot Password Form */}
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h3>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setResetEmail('')
                      setError(null)
                    }}
                    className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Email Input */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-800">Password</label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-purple-600 hover:text-pink-600 font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
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
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : success ? 'Sign In Successful!' : 'Sign In'}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm font-medium">Or continue with</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Sign In */}
                <button
                  onClick={handleGoogle}
                  disabled={loading || success}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="text-lg" />
                  Continue with Google
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 text-sm mt-8">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-purple-600 font-semibold hover:text-pink-600 transition">
                    Sign up here
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}






