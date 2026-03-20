import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiscoverMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const genreMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  drama: 18,
  family: 10751,
  fantasy: 14,
  "sci-fi": 878,
  thriller: 53,
  horror: 27,
};

const GenrePage = ({ openNav, toggleNav }) => {
  const { genre } = useParams();

  const genreId = genreMap[genre];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [movies]);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);

      try {
        const data = await getDiscoverMovies({
          with_genres: genreId,
          sort_by: "popularity.desc",
        });

        setMovies(data);
      } catch (err) {
        console.error("Error fetching genre movies:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchGenreMovies();
    }
  }, [genreId]);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* page title */}

      {/* movies grid */}
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="text-white text-3xl font-bold px-6 mt-10 capitalize">
              {genre} Movies
            </h1>
            <div className="px-6 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MoviesCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Footer />
          </div>
        )}
      </div>
      {/* footer */}
    </>
  );
};

export default GenrePage;
