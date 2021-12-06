import * as votesRepository from "../repositories/votesRepository.js";
import SongNotFound from "../errors/SongNotFound.js";

async function postVote({ id }, isUpvote) {
  let score = await votesRepository.getScore(id);
  if (score === undefined) throw new SongNotFound("This song does not exist");
  isUpvote ? score++ : score--;
  if (score < -5) {
    await votesRepository.deleteSong(id);
  } else {
    await votesRepository.postVote({ score, id });
  }
}

export { postVote };
