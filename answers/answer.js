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

//GET - Return the last answer. For simulate paging, using date for filter, sort DESC by creationDate and limit one row
exports.getAnswerBySurvey = function(req, res) {  
    
    Answer.find({ 
        surveyId : new mongoose.Types.ObjectId(req.params.surveyId)
    })
    .sort( 
        //order DESC
        dateOrder = { 
            creationDate : -1 
        }
    )
    .exec(function(err, answer) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /getAnswerBySurvey/'+ req.params.surveyId )
        res.status(200).jsonp(answer);
    })
};

//GET - Return the last answer. For simulate paging, using date for filter, sort DESC by creationDate and limit one row
exports.getLastAnswer = function(req, res) {  
    //var lastDate = '2017-03-25T00:00:00.000Z';
    //lastdate mustbe a valid date in javascript date format
    var lastDate = req.params.lastDate;

    //Default direction is before, but the service could move forward
    // lte = before answer and gte = next answer
    var dateFilter = null;
    var dateOrder = null;
    if(req.params.direction && req.params.direction === 'next'){
        //Answer greater to the date to the date
        dateFilter = { 
            $gte : new Date(lastDate) 
        };
        //order ASC
        dateOrder = { 
            creationDate : 1 
        };
    }else{
        //Answer least to the date
        dateFilter = { 
            $lte : new Date(lastDate) 
        }
        //order DESC
        dateOrder = { 
            creationDate : -1 
        };
    }

    Answer.find({ 
        surveyId : new mongoose.Types.ObjectId(req.params.surveyId),
        creationDate: dateFilter 
    })
    .sort( dateOrder )
    .limit(1)
    .exec(function(err, answer) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /getLastAnswer/'+ req.params.surveyId + '/' +lastDate)
        res.status(200).jsonp(answer);
    })
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