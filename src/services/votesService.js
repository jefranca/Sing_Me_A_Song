import * as votesRepository from "../repositories/votesRepository.js";
import SongNotFound from '../errors/SongNotFound.js'

async function postVote({ id }) {
  let score = await votesRepository.getScore(id);
  console.log(score)
  if (score === undefined) throw new SongNotFound("This song does not exist");
  score++;
  await votesRepository.postVote({ score, id });
}

export { postVote };
