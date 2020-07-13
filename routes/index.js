var express = require('express');
var router = express.Router();

/**
 * Front API
 */
var pmFront = require('../controllers/ProductManagmentController.js');

// Auth API for Front User
router.post('/api/front/v1/register-parts', pmFront.registerParts);
router.post('/api/front/v1/get-parts', pmFront.getParts);
router.post('/api/front/v1/get-part', pmFront.getPart);

module.exports = router;
