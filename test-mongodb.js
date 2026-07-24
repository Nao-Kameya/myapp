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

    console.log("✅ MongoDBに接続成功");

    await client.db("admin").command({ ping: 1 });

    console.log("✅ Ping成功");
  } catch (err) {
    console.error("❌ 接続失敗");
    console.error(err);
  } finally {
    await client.close();
  }
}

main();