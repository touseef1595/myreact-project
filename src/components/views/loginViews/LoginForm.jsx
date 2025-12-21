import React, { useState } from 'react'
import InputField from '../../commons/reuseables/InputField'
import Button from '../../commons/reuseables/Button'

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const err = {}
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email'
    if (!form.password) err.password = 'Password is required'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }
    setLoading(true)
    try {
      // Replace with real auth call
      console.log('Logging in', form)
      setTimeout(() => {
        setLoading(false)
        alert('Signed in (demo)')
      }, 600)
    } catch (err) {
      setLoading(false)
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputField
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Your password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
