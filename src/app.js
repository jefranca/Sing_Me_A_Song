import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import * as recommendationsController from "./controllers/recommendationsController.js";
import connection from "./database.js";
import SongNotFound from "./errors/SongNotFound.js";
import * as validations from "./validations/validations.js"
import ValidationError from "./errors/ValidationError.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", recommendationsController.postRecommendations);
app.post("/recommendations/:id/upvote", async (req, res, next) => {
  try {
    const { id } = req.params;
    await validations.idValidation(req.params);

    const result = await connection.query(
      "SELECT score FROM songs WHERE id=$1",
      [id]
    );
    if (!result.rowCount) throw new SongNotFound("This song does not exist");
    const score = result.rows[0].score + 1;
    await connection.query("UPDATE songs SET score=$1 WHERE id=$2", [
      score,
      id,
    ]);
    res.sendStatus(200);
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
