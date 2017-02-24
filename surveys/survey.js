var mongoose = require('mongoose');  
var Survey = require('./survey-model');

//GET - Return all surveys in the DB
exports.getAllSurveys = function(req, res) {  
    Survey.find(function(err, surveys) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /surveys')
        res.status(200).jsonp(surveys);
    });
};

//GET - Return a survey with specified ID
exports.getById = function(req, res) {  
    Survey.findById(req.params.id, function(err, survey) {
        if(err) 
            return res.send(500, err.message);

        console.log('GET /survey/' + req.params.id);
        res.status(200).jsonp(survey);
    });
};

//POST - Insert a new survey in the DB
exports.addSurvey = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var newSurvey = new Survey({
        companyId:    req.body.companyId,
        surveyType:     req.body.surveyType,
        description:    req.body.description,
        isActive:     req.body.isActive,
        creationDate:    req.body.creationDate,
        lastModification:     req.body.lastModification,
        questions:     req.body.questions
    });

    newSurvey.save(function(err, survey) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(survey);
    });
};

//PUT - Update a register already exists
exports.updateSurvey = function(req, res) {  
    Survey.findById(req.params.id, function(err, survey) {
        survey.companyId = req.body.companyId;
        survey.surveyType = req.body.surveyType;
        survey.description =req.body.description;
        survey.isActive = req.body.isActive;
        survey.creationDate = req.body.creationDate;
        survey.lastModification = req.body.lastModification;
        survey.questions = req.body.questions;

        survey.save(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).jsonp(survey);
        });
    });
};

//DELETE - Delete a survey with specified ID
exports.deleteSurvey = function(req, res) {  
    Survey.findById(req.params.id, function(err, survey) {
        survey.remove(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};