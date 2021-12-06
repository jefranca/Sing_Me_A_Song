import * as recommendationsRepository from "../repositories/recommendationsRepository.js";

async function postRecommendations(recommendation) {
  await recommendationsRepository.postRecommendations(recommendation);
}

async function getRandomSong() {
  const maxScore = await recommendationsRepository.getMaxScore();
  const minScore = await recommendationsRepository.getMinScore();
  if (!maxScore.rowCount) throw new SongNotFound("There is no Recommendations");

  let filter = "";
  const randomNumber = Math.random();
  if (randomNumber > 0.3 && maxScore.rows[0].score > 10)
    filter = "WHERE score > 10 ";
  if (randomNumber <= 0.3 && minScore.rows[0].score <= 10)
    filter = "WHERE score <= 10 ";

  return await recommendationsRepository.getRecommendation(filter)
}

export { postRecommendations, getRandomSong };
