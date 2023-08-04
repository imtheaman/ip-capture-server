const { MongoClient, ServerApiVersion } = require("mongodb");
// DB IS PROTECTED BY IP ADDRESS
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dbData;
const connection = async () => {
  await client.connect();
  dbData = client.db("ipdb").collection("ips");
};

const insertDoc = async (doc) => {
  // const x = "Finding the best result twice".toLowerCase().replaceAll(" ", "-");
  if (!dbData) await connection();
  const insertedId = await dbData
    .insertOne(doc)
    .then((res) => res.insertedId);
  return insertedId;
};

const readDoc = async () => {
  if (!dbData) await connection();
  const doc = await dbData.find({});
  return doc;
};

module.exports = { connection, insertDoc, readDoc };