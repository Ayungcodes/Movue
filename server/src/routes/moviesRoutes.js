import express from "express";
import {
  getLatestMovies,
  getTrendingMovies,
  searchMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
  getMovieProviders,
} from "../controllers/moviesController.js";

const router = express.Router();

// GET /api/movies/latest
router.get("/latest", getLatestMovies);

// GET /api/movies/trending
router.get("/trending", getTrendingMovies);

// GET /api/movies/search?query=movieName
router.get("/search", searchMovies);

// GET /api/movies/top-rated
router.get("/top-rated", getTopRatedMovies);

// GET /api/movies/upcoming
router.get("/upcoming", getUpcomingMovies);

// GET /api/movies/discover
router.get("/discover", getDiscoverMovies);

// GET /api/movies/:id/providers
router.get("/:id/providers", getMovieProviders);

export default router;
