import express from "express";
import {
  fetchTrendingMovies,
  searchMoviesByQuery,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchDiscoverMovies,
  fetchMovieProviders,
} from "../services/tmdbServices.js";

const router = express.Router();

// GET /api/movies/trending
router.get("/trending", fetchTrendingMovies);

// GET /api/movies/search?query=movieName
router.get("/search", searchMoviesByQuery);

// GET /api/movies/top-rated
router.get("/top-rated", fetchTopRatedMovies);

// GET /api/movies/upcoming
router.get("/upcoming", fetchUpcomingMovies);

// GET /api/movies/discover
router.get("/discover", fetchDiscoverMovies);

// GET /api/movies/:id/providers
router.get("/:id/providers", fetchMovieProviders);

export default router;