var express = require('express');
var bcrypt = require('bcrypt');
var connection = require('../mysql');
var router = express.Router();

// DB Connect
connection.connect(function (err) {
  if (err) {
    console.log('안돼!');
    console.error(err)
    throw (err);
  }
});

// 로그인
router.post('/login', function (req, res, next) {
  const loginUser = {
    'username': req.body.username,
    'password': req.body.password
  }
  connection.query('SELECT * FROM users WHERE username = ?', [loginUser.username], function (err, result) {

    if (err){throw err;}
    else if(result[0]){
      const nickname = result[0].nickname;
      if (result[0] == undefined) { // 존재하지 않는 유저라면
        return res.status(500).send('error');
      } else {
        bcrypt.compare(loginUser.password, result[0].password, function (err, result) {
          if (err) { //에러
            return res.status(500).send('error');
          }
          if (result) { // 성공
  
              console.log(nickname);
              return res.status(200).json({
              nickname:nickname
            })
          } else { //잘못된 비밀번호
            return res.status(401).json({
              message: 'wrong pwd'
            });
          }
  
        })
      }
    }

  })
});

// 회원가입
router.post('/signup', function (req, res, next) {
  const user = {
    'username': req.body.username,
    'password': req.body.password,
    'nickname': req.body.nickname
  };

  connection.query('SELECT username FROM users WHERE username = ?', [user.username], function (err, result) {
    if (result[0] == undefined) {
      const salt = bcrypt.genSaltSync();
      const encryptedPassword = bcrypt.hashSync(user.password, salt);
      connection.query('INSERT INTO users (username, password, nickname) VALUES(?, ?, ?)', [user.username, encryptedPassword, user.nickname], (err, result) => {
        if (err) throw err;
      });
      return res.send('success');
    } else { // 중복된 username이라면
      return res.status(401).json('중복된 아이디입니다');
    }
  })
});


module.exports = router;