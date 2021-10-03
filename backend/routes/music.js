var express = require("express");
var SpotifyWebApi = require("spotify-web-api-node");
var SpotifyInfo = require("../spotify.json");

var router = express.Router();

var credentials = {
  clientId: SpotifyInfo.clientId,
  clientSecret: SpotifyInfo.clientSecret,
  redirectUri: SpotifyInfo.redirectUri,
};
var spotifyApi = new SpotifyWebApi(credentials);

// 음악 검색 결과 리스트 생성
router.get("/:id", function (req, res) {
  var id = req.params.id; // 검색어

  spotifyApi
    .clientCredentialsGrant()
    .then(function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // 스포티파이 토큰 생성
      spotifyApi.setAccessToken(data.body["access_token"]);

      // 검색어를 통한 가수 혹은 노래 검색
      spotifyApi.searchTracks(id, { limit: 50 }).then(
        function (data) {
          res.send(data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    })
    .catch(function (err) {
      console.log("Unfortunately, something has gone wrong.", err.message);
    });
});

module.exports = router;
