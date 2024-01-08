"use client"
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://kora-api-sfwh.onrender.com/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      const { token } = responseData.data;
      localStorage.setItem('token', token);
      window.location.href = '/admin';
    } catch (error) {
      console.error('Login failed', error);
      setError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex h-screen w-full flex-col items-center justify-center gap-5"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-md rounded-lg p-2 border-b border-slate-300 font-bold text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-md rounded-lg p-2 font-bold border-b border-slate-300 text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <button
        className="w-30 items-center rounded-lg bg-slate-800 px-2 py-1 text-sm font-medium text-white hover:bg-gradient-to-br disabled:hidden"
        type="submit"
      >
        Login
      </button>
      {error && <p>{error}</p>}

    </form>
  );
};

export default Login;
