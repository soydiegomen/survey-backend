var surveyCtrl = require('./survey');
var router = require('express').Router();

router.route('/surveys')
	.get(surveyCtrl.getAllSurveys)
	.post(surveyCtrl.addSurvey);

router.route('/survey/:id')
	.get(surveyCtrl.getById)
	.put(surveyCtrl.updateSurvey)
	.delete(surveyCtrl.deleteSurvey);

module.exports = router  