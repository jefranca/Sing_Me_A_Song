import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import * as recommendationsController from "./controllers/recommendationsController.js";
import * as votesController from "./controllers/votesController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", recommendationsController.postRecommendations);
app.post("/recommendations/:id/upvote", votesController.postVote);
app.post("/recommendations/:id/downvote", votesController.postVote);

app.use(errorHandler);

export default app;
