import {
  fetchLatestMovies,
  fetchTrendingMovies,
  searchMoviesByQuery,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchDiscoverMovies,
  fetchMovieProviders,
} from "../services/tmdbServices.js";

// GET /api/movies/latest
export const getLatestMovies = async (req, res) => {
  try {
    const movies = await fetchLatestMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest movies" });
  }
};

// GET /api/movies/trending
export const getTrendingMovies = async (req, res) => {
  try {
    const movies = await fetchTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

// GET /api/movies/search?query=movieName
export const searchMovies = async (req, res) => {
  const query = req.query.query;
  try {
    const movies = await searchMoviesByQuery(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies" });
  }
};

// GET /api/movies/top-rated
export const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await fetchTopRatedMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
};

// GET /api/movies/upcoming
export const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await fetchUpcomingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
};

// GET /api/movies/discover
export const getDiscoverMovies = async (req, res) => {
  try {
    const movies = await fetchDiscoverMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discover movies" });
  }
};

// GET /api/movies/:id/providers
export const getMovieProviders = async (req, res) => {
  const movieId = req.params.id;
  try {
    const providers = await fetchMovieProviders(movieId);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie providers" });
  }
};
