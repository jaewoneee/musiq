var express = require("express");
var bcrypt = require("bcrypt");
var shortid = require("shortid");
var connection = require("../config/mysql");
var router = express.Router();
var auth = require("../utils/auth");

// DB Connect
connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

// 로그인
router.post("/login", function (req, res, next) {
  const loginUser = {
    username: req.body.username,
    password: req.body.password,
  };
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [loginUser.username],
    function (err, result) {
      const user = result[0];

      if (err) {
        return res.status(404).send({ message: "error", err });
      } else if (user == undefined) {
        // 존재하지 않는 유저라면
        return res.status(401).send({
          message:
            "Looks like either your email address or password is incorrect.",
        });
      } else {
        bcrypt.compare(
          loginUser.password,
          result[0].password,
          function (err, result) {
            if (err) {
              //에러
              return res.status(404).send("error");
            }
            if (result) {
              // 성공
              const token = auth.newToken(user);
              const thisUser = {
                uuid: user.uuid,
                nickname: user.nickname,
              };
              res.status(200).json({
                user: thisUser,
                token: token,
              });
            } else {
              //잘못된 비밀번호
              return res.status(401).json({
                message:
                  "Looks like either your email address or password is incorrect.",
              });
            }
          }
        );
      }
    }
  );
});

// 회원가입
router.post("/signup", function (req, res, next) {
  const user = {
    id: shortid.generate(),
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
  };

  connection.query(
    "SELECT username FROM users WHERE username = ?",
    [user.username],
    function (err, result) {
      if (result[0] == undefined) {
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.password, salt);
        connection.query(
          "INSERT INTO users (uuid, username, password, nickname) VALUES(?, ?, ?, ?)",
          [user.id, user.username, encryptedPassword, user.nickname],
          (err, result) => {
            if (err) {
              return res.status(404).json({ message: "error", err });
            }
            return res.status(200).send("Success");
          }
        );
      } else {
        // 중복된 username이라면
        return res
          .status(401)
          .send({ message: "this username already exists." });
      }
    }
  );
});

module.exports = router;
