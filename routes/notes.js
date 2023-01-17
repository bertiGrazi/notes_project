const Router = require('express').Router;

const router = Router();

//create
router.get('/', function(req, res) {
  res.render('notes/create')
})

module.exports = router;