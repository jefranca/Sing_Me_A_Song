import * as recommendationsService from "../services/recommendationsService.js";
import * as validations from "../validations/validations.js";
import ValidationError from "../errors/ValidationError.js";
import SongNotFound from "../errors/SongNotFound.js";

async function postRecommendations(req, res, next) {
  try {
    await validations.recommendationsValidations(req.body);
    await recommendationsService.postRecommendations(req.body);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError)
      return res.status(400).send(error.message);
    if (error.code === "23505")
      return res.status(409).send("The Song already exists");
    next(error);
  }
}

async function getRandomSong(req, res, next) {
  try {
    const recommendation = await recommendationsService.getRandomSong();

    res.status(200).send(recommendation.rows);
  } catch (error) {
    if (error instanceof SongNotFound)
      return res.status(404).send(error.message);
    next(error);
  }
}

async function getTopSongs(req, res, next) {
  try {
    await validations.amountValidation(req.params.amount);
    const result = await recommendationsService.getTopSongs(req.params.amount);
    if (!result.rowCount) throw new SongNotFound("There is no Songs yet");
    else res.status(200).send(result.rows);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).send(error.message);
    if (error instanceof SongNotFound)
      return res.status(404).send(error.message);
    next(error);
  }
}

export { postRecommendations, getRandomSong, getTopSongs };
