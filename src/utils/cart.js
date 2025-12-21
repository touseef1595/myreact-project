const CART_KEY = 'rp_cart_v1'

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product, qty = 1) {
  const items = getCart()
  const idx = items.findIndex((i) => i.id === product.id)
  if (idx > -1) {
    items[idx].qty += qty
  } else {
    items.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty })
  }
  saveCart(items)
  return items
}

export function updateQty(id, qty) {
  const items = getCart()
  const idx = items.findIndex((i) => i.id === id)
  if (idx > -1) {
    if (qty <= 0) items.splice(idx, 1)
    else items[idx].qty = qty
  }
  saveCart(items)
  return items
}

export function clearCart() {
  saveCart([])
}

export function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0)
}
