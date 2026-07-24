var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.get("/", async function (req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("jsfw");
    const collection = database.collection("notes");

    const notes = await collection.find({}).toArray();

    res.json(notes);
  } catch (error) {
    console.error("MongoDBデータ取得エラー:", error);
    res.status(500).json({
      message: "データの取得に失敗しました。",
    });
  } finally {
    await client.close();
  }
});

module.exports = router;