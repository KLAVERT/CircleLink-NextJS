'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const t = useTranslations('navigation');
  const locale = useLocale();

  const handleLogin = async () => {
    await signIn('credentials', { username, password, callbackUrl: '/admin' })
  }

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Admin Login</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="block mb-2 border p-2" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="block mb-2 border p-2" />
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}
