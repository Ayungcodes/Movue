import express from "express";
import {
  getLatestMovies,
  getTrendingMovies,
  searchMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
  getMovieProviders,
  getMovieById,
  getMovieTrailer
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/latest", getLatestMovies);
router.get("/trending", getTrendingMovies);
router.get("/search", searchMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/discover", getDiscoverMovies);

router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/providers", getMovieProviders);

router.get("/:id", getMovieById);


export default router;
