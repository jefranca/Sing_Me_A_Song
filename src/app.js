import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import * as recommendationsController from "./controllers/recommendationsController.js";
import * as votesController from "./controllers/votesController.js";
import connection from "./database.js";
import * as validations from "./validations/validations.js";
import SongNotFound from "./errors/SongNotFound.js";
import ValidationError from "./errors/ValidationError.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", recommendationsController.postRecommendations);
app.post("/recommendations/:id/upvote", votesController.postVote);
app.post("/recommendations/:id/downvote", votesController.postVote);
app.get("/recommendations/random", recommendationsController.getRandomSong);
app.get("/recommendations/top/:amount", async (req, res, next) => {
  const { amount } = req.params;
  await validations.amountValidation(req.params);
  try {
    const result = await connection.query(
      `SELECT score FROM songs ORDER BY score DESC LIMIT $1`,
      [amount]
    );
    if (!result.rowCount) throw new SongNotFound("There is no Songs yet");
    res.status(200).send(result.rows);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).send(error.message);
    if (error instanceof SongNotFound)
      return res.status(404).send(error.message);
    next(error);
  }
});

app.use(errorHandler);

export default app;
