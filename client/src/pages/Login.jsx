import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

function Login() {
  const { signIn } = UseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Logged in!");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#011a2d] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-[#e7e5e4] text-4xl font-bold">🎬 MovieVerse</h1>

          <p className="text-gray-400 mt-2">
            Welcome back. Continue your movie journey.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-[#e7e5e4] text-2xl font-semibold mb-6">
            🔐 Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[#e7e5e4] outline-none focus:border-[#e7e5e4]/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#e7e5e4] text-[#011a2d] py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#e7e5e4] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Discover. Save. Watch.
        </p>
      </div>
    </main>
  );
}

export default Login;
