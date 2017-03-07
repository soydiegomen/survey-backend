var mongoose = require('mongoose');  
var Answer = require('./answer-model');

//GET - Return all answer in the DB
exports.countAnswers = function(req, res) {  
    Answer.aggregate(
    	[
    	{ 
    		$match: {
		              surveyId: new mongoose.Types.ObjectId("58be316dcd51dfc20c000004")
		              //key: ""
		         }
			},
			{
				$group: {
			         _id: "$surveyId",
			         count: { $sum: 1}
			     }
			}
		],
    	function(err, result) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /ans-report/count-by-survey/' + req.params.id);
        res.status(200).jsonp(result);
    });
};