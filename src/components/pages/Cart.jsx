import React, { useState, useEffect } from 'react'
import { getCart, updateQty, clearCart } from '../../utils/cart'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setItems(getCart())
  }, [])

  const handleChange = (id, value) => {
    const qty = Number(value)
    const updated = updateQty(id, qty)
    setItems(updated)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  const handleClear = () => {
    clearCart()
    setItems([])
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/products" className="px-4 py-2 bg-indigo-600 text-white rounded">Browse products</Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4 mb-6">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                  <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-gray-600">${it.price.toFixed(2)}</div>
                  </div>
                  <input type="number" value={it.qty} min={0} onChange={(e) => handleChange(it.id, e.target.value)} className="w-20 px-2 py-1 border rounded" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <button onClick={handleClear} className="px-4 py-2 border rounded">Clear cart</button>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</div>
                <div className="flex gap-2 justify-end">
                  <button onClick={handleCheckout} className="px-4 py-2 bg-indigo-600 text-white rounded">Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
