const express = require('express');
const {body} = require('express-validator');

const objectTourismController = require('../controllers/object-tourism')

const router = express.Router();

// [POST] : v1/object-tourism
router.post('/', [
    body('dest_name').isLength({min: 5})
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
    ], objectTourismController.createObjectTourism);

    
// [GET] : v1/object-tourism
router.get('/', objectTourismController.getAllObjectTourism);

// [GET] : v1/object-tourism/:postId
router.get('/:postId', objectTourismController.getObjectTourismById);

// [PUT] : v1/object-tourism/:postId
router.put('/:postId', [
    body('dest_name').isLength({min: 5})
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
    ], objectTourismController.updateObjectTourism);

// [DELETE] : v1/object-tourism/:postId
router.delete('/:postId', objectTourismController.deleteObjectTourism)

module.exports = router;