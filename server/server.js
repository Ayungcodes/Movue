const PORT = process.env.PORT || 5000;

import express from "express";
import cors from "cors";

import moviesRoutes from "./src/routes/moviesRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});
