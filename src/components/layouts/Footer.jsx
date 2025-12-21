import React from 'react'
import { FaShoppingBag, FaGithub, FaTwitter, FaLinkedin, FaHeart, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]
  const services = ['Fast Shipping', 'Secure Payment', '24/7 Support', 'Easy Returns', 'Quality Guarantee']

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <FaShoppingBag className="text-3xl text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ShopVerse
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Your ultimate e-commerce destination. Discover amazing products with fast shipping, secure payments, and exceptional customer service.
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white transition-all duration-300 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="block text-gray-300 transition-all duration-300 hover:text-purple-400 hover:translate-x-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Why ShopVerse?</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <p
                  key={service}
                  className="text-gray-300 transition-all duration-300 hover:text-purple-400 hover:translate-x-2"
                >
                  ✓ {service}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-6 text-gray-300 mb-4 md:mb-0">
              <p className="flex items-center gap-2">
                📧 support@shopverse.com
              </p>
              <p className="flex items-center gap-2">
                📞 +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                📍 123 Commerce Street, Shop City
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © 2024 ShopVerse. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-gray-300 text-sm">
              Made with <FaHeart className="text-red-500 animate-heartbeat" /> for amazing shopping experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer



