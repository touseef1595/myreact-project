import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from "../commons/reuseables/Button";
import InputField from "../commons/reuseables/InputField";
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaStar,
  FaTag,
  FaArrowRight,
  FaPercent,
  FaHeart
} from 'react-icons/fa'
import { fetchAllProducts } from '../../services/productService'

// Sample product data (fallback)
const defaultFeaturedProducts = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 89.99, oldPrice: 149.99, rating: 4.8, reviews: 234, badge: "Best Seller" },
  { id: 2, name: "Smart Watch Series 8", price: 299.99, oldPrice: 399.99, rating: 4.9, reviews: 512, badge: "New Arrival" },
  { id: 3, name: "4K Action Camera", price: 179.99, oldPrice: null, rating: 4.6, reviews: 89 },
  { id: 4, name: "Ergonomic Office Chair", price: 249.99, oldPrice: 349.99, rating: 4.7, reviews: 178, badge: "30% Off" },
]

const categories = [
  { name: "Electronics", icon: "🔌", color: "from-blue-500 to-cyan-500" },
  { name: "Fashion", icon: "👔", color: "from-purple-500 to-pink-500" },
  { name: "Home & Living", icon: "🏠", color: "from-green-500 to-emerald-500" },
  { name: "Beauty", icon: "💄", color: "from-rose-500 to-pink-600" },
]

const testimonials = [
  { name: "Jessica M.", comment: "Fast shipping and amazing quality! Will definitely order again.", rating: 5 },
  { name: "David Park", comment: "Best prices I found online and customer service was super helpful.", rating: 5 },
  { name: "Amanda L.", comment: "Love the variety and frequent sales. My go-to online store now!", rating: 4 },
]

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const products = await fetchAllProducts()
        // Get first 4 products, or use defaults
        setFeaturedProducts(products.slice(0, 4).length > 0 ? products.slice(0, 4) : defaultFeaturedProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        setFeaturedProducts(defaultFeaturedProducts)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Big Promo Banner */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  <FaPercent className="inline mr-2" /> Limited Time Offer
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Summer Sale
                <br />
                <span className="text-yellow-300">Up to 70% OFF</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-lg">
                Shop the hottest deals on electronics, fashion, home goods & more. 
                Limited stock — grab yours before it's gone!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="large" variant="secondary" className="flex items-center gap-3 text-lg px-8 py-4">
                    Shop Now <FaArrowRight />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="large" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600">
                    View Deals
                  </Button>
                </Link>
              </div>

              <div className="flex gap-10 mt-12">
                {[
                  { number: '500K+', label: 'Happy Customers' },
                  { number: '24/7', label: 'Support' },
                  { number: 'Free', label: 'Shipping*' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500 text-6xl">
                  🛍️
                </div>
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-2xl animate-pulse">
                  -70%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-600">
            <div className="flex flex-col items-center">
              <FaTruck className="text-4xl text-green-500 mb-2" />
              <p className="font-semibold">Free Shipping</p>
              <p className="text-sm">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-4xl text-blue-500 mb-2" />
              <p className="font-semibold">Secure Payment</p>
              <p className="text-sm">100% Protected</p>
            </div>
            <div className="flex flex-col items-center">
              <FaHeadset className="text-4xl text-purple-500 mb-2" />
              <p className="font-semibold">24/7 Support</p>
              <p className="text-sm">Dedicated team</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCreditCard className="text-4xl text-indigo-500 mb-2" />
              <p className="font-semibold">Easy Returns</p>
              <p className="text-sm">30-day guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Shop by Category</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our wide range of premium products across all categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "🔌", color: "from-blue-500 to-cyan-500" },
              { name: "Fashion", icon: "👔", color: "from-purple-500 to-pink-500" },
              { name: "Home & Living", icon: "🏠", color: "from-green-500 to-emerald-500" },
              { name: "Beauty", icon: "💄", color: "from-rose-500 to-pink-600" },
            ].map((cat, i) => (
              <Link to={`/products`} key={i}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80`}></div>
                <div className="relative p-12 text-center text-white">
                  <div className="text-6xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Best Selling Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold">Best Sellers</h2>
              <p className="text-gray-600">Most loved by our customers</p>
            </div>
            <Link to="/products" className="text-purple-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border h-full cursor-pointer">
                    <button className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaHeart className="text-gray-600 hover:text-red-500" />
                    </button>

                    <div className="bg-gray-100 h-64 flex items-center justify-center text-6xl overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        '📦'
                      )}
                    </div>

                    <div className="p-6">
                      {product.category && (
                        <p className="text-xs font-semibold text-indigo-600 uppercase mb-2">{product.category}</p>
                      )}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-purple-600">${product.price?.toFixed(2) || '0.00'}</span>
                      </div>
                      <Button variant="primary" size="medium" className="w-full">
                        View Product
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Jessica M.", comment: "Fast shipping and amazing quality! Will definitely order again.", rating: 5 },
              { name: "David Park", comment: "Best prices I found online and customer service was super helpful.", rating: 5 },
              { name: "Amanda L.", comment: "Love the variety and frequent sales. My go-to online store now!", rating: 4 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }, (_, j) => (
                  <FaStar key={j} className={j < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                ))}</div>
                <p className="text-gray-700 italic mb-6">"{t.comment}"</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">Verified Buyer</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Don’t Miss Out on Amazing Deals!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sign up now and get <strong>15% OFF</strong> your first order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <InputField
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button size="large" variant="secondary">
              Get Discount
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">* No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}

export default Home