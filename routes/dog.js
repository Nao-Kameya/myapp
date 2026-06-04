var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function (req, res) {
  request("https://dog.ceo/api/breeds/image/random", function (error, response, body) {
    if (error) {
      res.send("APIの取得に失敗しました");
      return;
    }

    var data = JSON.parse(body);
    var imageUrl = data.message;

    res.send(`
      <h1>Dog API</h1>
      <p>Dog APIから取得したランダムな犬画像です。</p>
      <img src="${imageUrl}" width="500">
    `);
  });
});

module.exports = router;