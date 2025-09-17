import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(form);
      navigate("/home"); // redirect to dashboard
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-[#1e1a17]">
      <div className="w-full max-w-md bg-[#26211e] rounded-2xl shadow-xl p-8 border border-[#3a3028]">
        <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">
          Welcome Back ☕
        </h2>

        {error && (
          <p className="text-red-800 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#2f2925] text-white placeholder-gray-500 border border-[#3a3028] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#2f2925] text-white placeholder-gray-500 border border-[#3a3028] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold transition shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-amber-800 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}