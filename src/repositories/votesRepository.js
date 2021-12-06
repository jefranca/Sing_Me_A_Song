import connection from "../database.js";

async function getScore(id) {
  const result = await connection.query("SELECT score FROM songs WHERE id=$1", [
    id,
  ]);
  return result.rows[0]?.score;
}

async function postVote({ score, id }) {
  await connection.query("UPDATE songs SET score=$1 WHERE id=$2", [score, id]);
}

async function deleteSong(id) {
  await connection.query("DELETE FROM songs WHERE id=$1", [id]);
}

export { getScore, postVote, deleteSong };
