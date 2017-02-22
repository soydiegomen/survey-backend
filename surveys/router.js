var surveyCtrl = require('./survey');
var router = require('express').Router();

router.route('/companys')
	.post(surveyCtrl.addSurvey);


module.exports = router  