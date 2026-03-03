import express from 'express';
import cors from 'cors';
import moviesRoutes from './src/routes/moviesRoutes.js';
const PORT  = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes)
console.log(moviesRoutes);
console.log("Movies routes loaded successfully");

app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
})