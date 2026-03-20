import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const MovieDetails = ({ openNav, toggleNav }) => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getMovieById = async () => {
    const BASE_URL = "https://movue-backend.onrender.com";

    try {
      const res = await fetch(`${BASE_URL}/api/movies/${id}`);
      // console.log("Movie status:", res.status);

      if (!res.ok) {
        throw new Error("Movie not found");
      }

      const data = await res.json();
      setMovie(data);

      const trailerRes = await fetch(`${BASE_URL}/api/movies/${id}/trailer`);

      if (trailerRes.ok) {
        const trailerData = await trailerRes.json();
        setTrailer(trailerData);
      } else {
        setTrailer(null);
      }

      const providerRes = await fetch(`${BASE_URL}/api/movies/${id}/providers`);

      if (providerRes.ok) {
        const providerData = await providerRes.json();
        setProviders(providerData);
      } else {
        setProviders(null);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieById();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar openNav={openNav} toggleNav={toggleNav} />
        <Loader />
      </>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-20 space-y-5">
        <p className="text-stone-200">No movie found.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-yellow-600 text-stone-200 rounded-lg"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* movie */}
      <div className="relative min-h-screen text-white">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 rounded-2xl shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-yellow-600 text-black font-bold px-3 py-1 rounded-full">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>

                <span className="text-gray-300">📅 {movie.release_date}</span>

                <span className="text-gray-300">
                  🔥 Popularity: {Math.round(movie.popularity)}
                </span>
              </div>

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="mt-2.5 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
                >
                  ▶ Watch Trailer
                </button>
              )}

              {providers && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-semibold">Where to Watch</h3>

                  {providers.flatrate?.map((provider) => (
                    <a
                      key={provider.provider_id}
                      href={providers.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-lg w-fit"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-6 h-6 rounded"
                      />

                      <span>Watch on {provider.provider_name}</span>
                    </a>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-6 mt-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-200 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕ Close
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      {/* footer */}
      <Footer />
    </>
  );
};

export default MovieDetails;
