var mongoose = require('mongoose');  
var Answer = require('./answer-model');

//GET - Return all answer in the DB
exports.getAnswer = function(req, res) {  
    Answer.find(function(err, answer) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /answers')
        res.status(200).jsonp(answer);
    });
};

//GET - Return a answer with specified ID
exports.getById = function(req, res) {  
    Answer.findById(req.params.id, function(err, answer) {
        if(err) 
            return res.send(500, err.message);

        console.log('GET /answer/' + req.params.id);
        res.status(200).jsonp(answer);
    });
};

//POST - Insert a new answer in the DB
exports.addAnswer = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var newAnswer = new Answer({
        surveyId:    req.body.surveyId,
        key:     req.body.key,
        usedTime:     req.body.usedTime,
        details:     req.body.details,
    });

    if(req.body.status){
       newAnswer.status =  req.body.status;
    }

    if(req.body.creationDate){
       newAnswer.creationDate =  req.body.creationDate;
    }

    newAnswer.save(function(err, answer) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(answer);
    });
};

//PUT - Update a register already exists
exports.updateAnswer = function(req, res) {  
    Answer.findById(req.params.id, function(err, answer) {
        answer.surveyId   = req.body.surveyId;
        answer.key    = req.body.key;
        answer.usedTime   = req.body.usedTime;
        answer.details    = req.body.details;

        if(req.body.status){
           newAnswer.status =  req.body.status;
        }

        answer.save(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).jsonp(answer);
        });
    });
};

//DELETE - Delete a answer with specified ID
exports.deleteAnswer = function(req, res) {  
    Answer.findById(req.params.id, function(err, answer) {
        answer.remove(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};