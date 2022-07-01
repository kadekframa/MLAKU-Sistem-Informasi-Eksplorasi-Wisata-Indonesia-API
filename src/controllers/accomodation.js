const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
const Accomodation = require('../models/accomodation');

exports.createAccomodation = (req, res, next) => {
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

    const accomodation_name = req.body.dest_name;
    const address = req.body.address;
    const image = req.file.path;
    const desc = req.body.desc;
    const open_time = req.body.open_time;
    const open_day = req.body.open_day;
    const contact_number = req.body.contact_number;

    const Posting = new Accomodation({
        accomodation_name: accomodation_name,
        address: address,
        image: image,
        desc: desc,
        open_time: open_time,
        open_day: open_day,
        contact_number: contact_number,
        author: {uid: 1, name: 'Kadek Frama'}
    });

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: "Create Accomodation Success",
                data: result
            });
        })
        .catch(err => {
            console.info('err', err);
        });

    
}

exports.getAllAccomodation = (req, res, next) => {
    Accomodation.find()
        .then(result => {
            res.status(200).json({
                message: 'Data Accomodation Dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        });
}

exports.getAccomodationById = (req, res, next) => {
    const postId = req.params.postId;
    Accomodation.findById(postId)
        .then(result => {
            if(!result) {
                const error = new Error('Accomodation Tidak Ditemukan');
                error.errorStatus = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data Accomodation Dipanggil',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        });
}

exports.updateAccomodation = (req, res, next) => {
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

    const accomodation_name = req.body.accomodation_name;
    const address = req.body.address;
    const image = req.file.path;
    const desc = req.body.desc;
    const open_time = req.body.open_time;
    const open_day = req.body.open_day;
    const contact_number = req.body.contact_number;
    const postId = req.params.postId;

    Accomodation.findById(postId)
        .then(post => {
            if(!post) {
                const err = new Error('Accomodation tidak ditemukan');
                err.errorStatus = 404;
                throw err;
            }

            post.accomodation_name = accomodation_name;
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
                message: 'Update Sukses..',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        });
}


exports.deleteAccomodation = (req, res, next) => {
    const postId = req.params.postId;

    Accomodation.findById(postId)
        .then(post => {
            if(!post){
                const error = new Error('AccomodationTidak Ditemukan');
                error.errorStatus = 404;
                throw error;
            }

            removeImage(post.image);
            return Accomodation.findByIdAndRemove(postId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Hapus Accomodation Berhasil',
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