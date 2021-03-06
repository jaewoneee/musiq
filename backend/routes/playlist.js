var express = require("express");
var connection = require("../config/mysql");
var router = express.Router();

// 사이트 진입시 보여줄 추천 플레이 리스트
router.get("/", function(req, res, next){
  connection.query('SELECT * FROM rec_playlist', function(err, result){
    var playlist = {
      1:[],
      2:[],
      3:[]
    }

    for(i = 0; i<result.length; i++){
      if(result[i].id == 1){  // chill
        playlist[1].push(result[i])
      }else if(result[i].id == 2){  // feeling good
        playlist[2].push(result[i])
      }else{  // groove
        playlist[3].push(result[i])
      }
    }
    res.send(playlist);
  })
})
module.exports = router;
