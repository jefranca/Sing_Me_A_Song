import cors from "cors";
import express from "express";
import * as recommendationsController from './controllers/recommendationsController.js'

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", recommendationsController.postRecommendations);

export default app;
