var mongoose = require('mongoose');  
var Answer = require('./answer-model');

//Create a singleton class
var ansReportHelper = new function() {
	this.getDateFilter = function(params){
		//Last six months by default
		var lastMonths = params.months ? Number(params.months) : 6;

		var dateFilter = new Date();
		dateFilter.setMonth(dateFilter.getMonth() - lastMonths );
		return dateFilter;
	}
}

//GET - Count answer in the DB
exports.countAnswersLastMonths = function(req, res) {  
	//Define date filter
	var dateFilter = ansReportHelper.getDateFilter(req.params);

    Answer.aggregate(
    	[
    		{ 
    			$match: {
			     	surveyId: new mongoose.Types.ObjectId(req.params.id),
			     	creationDate: { $gte : dateFilter }
			   	}	
			},
			{ 
				$sort : { 
					creationDate : -1 
				} 
			}, //Sort DESC
			{
				$group: {
			      	_id: { 
			      		month: { $month: "$creationDate" },
		                year: { $year: "$creationDate" },
		          	},
		            count: { $sum: 1 }
			    }
			}
		],
    	function(err, result) {
	        if(err) 
	            res.send(500, err.message);

	        console.log('GET /ans-report/count-by-survey/' + req.params.id);
	        res.status(200).jsonp(result);
	    }
    );
};

//GET - Count answer details filtering by survey and question
exports.countAnsDetBySurvAndQuestion = function(req, res) {  
	//Define date filter
	var dateFilter = ansReportHelper.getDateFilter(req.params);

    Answer.aggregate(
    	[
			{ $unwind : "$details" },
			{ $match: {
					surveyId: new mongoose.Types.ObjectId(req.params.surveyId),
					creationDate: { $gte : dateFilter },
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
	var limit = req.params.limit ? Number(req.params.limit) : 20; 
    Answer.aggregate(
    	[
			{ $unwind : "$details" },
			{ $match: {
					surveyId: new mongoose.Types.ObjectId(req.params.surveyId),
					"details.questionId": new mongoose.Types.ObjectId(req.params.questionId)
				}
			},
			{ $limit : limit },
			{ $sort : { creationDate :-1 } } //sort descending
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
    Answer.aggregate([
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

