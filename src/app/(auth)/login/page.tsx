"use client";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("https://kora-api-053t.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const { token } = responseData;
        localStorage.setItem("token", token);
        window.location.href = "/admin";
      } else {
        console.error("Login failed", responseData);
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
        className="text-md rounded-lg border-b border-slate-300 p-2 font-bold text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-md rounded-lg border-b border-slate-300 p-2 font-bold text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <button
        className="w-30 items-center rounded-lg bg-slate-800 px-2 py-1 text-sm font-medium text-white hover:bg-gradient-to-br disabled:hidden"
        type="submit"
      >
        Login
      </button>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default Login;
