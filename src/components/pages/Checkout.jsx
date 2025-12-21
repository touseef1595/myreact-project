import React, { useState } from 'react'
import { getCart, clearCart } from '../../utils/cart'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const items = getCart()
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    // demo: save order to localStorage orders list
    const ordersRaw = localStorage.getItem('rp_orders_v1')
    const orders = ordersRaw ? JSON.parse(ordersRaw) : []
    orders.push({ id: `o_${Date.now()}`, items, total, customer: form, createdAt: new Date().toISOString() })
    localStorage.setItem('rp_orders_v1', JSON.stringify(orders))
    clearCart()
    setTimeout(() => {
      setSubmitting(false)
      navigate('/orders')
    }, 700)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="mb-4">Items total: <strong>${total.toFixed(2)}</strong></div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Shipping address</label>
              <textarea name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white rounded">{submitting ? 'Placing order...' : 'Place order'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
