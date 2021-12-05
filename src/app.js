import cors from "cors";
import express from "express";
import connection from "./database.js";

import ValidationError from "./errors/ValidationError.js";
import * as validations from "./validations/validations.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => res.sendStatus(200));
app.post("/recommendations", async (req, res) => {
  const { name, youtubeLink } = req.body;
  try {
    await validations.recommendationsValidations(req.body);

    await connection.query(
      'INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2)',
      [name, youtubeLink]
    );

    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ValidationError)
      return res.status(400).send(error.message);
    if(error.code === '23505') return res.status(409).send("The Song already exists")
    res.sendStatus(500);
  }
});

export default app;
