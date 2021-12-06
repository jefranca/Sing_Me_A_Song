import connection from "../database.js";

async function postRecommendations({ name, youtubeLink }) {
  await connection.query(
    'INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2)',
    [name, youtubeLink]
  );
}

async function getMaxScore() {
  return await connection.query(
    "SELECT score FROM songs ORDER BY score DESC LIMIT 1"
  );
}

async function getMinScore() {
  return await connection.query(
    "SELECT score FROM songs ORDER BY score LIMIT 1"
  );
}

async function getRecommendation(filter) {
  return await connection.query(
    `SELECT * FROM songs ${filter}ORDER BY RANDOM() LIMIT 1`
  );
}

export { postRecommendations, getMaxScore, getMinScore, getRecommendation };
