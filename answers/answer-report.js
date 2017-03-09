var mongoose = require('mongoose');  
var Answer = require('./answer-model');

//GET - Count answer in the DB
exports.countAnswersBySurvey = function(req, res) {  
    Answer.aggregate(
    	[{ 
    		$match: {
		     	surveyId: new mongoose.Types.ObjectId(req.params.id)
		   	}	
		},
		{
			$group: {
		      	_id: "$surveyId",
		        count: { $sum: 1}
		     }
		}],
    	function(err, result) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /ans-report/count-by-survey/' + req.params.id);
        res.status(200).jsonp(result);
    });
};

//GET - Count answer details filtering by survey and question
exports.countAnsDetBySurvAndQuestion = function(req, res) {  
    Answer.aggregate(
    	[
			{ $unwind : "$details" },
			{ $match: {
					surveyId: new mongoose.Types.ObjectId(req.params.surveyId),
					"details.questionId": new mongoose.Types.ObjectId(req.params.questionId)
				}
			},
			{ $group: {
					_id: "$details.questionId",
					count: { $sum: 1}
			    }
			}
		],
    	function(err, result) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /ans-report/count-details/' + req.params.surveyId + '/' + req.params.questionId);
        res.status(200).jsonp(result);
    });
};

//GET - Get answer details filtering by survey and question
exports.getAnsDetBySurvAndQuestion = function(req, res) {  
    Answer.aggregate(
    	[
			{ $unwind : "$details" },
			{ $match: {
					surveyId: new mongoose.Types.ObjectId(req.params.surveyId),
					"details.questionId": new mongoose.Types.ObjectId(req.params.questionId)
				}
			},
			//Agregar un limit
			//{ $limit : 1 }
		],
    	function(err, result) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /ans-report/get-details/' + req.params.surveyId + '/' + req.params.questionId);
        res.status(200).jsonp(result);
    });
};

//GET - Count how many times an answer detail has a different value, filtering by survey and question
exports.countDifferentAnsDetValues = function(req, res) {  
    Answer.aggregate(
    	[
			{ $unwind : "$details" },
			{ $match: {
					surveyId: new mongoose.Types.ObjectId(req.params.surveyId),
					"details.questionId": new mongoose.Types.ObjectId(req.params.questionId)
				}
			},
			{ $group: {
					_id: "$details.value",
					count: { $sum: 1 }
				}
			}
		],
    	function(err, result) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /ans-report/count-details/' + req.params.surveyId + '/' + req.params.questionId);
        res.status(200).jsonp(result);
    });
};