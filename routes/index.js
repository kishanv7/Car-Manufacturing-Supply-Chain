var express = require('express');
var router = express.Router();

/**
 * Front API
 */
var pmFront = require('../controllers/ProductManagmentController.js');

// PM API for Front User
router.post('/api/front/v1/register-parts', pmFront.registerParts);
router.post('/api/front/v1/get-parts', pmFront.getParts);
router.post('/api/front/v1/get-part', pmFront.getPart);
router.post('/api/front/v1/change-ownership-parts', pmFront.changeOwnershipParts);
router.post('/api/front/v1/register-products', pmFront.registerProducts);
router.post('/api/front/v1/get-products', pmFront.getProducts);
router.post('/api/front/v1/get-product', pmFront.getProduct);
router.post('/api/front/v1/change-ownership-products', pmFront.changeOwnershipProducts);

module.exports = router;
