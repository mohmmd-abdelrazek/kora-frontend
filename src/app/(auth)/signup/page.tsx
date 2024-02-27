"use client";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/src/services/fetcher";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // Minimum eight characters, at least one letter and one number

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!validateEmail(formData.email)) {
      newErrors.push("Invalid email format");
    }
    if (!validatePassword(formData.password)) {
      newErrors.push(
        "Password must be at least 8 characters long and include both letters and numbers",
      );
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset messages when user starts editing again
    setSuccessMessage("");
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop form submission if validation fails

    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      const logout = await axiosInstance.get("/auth/logout");
      setSuccessMessage("Signup successful! Redirecting...");
      // Clear any previous errors
      setErrors([]);
      // Redirect user on success
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait a couple of seconds before redirecting for user to read the message
    } catch (error) {
      if (isAxiosError(error)) {
        setErrors([
          error.response?.data?.error || "An unknown error occurred.",
        ]);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Signup;
