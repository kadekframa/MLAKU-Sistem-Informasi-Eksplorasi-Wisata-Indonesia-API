const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
const ObjectTourism = require('../models/object-tourism');

exports.createObjectTourism = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };
    
    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const dest_name = req.body.dest_name;
    const address = req.body.address;
    const image = req.file.path;
    const desc = req.body.desc;
    const open_time = req.body.open_time;
    const open_day = req.body.open_day;
    const contact_number = req.body.contact_number;
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;

    const Posting = new ObjectTourism({
        dest_name: dest_name,
        address: address,
        image: image,
        desc: desc,
        open_time: open_time,
        open_day: open_day,
        contact_number: contact_number,
        author: {
            user_id: user_id,
            name: user_name
        }
    });

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: "Input Object Tourism Information Success",
                data: result
            });
        })
        .catch(err => {
            console.info('err', err);
        });

    
}

exports.getAllObjectTourism = (req, res, next) => {
    ObjectTourism.find()
        .then(result => {
            res.status(200).json({
                message: 'Data Object Tourism Berhasil Dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        });
}

exports.getObjectTourismById = (req, res, next) => {
    const postId = req.params.postId;
    ObjectTourism.findById(postId)
        .then(result => {
            if(!result) {
                const error = new Error('Object Tourism Tidak Ditemukan');
                error.errorStatus = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data Object Tourism Berhasil Dipanggil',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        });
}

exports.updateObjectTourism = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };
    
    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const dest_name = req.body.dest_name;
    const address = req.body.address;
    const image = req.file.path;
    const desc = req.body.desc;
    const open_time = req.body.open_time;
    const open_day = req.body.open_day;
    const contact_number = req.body.contact_number;
    const postId = req.params.postId;

    ObjectTourism.findById(postId)
        .then(post => {
            if(!post) {
                const err = new Error('Object Tourism Not Found');
                err.errorStatus = 404;
                throw err;
            }

            post.dest_name = dest_name;
            post.address = address;
            post.image = image;
            post.desc = desc;
            post.open_time = open_time;
            post.open_day = open_day;
            post.contact_number = contact_number;

            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Update Object Tourism Information Success',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        });
}


exports.deleteObjectTourism = (req, res, next) => {
    const postId = req.params.postId;

    ObjectTourism.findById(postId)
        .then(post => {
            if(!post){
                const error = new Error('Object Tourism Not Found');
                error.errorStatus = 404;
                throw error;
            }

            removeImage(post.image);
            return ObjectTourism.findByIdAndRemove(postId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Delete Object Tourism Success',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        })

}

const removeImage = (filePath) => {
    console.info('filePath', filePath);
    console.info('dir name:', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath,  err => console.info(err));
}