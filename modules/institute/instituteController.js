const jwt = require('../../helper/jwt'),
    utils = require('../../helper/utils'),
    instituteModel = require('./instituteModel'),
    instituteService = require('./institute.service'),
    mongoose = require('mongoose');
let instituteCtr = {};

instituteCtr.createInstitute = (req, res) => {
    let  input = req.body;
    
    instituteService
        .saveInstituteDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New institute" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};


instituteCtr.getInstitude = (req, res) => {
    let  input = req.body;
    instituteService
        .saveInstitudeDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New institute" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};

module.exports = instituteCtr;

