import connection from "../database.js";

async function postRecommendations({ name, youtubeLink }) {
  await connection.query(
    'INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2)',
    [name, youtubeLink]
  );
}

export { postRecommendations };
