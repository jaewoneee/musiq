var express = require('express');
var movieData = require('../movies.json')
var router = express.Router();

/* 메인 */
router.get('/', function(req, res, next) {
 res.send(movieData);
});

/* 서브 */
router.get('/:id', function(req, res, next) {
  var info =req.params; 
  console.log(info);
  res.send('i think you finally understand this mechanism');
});

module.exports = router;
