import express from "express";
import { recommendMovies } from "../controllers/aiController";

const router = express.Router();

router.post("/recommend", recommendMovies);

export default router;
