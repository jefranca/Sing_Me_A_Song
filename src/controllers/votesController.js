import * as votesService from "../services/votesService.js";
import * as validations from "../validations/validations.js";
import ValidationError from "../errors/ValidationError.js";
import SongNotFound from "../errors/SongNotFound.js";

async function postVote(req, res, next) {
  try {
    await validations.idValidation(req.params);
    await votesService.postVote(req.params);

    res.sendStatus(200);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).send(error.message);
    if (error instanceof SongNotFound)
      return res.status(404).send(error.message);

    next(error);
  }
}

export { postVote };
