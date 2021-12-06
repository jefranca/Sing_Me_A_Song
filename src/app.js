import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import * as recommendationsController from "./controllers/recommendationsController.js";
import * as votesController from "./controllers/votesController.js";
import connection from "./database.js";
import SongNotFound from "./errors/SongNotFound.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", recommendationsController.postRecommendations);
app.post("/recommendations/:id/upvote", votesController.postVote);
app.post("/recommendations/:id/downvote", votesController.postVote);
app.get("/recommendations/random", async (req, res, next) => {
  try {
    const maxScore = await connection.query('SELECT score FROM songs ORDER BY score DESC LIMIT 1');
    const minScore = await connection.query("SELECT score FROM songs ORDER BY score LIMIT 1");
    console.log(maxScore)
    if (!maxScore.rowCount) throw new SongNotFound("There is no Recommendations");

    let filter = '';
    const randomNumber = Math.random();
    if (randomNumber > 0.3 && maxScore.rows[0].score > 10) filter = 'WHERE score > 10 ';
    if (randomNumber <= 0.3 && minScore.rows[0].score <= 10) filter = 'WHERE score <= 10 ';

    const recomendation = await connection.query(`SELECT * FROM songs ${filter}ORDER BY RANDOM() LIMIT 1`);

    res.status(200).send(recomendation.rows);
  } catch (error) {
    if (error instanceof SongNotFound)
      return res.status(404).send(error.message);
    next(error);
  }
});

app.use(errorHandler);

export default app;
