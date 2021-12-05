import * as recommendationsService from "../services/recommendationsService.js";
import * as validations from "../validations/validations.js";
import ValidationError from "../errors/ValidationError.js";

async function postRecommendations(req, res) {
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
    res.sendStatus(500);
  }
}

export { postRecommendations };
