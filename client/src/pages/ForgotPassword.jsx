import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const { resetPasswordEmail } = useAuth(); 

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await resetPasswordEmail(email);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Check your email inbox for the password reset link!");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
      console.error("Reset request error:", err);
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
            Don't worry, it happens to the best of us.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-900/20 backdrop-blur-md border border-stone-900 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <h2 className="text-stone-200 text-xl font-bold tracking-tight mb-6">
            Reset Password
          </h2>

          {/* status messages */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mb-5 p-3.5 bg-red-500/5 border border-red-500/10 rounded-xl text-center"
              >
                <p className="text-xs text-red-400 font-bold tracking-wide">
                  ⚠️ {errorMsg}
                </p>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mb-5 p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-center"
              >
                <p className="text-xs text-emerald-400 font-bold tracking-wide">
                  ✅ {successMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={loading || successMsg}
                className="w-full rounded-xl bg-stone-900/50 border border-stone-900 px-4 py-3 text-stone-200 text-sm outline-none focus:border-stone-700 focus:bg-stone-900 transition-all placeholder:text-stone-700 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || successMsg}
              className="w-full rounded-xl bg-white text-stone-950 py-3.5 text-sm font-black transition shadow-md hover:bg-stone-100 disabled:bg-stone-900 disabled:text-stone-600 active:scale-[0.99] cursor-pointer mt-2"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-stone-900/60 pt-5">
            <p className="text-sm text-stone-500 font-medium">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-stone-300 hover:text-white font-bold transition underline underline-offset-4"
              >
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ForgotPassword;