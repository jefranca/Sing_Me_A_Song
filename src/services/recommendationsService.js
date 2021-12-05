import * as recommendationsRepository from "../repositories/recommendationsRepository.js";

async function postRecommendations(recommendation) {
  await recommendationsRepository.postRecommendations(recommendation);
}

export { postRecommendations };
