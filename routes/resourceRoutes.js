const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/resource', resourceController.getAllResources);

module.exports = router;
