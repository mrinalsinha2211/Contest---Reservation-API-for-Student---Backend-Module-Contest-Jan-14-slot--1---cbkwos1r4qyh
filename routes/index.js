const router = require('express').Router();

router.use('/reservation', require('./reservationRoutes'));
router.use('/get', require('./studentRoutes'));
router.use('/get', require('./resourceRoutes'));

module.exports = router;
