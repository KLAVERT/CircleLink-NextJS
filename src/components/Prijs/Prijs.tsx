'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Prices() {
  const { data, mutate } = useSWR('/api/prijzen', fetcher, { refreshInterval: 5000 })

  if (!data) return <div>Loading...</div>

  return (
    <div>
      {Object.entries(data).map(([name, price]) => (
        <p key={name}>{name}: ${price}</p>
      ))}
    </div>
  )
}
