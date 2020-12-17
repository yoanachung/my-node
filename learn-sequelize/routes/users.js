var express = require('express');
var router = express.Router();
var { User } = require('../models/index2');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll()
      .then((users) => {
          console.log(users);
          res.json(users);
      })
      .catch((err) => {
          console.log(err);
          next(err);
      });
});

router.post('/', (req, res, next) => {
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  })
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
});

module.exports = router;
