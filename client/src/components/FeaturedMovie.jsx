import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedMovie = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/movies/featured`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeatured();
  }, []);

  if (!movie) return null;

  return (
    <section className="relative h-[90vh] w-full flex items-center text-white overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 max-w-6xl px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
          {movie.title}
        </h1>

        <p className="text-gray-300 max-w-xl mb-6 line-clamp-4">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <Link
            to={`/details/${movie.id}`}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            View Details
          </Link>

          <Link
            to={`/details/${movie.id}`}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            ▶ Watch Trailer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
