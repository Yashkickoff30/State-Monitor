const router = require('express').Router();
const State = require('../model/State');

router.get('/', (req, res) => {
  return res.render('logs');
});

router.get('/analytics', (req, res) => {
  return res.render('index');
});

module.exports = router;
