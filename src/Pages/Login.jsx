import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { loginUser } from "../Services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.accessToken, { email });
      navigate("/ViewStory");
    },
    onError: (error) => {
      const msg = error.response?.data?.error || "";
      if (msg.toLowerCase().includes("verify")) {
        setErrorMessage("Please verify your email before logging in. Check your inbox for the verification code.");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-violet-100">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-700 mb-3">
            Welcome Back
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="mt-2 text-sm text-slate-500">Access your stories and account</p>
        </div>

        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
          >
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Need an account?{" "}
          <Link to="/register" className="font-semibold text-violet-700 hover:text-violet-900">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
}
