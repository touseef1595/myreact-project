import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Sidebar from './components/layouts/Sidebar'
import Home from './components/pages/Home'  // Fixed import path
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Products from './components/pages/Products'
import ProductDetail from './components/pages/ProductDetail'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'
import Admin from './components/pages/Admin'
import PageNotFound from './components/pages/PageNotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'




function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App