var express = require("express");
var SpotifyWebApi = require("spotify-web-api-node");
var SpotifyInfo = require("../spotify.json");
var connection = require('../mysql');
var router = express.Router();

var credentials = {
  clientId: SpotifyInfo.clientId,
  clientSecret: SpotifyInfo.clientSecret,
};
var spotifyApi = new SpotifyWebApi(credentials);


// 사이트 진입시 보여줄 추천 플레이 리스트
router.get("/", function(req, res, next){
  connection.query('SELECT * FROM rec_playlist', function(err, result){
    var playlist = {
      1:[],
      2:[],
      3:[]
    }

    for(i = 0; i<result.length; i++){
      if(result[i].id == 1){
        playlist[1].push(result[i])
      }else if(result[i].id == 2){
        playlist[2].push(result[i])
      }else{
        playlist[3].push(result[i])
      }
    }
    console.log(playlist);
    res.send(playlist);
  })
})


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
      spotifyApi.searchTracks(id).then(
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
