import React, { useState } from 'react'
import InputField from '../commons/reuseables/InputField'
import Button from '../commons/reuseables/Button'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    orderNumber: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required'
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email'
    if (!form.phone.trim()) err.phone = 'Phone is required'
    else if (!/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) err.phone = 'Enter a valid phone number'
    if (!form.subject.trim()) err.subject = 'Subject is required'
    if (!form.message.trim()) err.message = 'Message is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) return setErrors(v)
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      alert("Thank you! Your message has been sent successfully. We'll get back to you soon.")
      setForm({ name: '', email: '', phone: '', subject: '', orderNumber: '', message: '' })
    }, 700)
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-purple-600" />,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      icon: <FaEnvelope className="text-2xl text-purple-600" />,
      title: 'Email',
      details: 'support@shopverse.com',
      hours: 'Response within 24 hours'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-purple-600" />,
      title: 'Address',
      details: '123 Commerce Street, Shop City',
      hours: 'International Shipping'
    }
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you. Get in touch with our friendly team!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-700 font-semibold mb-2">{info.details}</p>
                <p className="text-gray-500 text-sm">{info.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we'll respond as soon as possible</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-lg border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 1: Full Name */}
              <div>
                <InputField
                  label="Full Name *"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <InputField
                  label="Email Address *"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              {/* Field 3: Phone */}
              <div>
                <InputField
                  label="Phone Number *"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>

              {/* Field 4: Subject */}
              <div>
                <InputField
                  label="Subject *"
                  name="subject"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
              </div>

              {/* Field 5: Order Number (Optional) */}
              <div className="md:col-span-2">
                <InputField
                  label="Order Number (Optional)"
                  name="orderNumber"
                  placeholder="e.g., ORD-2024-12345"
                  value={form.orderNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Field 6: Message */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-800 text-sm">Message *</label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-sm transition-all duration-300 bg-white outline-none focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                  placeholder="Please provide details about your inquiry..."
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" disabled={submitting} className="w-full text-lg py-3">
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">
              * Required fields. We'll get back to you within 24 hours.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How long does shipping take?</h3>
              <p className="text-gray-600">Most orders ship within 24-48 hours. Standard delivery takes 5-7 business days, while express shipping takes 2-3 business days.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's your return policy?</h3>
              <p className="text-gray-600">We offer 30-day returns on most items. Simply initiate a return request in your account, and we'll provide a prepaid shipping label.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Do you offer international shipping?</h3>
              <p className="text-gray-600">Yes! We ship to over 100 countries worldwide. International shipping costs and times vary based on destination.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How do I track my order?</h3>
              <p className="text-gray-600">You'll receive a tracking number via email once your order ships. You can track it in real-time from your account dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact