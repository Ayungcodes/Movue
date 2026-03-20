import { useState } from "react";
import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
// eslint-disable-next-line
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const AIRecommend = ({ openNav, toggleNav }) => {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";



  const handleRecommend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMovies([]);

    try {
      const res = await fetch(`${BASE_URL}/api/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setTimeout(() => {
        setMovies(data);
        setLoading(false);
        console.log(data);
      }, 1200);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const suggestions = [
    "Mind bending sci-fi movies",
    "Dark psychological thrillers",
    "Movies like Fight Club",
    "Sad romantic movies",
    "Movies with insane plot twists",
  ];

  return (
    <>
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤖 AI Movie Concierge
          </h1>

          <p className="text-gray-400">
            Tell the AI what kind of movie you're in the mood for.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="e.g. mind bending sci-fi movies with crazy plot twists"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-yellow-500"
          />

          <button
            onClick={handleRecommend}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition"
          >
            Recommend
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setPrompt(s)}
              className="px-4 py-2 text-sm bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              {s}
            </button>
          ))}
        </div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mb-8"
          >
            🤖 AI is thinking...
          </motion.p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <MoviesCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
};

export default AIRecommend;
