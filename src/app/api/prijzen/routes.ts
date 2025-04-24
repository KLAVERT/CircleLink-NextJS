import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  const conn = await pool.getConnection()
  const rows = await conn.query('SELECT name, price FROM products')
  conn.release()
  return NextResponse.json(Object.fromEntries(rows.map(r => [r.name, r.price])))
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const conn = await pool.getConnection()

  for (const [name, price] of Object.entries(data)) {
    await conn.query('UPDATE products SET price = ? WHERE name = ?', [price, name])
  }

  conn.release()
  return NextResponse.json({ status: 'updated', data })
}
