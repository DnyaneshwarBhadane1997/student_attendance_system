const utils = require('../../helper/utils'),
    deptModel = require('./deptModel.js'),
    deptService = require('./dept.service'),
    mongoose = require('mongoose');
let deptCtr = {};

deptCtr.createDept = (req, res) => {
    let  input = req.body;
    deptService
        .saveDeptDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New dept" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};


deptCtr.getDept = (req, res) => {
    let  input = req.body;
    deptService
        .saveDeptDetails(input)
        .then(function(){
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New dept" }), status_code: 200 });
        }, function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};

module.exports = deptCtr;

