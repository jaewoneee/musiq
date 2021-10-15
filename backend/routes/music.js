var express = require("express") ;
var SpotifyWebApi = require("spotify-web-api-node");
const connection = require("../config/mysql");
var SpotifyInfo = require("../config/spotify.json");

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
          console.log(data);
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

// 좋아요 리스트에 음원 추가
router.post("/add", function(req, res){
  const item = req.query;
  const info = {
    id: item.id,
    artist: item.artist,
    title:item.title,
    img:item.src
  }
  connection.query()
  console.log(data);
  res.send(data);
 
});

// 좋아요 리스트 등록 여부 확인
router.get("/fav/:id", function(req, res){
  const id = req.params.id;
  console.log(res);
 res.status(200).json({key:id})
});

module.exports = router;
