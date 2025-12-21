import React, { useState } from 'react'
import InputField from '../../commons/reuseables/InputField'
import Button from '../../commons/reuseables/Button'

const SignupForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
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
    if (!form.password) err.password = 'Password is required'
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) err.confirm = 'Passwords do not match'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }
    setSubmitting(true)
    try {
      // Replace with real API call
      console.log('Submitting', form)
      // simulate success
      setTimeout(() => {
        setSubmitting(false)
        alert('Account created (demo)')
        setForm({ name: '', email: '', password: '', confirm: '' })
      }, 700)
    } catch (err) {
      setSubmitting(false)
      alert('Submission failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputField
        label="Full name"
        name="name"
        placeholder="Jane Doe"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
      />

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
        placeholder="Enter password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <InputField
        label="Confirm password"
        name="confirm"
        type="password"
        placeholder="Repeat password"
        value={form.confirm}
        onChange={handleChange}
        error={errors.confirm}
      />

      <div className="mt-6">
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? 'Creating...' : 'Create account'}
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
