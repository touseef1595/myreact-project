import React from 'react'
import { FaShoppingBag, FaTruck, FaShieldAlt, FaUsers, FaStar, FaGlobeAmericas } from 'react-icons/fa'

const About = () => {
  const values = [
    {
      icon: <FaShoppingBag className="text-4xl text-purple-600" />,
      title: 'Quality Products',
      description: 'Curated selection of premium products from trusted sellers worldwide'
    },
    {
      icon: <FaTruck className="text-4xl text-purple-600" />,
      title: 'Fast Shipping',
      description: 'Express delivery options to get your orders quickly and safely'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-purple-600" />,
      title: 'Secure Payment',
      description: 'Industry-leading security with multiple payment options available'
    },
    {
      icon: <FaUsers className="text-4xl text-purple-600" />,
      title: '24/7 Support',
      description: 'Dedicated customer service team ready to help anytime'
    },
    {
      icon: <FaStar className="text-4xl text-purple-600" />,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts'
    },
    {
      icon: <FaGlobeAmericas className="text-4xl text-purple-600" />,
      title: 'Global Reach',
      description: 'Serving millions of customers across multiple countries'
    }
  ]

  const team = [
    { role: 'Founder & CEO', count: '1' },
    { role: 'Product Specialists', count: '50+' },
    { role: 'Customer Support', count: '100+' },
    { role: 'Logistics Partners', count: '200+' }
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">ShopVerse</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your trusted online destination for quality products, exceptional service, and amazing shopping experiences. Since 2015, we've been connecting millions of customers with products they love.
            </p>
            <div className="flex gap-4 justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold">9+</div>
                <div className="text-white/80">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">5M+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-white/80">Premium Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl top-10 right-10"></div>
          <div className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl bottom-10 left-10"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ShopVerse was founded in 2015 with a simple mission: to make online shopping accessible, affordable, and enjoyable for everyone. What started as a small marketplace with just a handful of products has grown into a thriving ecosystem connecting millions of buyers and sellers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that e-commerce should be transparent, secure, and customer-centric. Over the years, we've invested in cutting-edge technology, logistics infrastructure, and customer support to deliver an unmatched shopping experience.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, ShopVerse is one of the fastest-growing e-commerce platforms, trusted by millions of customers and thousands of sellers across the globe.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="ShopVerse Team"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from product selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:transform hover:-translate-y-2 transition duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition duration-300">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To democratize access to quality products worldwide by providing a safe, convenient, and affordable online shopping platform that empowers both customers and sellers to achieve their goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition duration-300">
              <div className="text-5xl mb-6">🔭</div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the world's most trusted and innovative e-commerce platform, known for exceptional quality, customer service, and technological excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Team & Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by passionate people who believe in making online shopping better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition duration-300 group"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition duration-300">
                  {member.count}
                </div>
                <p className="text-gray-700 text-lg font-semibold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Shop?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover thousands of amazing products and join millions of satisfied customers worldwide.
          </p>
          <a
            href="/products"
            className="inline-block px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Start Shopping Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default About