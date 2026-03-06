import { useEffect, useState } from "react";
import { getDiscoverMovies } from "../services/moviesApi";
import { Link } from "react-router-dom";

const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 27, name: "Horror" },
];

const BrowseByGenre = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);
      const results = {};
      for (const genre of genresList) {
        try {
          const movies = await getDiscoverMovies({ with_genres: genre.id, sort_by: "popularity.desc" });
          results[genre.name] = movies.slice(0, 5);
        } catch (err) {
          console.error(`Error fetching ${genre.name} movies:`, err.message);
          results[genre.name] = [];
        }
      }
      setMoviesByGenre(results);
      setLoading(false);
    };

    fetchGenreMovies();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading genres...</p>;

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {genresList.map((genre) => (
        <div key={genre.id} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">{genre.name}</h2>
          <div className="flex overflow-x-auto gap-4">
            {moviesByGenre[genre.name]?.length ? (
              moviesByGenre[genre.name].map((movie) => (
                <Link
                  key={movie.id}
                  to={`/details/${movie.id}`}
                  className="flex-shrink-0 w-40 hover:scale-105 transform transition"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-xl shadow-lg"
                  />
                  <p className="text-white mt-2 text-sm font-semibold truncate">{movie.title}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-400">No movies found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseByGenre;