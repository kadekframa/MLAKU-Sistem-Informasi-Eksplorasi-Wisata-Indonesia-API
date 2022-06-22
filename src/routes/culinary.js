const express = require('express');
const {body} = require('express-validator');

const culinaryController = require('../controllers/culinary')

const router = express.Router();


// [POST] : v1/culinary/
router.post('/', [
    body('culinary_name').isLength({min: 5})
    .withMessage('Input culinary_name minimum 5 karakter'),
    body('address').isLength({min: 5})
    .withMessage('Input address minimum 5 karakter'),
    body('desc').isLength({min: 5})
    .withMessage('Input desc minimum 5 karakter'),
    body('open_time').isLength({min: 5})
    .withMessage('Input open_time minimum 5 karakter'),
    body('open_day').isLength({min: 5})
    .withMessage('Input open_day minimum 5 karakter'),
    body('contact_number').isLength({min: 5})
    .withMessage('Input contact_number minimum 5 karakter')
    ], culinaryController.createCulinary);

// [GET] : v1/culinary/
router.get('/', culinaryController.getAllCulinary);

// [GET] : v1/culinary/:postId
router.get('/:postId', culinaryController.getCulinaryById);

// [PUT] : v1/culinary/:postId
router.put('/:postId', [
    body('culinary_name').isLength({min: 5})
    .withMessage('Input culinary_name minimum 5 karakter'),
    body('address').isLength({min: 5})
    .withMessage('Input address minimum 5 karakter'),
    body('desc').isLength({min: 5})
    .withMessage('Input desc minimum 5 karakter'),
    body('open_time').isLength({min: 5})
    .withMessage('Input open_time minimum 5 karakter'),
    body('open_day').isLength({min: 5})
    .withMessage('Input open_day minimum 5 karakter'),
    body('contact_number').isLength({min: 5})
    .withMessage('Input contact_number minimum 5 karakter')
    ], culinaryController.updateCulinary);

router.delete('/:postId', culinaryController.deleteCulinary)

module.exports = router;