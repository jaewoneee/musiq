var express = require("express");
var SpotifyWebApi = require("spotify-web-api-node");
var connection = require("../config/mysql");
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
    const id = req.params.id; // 검색어
    const offset = req.query.offset;
    console.log('offset', offset);
    spotifyApi
        .clientCredentialsGrant()
        .then(function (data) {
            console.log("The token expires in " + data.body["expires_in"]);
            console.log("The access token is " + data.body["access_token"]);
            // 스포티파이 토큰 생성
            spotifyApi.setAccessToken(data.body["access_token"]);

            // 검색어를 통한 가수 혹은 노래 검색
            spotifyApi.searchTracks(id, {
                offset:offset,
                limit: 32
            }).then(
                function (data) {
                    return res.send(data.body);
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

// 사용자의 좋아요 리스트 가져오기
router.post("/fetch", (req, res)=>{
    const uuid = req.query.uuid;
    console.log(uuid);
    connection.query('SELECT id, artist, title, img, url FROM fav_playlist WHERE uuid = ?', [uuid], (err, result)=>{
        if (err) throw err;
        res.send(result);
    })
})

// 좋아요 리스트에 음원 추가
router.post("/add", function (req, res) {
    const item = req.query;
    const info = {
        id: item.id,
        artist: item.artist,
        title: item.title,
        img: item.src,
        url:item.url,
        uuid: item.uuid
    }
    connection.query('INSERT INTO fav_playlist (id, artist, title, img, url, uuid) VALUES(?, ?, ?, ?, ?, ?)', [info.id, info.artist, info.title, info.img, info.url, info.uuid], (err, result) => {
        if (err) throw err;
    });
    return res.send('success');

});

// 좋아요 리스트에 음원 삭제
router.delete("/:id", function (req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM fav_playlist WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        return res.send('delete');
    })
});

// 좋아요 리스트 등록 여부 확인
router.post("/fav", function (req, res) {
    const info = req.query;
    const likedArray = [];
    connection.query('SELECT * FROM fav_playlist WHERE uuid=?', [info.uuid], (err, result) => {
        if (result[0]) { // 좋아요 내역 존재하면,
            for (i = 0; i < result.length; i++) {
                likedArray.push(result[i].id);
            }
            if (likedArray.includes(info.id)) { // 좋아요 리스트에 해당 아이템 유무 체크
                return res.send(false);
            } else {
                return res.send(true);
            }
        } else { // 좋아요 내역 없으면,
            return res.send(true);
        }
    })
});

module.exports = router;
