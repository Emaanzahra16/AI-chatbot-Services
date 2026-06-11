'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  function login() {
    if (password === 'admin123') {
      document.cookie = `admin_token=${process.env.NEXT_PUBLIC_APP_NAME}`;
      router.push('/admin');
    } else {
      alert('Wrong password');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-[300px] space-y-3">
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          className="w-full rounded bg-white/10 p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full rounded bg-violet-600 p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}