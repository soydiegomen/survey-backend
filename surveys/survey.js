var mongoose = require('mongoose');  
var Survey = require('./survey-model');


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