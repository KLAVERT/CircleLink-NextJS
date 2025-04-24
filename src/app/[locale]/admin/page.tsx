'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function AdminPage() {
  const { data: session } = useSession()
  const [prices, setPrices] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetch('/api/prices').then(res => res.json()).then(setPrices)
  }, [])

  const handleChange = (product: string, newPrice: number) => {
    setPrices(prev => ({ ...prev, [product]: newPrice }))
  }

  const savePrices = async () => {
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prices)
    })
    alert('Prices updated!')
  }

  if (!session) return <p>You must be signed in as admin.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin Price Dashboard</h1>
      {Object.entries(prices).map(([product, price]) => (
        <div key={product} className="mb-2">
          <label className="block mb-1">{product}</label>
          <input
            type="number"
            value={price}
            onChange={(e) => handleChange(product, parseFloat(e.target.value))}
            className="border p-1 rounded"
          />
        </div>
      ))}
      <button onClick={savePrices} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  )
}
