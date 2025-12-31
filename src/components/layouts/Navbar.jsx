import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FaShoppingBag, 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaShoppingCart,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa'
import { cartCount } from '../../utils/cart'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [count, setCount] = useState(0)
  const { currentUser, userProfile, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const refresh = () => setCount(cartCount())
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (e, to) => {
    if (location.pathname !== to) {
      e.preventDefault()
      navigate(to)
      setIsOpen(false)
    } else {
      setIsOpen(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
      setIsOpen(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const getDashboardLink = () => {
    if (userProfile?.role === 'admin') {
      return '/admin-dashboard'
    }
    return '/user-dashboard'
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-purple-500/10'
          : 'bg-white/95 backdrop-blur-lg border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Updated Logo */}
          <div className="flex items-center gap-3 z-50">
            <FaShoppingBag className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ShopVerse
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <div className="flex items-center gap-8">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className="text-gray-700 font-medium px-4 py-2 rounded-full transition-all duration-300 relative group hover:text-purple-600"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 transform -translate-x-1/2"></span>
                </a>
              ))}
              {userProfile?.role === 'admin' && (
                <a
                  href="/admin"
                  onClick={(e) => handleNavClick(e, '/admin')}
                  className="text-gray-700 font-medium px-4 py-2 rounded-full transition-all duration-300 relative group hover:text-purple-600"
                >
                  Admin
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 transform -translate-x-1/2"></span>
                </a>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-full outline-none transition-all duration-300 bg-white/80 w-48 focus:w-60 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>

            {/* User Icons */}
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FaShoppingCart />
                <span className="text-sm">Cart</span>
                {count > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </Link>

              {currentUser ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-600 rounded-full font-medium transition-all duration-300 hover:bg-purple-100"
                  >
                    <FaUser />
                    <span className="text-sm">{userProfile?.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-full font-medium transition-all duration-300 hover:bg-red-100"
                  >
                    <FaSignOutAlt />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 bg-transparent text-purple-600 border-2 border-purple-600 rounded-full font-medium transition-all duration-300 hover:bg-purple-600 hover:text-white"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-purple-600 p-2"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl md:hidden transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className="text-2xl font-medium text-gray-700 transition-all duration-300 hover:text-purple-600 hover:transform hover:scale-110"
                >
                  {item.label}
                </a>
              ))}
              {userProfile?.role === 'admin' && (
                <a
                  href="/admin"
                  onClick={(e) => handleNavClick(e, '/admin')}
                  className="text-2xl font-medium text-gray-700 transition-all duration-300 hover:text-purple-600 hover:transform hover:scale-110"
                >
                  Admin
                </a>
              )}

              {/* Mobile Search */}
              <div className="relative mt-8">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-12 pr-6 py-3 border-2 border-gray-300 rounded-full outline-none transition-all duration-300 bg-white w-64 focus:border-purple-500"
                />
              </div>

              {/* Mobile Auth */}
              <div className="flex flex-col gap-4 mt-8">
                {currentUser ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-purple-50 text-purple-600 rounded-full font-medium text-lg"
                    >
                      <FaUser />
                      {userProfile?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-red-50 text-red-600 rounded-full font-medium text-lg"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-8 py-3 bg-transparent text-purple-600 border-2 border-purple-600 rounded-full font-medium text-lg"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium text-lg"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Animated Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 top-1/4 -left-12 animate-float"></div>
            <div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 top-1/2 -right-16 animate-float"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 bottom-1/4 left-1/4 animate-float"
              style={{ animationDelay: '4s' }}
            ></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
