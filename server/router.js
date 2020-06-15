const router = require('express').Router();
const controller = require('./controller.js');

router.get('/ticker/:id', controller.ticker.get);
router.get('/top25', controller.analysis.get);

module.exports = router;
