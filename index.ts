import * as express from "express";
import * as bodyParser from "body-parser";
import { insertDoc, readDoc } from "./db";
import * as cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const data = await readDoc();
  res.status(200);
  res.json(data);
});

app.post("/", async(req, res) => {
  const result = await insertDoc(req.body);
  res.send(result);
});

app.get("/check", (req, res) => {
  res.json({
    data: "server running",
  });
});

app.listen(process.env.port || 80, () => console.log("Listening on default http port"));
