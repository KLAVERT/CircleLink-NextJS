'use client'

export function PriceEditor() {
  const updatePrice = async () => {
    await fetch('/api/prijzen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'Product A': 25.99 }) // Example
    })
  }

  return <button onClick={updatePrice}>Update Product A to $25.99</button>
}
