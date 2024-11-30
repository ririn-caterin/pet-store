"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded-md"
            value={email}
            placeholder="Input Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
