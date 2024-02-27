"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import useRedirectIfAuthenticated from "@/src/hooks/useRedirectIfAuthenticated";
import { axiosInstance } from "@/src/services/fetcher";

function Signin() {
  useRedirectIfAuthenticated("/admin");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      setIsLoading(false);
      // Optionally save the auth token here, e.g., to localStorage
      window.location.href = "/";
      // Redirect to dashboard on success
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data.message || "Failed to sign in");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Signin;
