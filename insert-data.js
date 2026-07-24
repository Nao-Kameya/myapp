require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URIが設定されていません。");
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    const database = client.db("jsfw");
    const collection = database.collection("notes");

    const result = await collection.insertOne({
      name: "亀谷直生",
      mail: "nao@example.com",
      tel: "090-1234-5678",
      createdAt: new Date(),
    });

    console.log("データ登録成功");
    console.log("登録ID:", result.insertedId);
  } catch (error) {
    console.error("データ登録失敗");
    console.error(error);
  } finally {
    await client.close();
  }
}

main();