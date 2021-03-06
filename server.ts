import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

// GET / request
app.get("/pastes", async (req, res) => {
  const response = await client.query('select * from pastes') 
  res.status(200).json({
    status: "success",
    data: response.rows
  });
});

// POST / request
app.post("/paste", async (req, res) => {
  const { paste_title, paste_body } = req.body;
  const query = 'INSERT INTO pastes (paste_title, paste_body) VALUES ($1, $2) RETURNING *'
  const values = [paste_title, paste_body] 
  const response = await client.query(query, values);
  if (paste_body.length <= 0) {
    res.status(400).json({
      status: "failure",
      data: "the body of a paste cannot be empty. Please provide a body"
    })
  } else {
    res.status(200).json({
      status: "success",
      data: response
    })
  }
});

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
