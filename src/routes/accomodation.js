const express = require('express');
const {body} = require('express-validator');

const accomodationController = require('../controllers/accomodation')

const router = express.Router();

// [POST] : v1/accomodation
router.post('/', [
    body('accomodation_name').isLength({min: 5})
    .withMessage('Input accomodation_name minimum 5 karakter'),
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
    ], accomodationController.createAccomodation);

    
// [GET] : v1/accomodation
router.get('/', accomodationController.getAllAccomodation);

// [GET] : v1/accomodation/:postId
router.get('/:postId', accomodationController.getAccomodationById);

// [PUT] : v1/accomodation/:postId
router.put('/:postId', [
    body('_name').isLength({min: 5})
    .withMessage('Input dest_name minimum 5 karakter'),
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
    ], accomodationController.updateAccomodation);

// [DELETE] : v1/accomodation/:postId
router.delete('/:postId', accomodationController.deleteAccomodation)

module.exports = router;