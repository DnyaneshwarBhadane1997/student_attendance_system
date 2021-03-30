const jwt = require('../../helper/jwt'),
    utils = require('../../helper/utils'),
    classModel = require('./classModel.js'),
    classService = require('./class.service'),
    mongoose = require('mongoose');
let classCtr = {};

classCtr.createClass = (req, res) => {
    let  input = req.body;
    
    classService
        .saveClassDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New class" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};


classCtr.getClass = (req, res) => {
    let  input = req.body;
    classService
        .saveClassDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New class" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};

module.exports = classCtr;

