import { useEffect, useState } from "react";
import { getLatestMovies } from "../services/moviesApi";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);

  // fetch latest movies for slider
  useEffect(() => {
    getLatestMovies().then(({ data, error }) => {
      if (error) {
        setError("Couldn't load latest movies. Please try again.");
        return;
      }
      setMovies(data);
    });
  }, []);

  // auto-slide every 5 seconds
  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-stone-950">
        <p className="text-red-400 text-center font-medium bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20">{error}</p>
      </div>
    );
  }

  if (!movies.length) return null;

  const currentMovie = movies[current];

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] flex items-end overflow-hidden bg-stone-950">
      {/* bg images */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } transition-transform duration-[5000ms]`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-top lg:object-center"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent z-10" />

      {/* content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-20 text-left">
        <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
          Featured Release
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-2xl leading-tight tracking-tight drop-shadow-md mb-4">
          {currentMovie?.title}
        </h1>

        {currentMovie?.overview && (
          <p className="text-sm md:text-base text-stone-300 max-w-xl line-clamp-3 drop-shadow mb-6">
            {currentMovie.overview}
          </p>
        )}

        {/* carousel indicator dots */}
        {/* <div className="flex gap-2 mt-4">
          {movies.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-yellow-500" : "w-2 bg-stone-600 hover:bg-stone-400"
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default HeroSlider;