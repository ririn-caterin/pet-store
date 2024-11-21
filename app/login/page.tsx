"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Input Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Input Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Create an Account
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
