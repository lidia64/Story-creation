import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, verifyEmail } from "../Services/authService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("register"); // "register" | "verify"
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setErrorMessage("");
      setStep("verify");
    },
    onError: (error) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMessage(message);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setErrorMessage("");
      navigate("/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid or expired code. Please try again.";
      setErrorMessage(message);
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    registerMutation.mutate({ email, password });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setErrorMessage("");
    verifyMutation.mutate({ email, otp });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-violet-100">

        {step === "register" ? (
          <>
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-700 mb-3">
                Join Us
              </span>
              <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
              <p className="mt-2 text-sm text-slate-500">Start sharing your stories today</p>
            </div>

            {errorMessage && (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="register-password">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
              >
                {registerMutation.isPending ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-900">
                Login
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="mb-6 text-center">
              <span className="text-4xl">📧</span>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">Check Your Email</h1>
              <p className="mt-2 text-sm text-slate-500">
                We sent a 6-digit verification code to{" "}
                <span className="font-semibold text-slate-700">{email}</span>
              </p>
            </div>

            {errorMessage && (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="otp">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-xl font-bold tracking-widest text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
              <button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => { setStep("register"); setErrorMessage(""); }}
              className="mt-4 w-full text-center text-sm text-slate-400 hover:text-slate-600"
            >
              ← Back to registration
            </button>
          </>
        )}
      </section>
    </div>
  );
}
