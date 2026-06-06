import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

const Signup = () => {
  const { signUp } = UseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Check your email if verification is enabled.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-[#011a2d] flex items-center justify-center px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute w-72 h-72 bg-[#e7e5e4]/10 blur-3xl rounded-full top-20 left-20"></div>

      <div className="absolute w-72 h-72 bg-[#e7e5e4]/5 blur-3xl rounded-full bottom-20 right-20"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-[#e7e5e4] text-4xl font-bold">🎬 MovieVerse</h1>

          <p className="text-gray-400 mt-2">
            Start building your personal movie watchlist.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-[#e7e5e4] text-2xl font-semibold mb-6">
            ✨ Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[#e7e5e4] outline-none focus:border-[#e7e5e4]/50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[#e7e5e4] outline-none focus:border-[#e7e5e4]/50"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[#e7e5e4] outline-none focus:border-[#e7e5e4]/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#e7e5e4] text-[#011a2d] py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-[#e7e5e4] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Save movies. Track progress. Discover more.
        </p>
      </div>
    </main>
  );
}

export default Signup;
