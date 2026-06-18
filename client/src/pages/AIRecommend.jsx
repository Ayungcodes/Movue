import { useState } from "react";
import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

const AIRecommend = ({ openNav, toggleNav }) => {
  const BASE_URL = "https://movue-backend.onrender.com";
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRecommend = async (targetPrompt = prompt) => {
    const activeQuery = targetPrompt.trim();
    if (!activeQuery) return;

    setLoading(true);
    setErrorMsg(null);
    setMovies([]);

    try {
      const res = await fetch(`${BASE_URL}/api/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: activeQuery }),
      });

      if (!res.ok) throw new Error("Our AI engines are running a bit slow. Please try again.");

      const data = await res.json();
      setMovies(data || []);
    } catch (error) {
      console.error("AI recommendation core exception:", error);
      setErrorMsg(error.message || "Failed to generate AI recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setPrompt(suggestionText);
    handleRecommend(suggestionText);
  };

  const suggestions = [
    "Mind bending sci-fi movies",
    "Dark psychological thrillers",
    "Movies like Fight Club",
    "Sad romantic movies",
    "Movies with insane plot twists",
  ];

  return (
    <div className="bg-stone-950 min-h-screen text-white flex flex-col justify-between">
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      <div className="flex-grow pt-[14vh] pb-16 px-4 md:px-10 max-w-7xl mx-auto w-full">
        
        {/* header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight font-[Montserrat] bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 bg-clip-text text-transparent"
          >
            AI Movie Concierge
          </motion.h1>
          <p className="text-stone-400 text-sm md:text-base mt-3">
            Describe your exact mood, vibe, or obscure plot reference and let artificial intelligence curate your next watch.
          </p>
        </div>

        {/* input */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-stone-900/40 border border-stone-900 rounded-2xl backdrop-blur-md shadow-2xl focus-within:border-stone-800 transition duration-300">
            <input
              type="text"
              placeholder="e.g. mind bending sci-fi movies with crazy plot twists..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRecommend()}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-transparent text-stone-200 outline-none placeholder:text-stone-600 text-sm disabled:opacity-50"
            />
            <button
              onClick={() => handleRecommend()}
              disabled={loading || !prompt.trim()}
              className="px-6 py-3 bg-white text-stone-950 font-bold rounded-xl hover:bg-stone-200 disabled:bg-stone-900 disabled:text-stone-600 transition duration-200 text-sm shadow-md active:scale-[0.98]"
            >
              {loading ? "Analyzing..." : "Recommend"}
            </button>
          </div>
        </div>

        {/* suggestions */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center max-w-3xl mx-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold bg-stone-900/40 border border-stone-900 text-stone-400 rounded-xl hover:border-stone-800 hover:text-white transition duration-200 disabled:opacity-40 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* loading/error states */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-8 h-8 border-2 border-stone-800 border-t-yellow-500 rounded-full animate-spin" />
              <p className="text-sm font-semibold text-stone-400 tracking-wide animate-pulse">
                AI is scanning cinematic vector records...
              </p>
            </motion.div>
          )}

          {errorMsg && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6 bg-red-500/5 border border-red-500/10 rounded-2xl max-w-sm mx-auto my-6"
            >
              <p className="text-red-400 font-medium text-xs">{errorMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && movies.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <MoviesCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* footer */}
      {!loading && <Footer />}
    </div>
  );
};

export default AIRecommend;