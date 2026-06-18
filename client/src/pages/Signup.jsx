import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, name);

      if (error) {
        setStatus({ type: "error", message: error.message });
      } else {
        setStatus({
          type: "success",
          message: "Account created! Check your inbox for a verification email.",
        });
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setStatus({ type: "error", message: "An unexpected error occurred during signup." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-stone-950 flex items-center justify-center px-4 md:px-6 overflow-hidden">
      
      <div className="absolute w-96 h-96 bg-stone-900/40 blur-[120px] rounded-full -top-12 -left-12 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-yellow-500/5 blur-[150px] rounded-full -bottom-20 -right-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl md:text-4xl font-black tracking-tight font-[Montserrat] bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent"
          >
            🎬 MovieVerse
          </motion.h1>
          <p className="text-stone-500 text-sm mt-2 font-medium">
            Start building your personal movie watchlist.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-900/20 backdrop-blur-md border border-stone-900 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <h2 className="text-stone-200 text-xl font-bold tracking-tight mb-6">
            Create Account
          </h2>

          {/* feedback notification */}
          <AnimatePresence mode="wait">
            {status.type && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={`mb-5 p-3.5 border rounded-xl text-center ${
                  status.type === "success"
                    ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                    : "bg-red-500/5 border-red-500/10 text-red-400"
                }`}
              >
                <p className="text-xs font-bold tracking-wide">
                  {status.type === "success" ? "✨" : "⚠️"} {status.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
                className="w-full rounded-xl bg-stone-900/50 border border-stone-900 px-4 py-3 text-stone-200 text-sm outline-none focus:border-stone-700 focus:bg-stone-900 transition-all placeholder:text-stone-700 disabled:opacity-50"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full rounded-xl bg-stone-900/50 border border-stone-900 px-4 py-3 text-stone-200 text-sm outline-none focus:border-stone-700 focus:bg-stone-900 transition-all placeholder:text-stone-700 disabled:opacity-50"
              />
            </div>

            {/* password */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                disabled={loading}
                className="w-full rounded-xl bg-stone-900/50 border border-stone-900 px-4 py-3 text-stone-200 text-sm outline-none focus:border-stone-700 focus:bg-stone-900 transition-all placeholder:text-stone-700 disabled:opacity-50"
              />
            </div>

            {/* xonfirm password */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={loading}
                className="w-full rounded-xl bg-stone-900/50 border border-stone-900 px-4 py-3 text-stone-200 text-sm outline-none focus:border-stone-700 focus:bg-stone-900 transition-all placeholder:text-stone-700 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white text-stone-950 py-3.5 text-sm font-black transition shadow-md hover:bg-stone-100 disabled:bg-stone-900 disabled:text-stone-600 active:scale-[0.99] cursor-pointer mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-stone-900/60 pt-5">
            <p className="text-sm text-stone-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-stone-300 hover:text-white font-bold transition underline underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* footer */}
        <p className="text-center text-stone-600 text-xs tracking-widest uppercase font-bold mt-8">
          Save movies • Track progress • Discover more
        </p>
      </div>
    </main>
  );
};

export default Signup;