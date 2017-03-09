var answerCtrl = require('./answer');
var answerReportCtrl = require('./answer-report');
var router = require('express').Router();

router.route('/answers')
	.get(answerCtrl.getAnswer)
	.post(answerCtrl.addAnswer);

router.route('/answer/:id')
	.get(answerCtrl.getById)
	.put(answerCtrl.updateAnswer)
	.delete(answerCtrl.deleteAnswer);

router.route('/ans-report/count-by-survey/:id')
	.get(answerReportCtrl.countAnswersBySurvey);

router.route('/ans-report/count-details/:surveyId/:questionId')
	.get(answerReportCtrl.countAnsDetBySurvAndQuestion);

router.route('/ans-report/get-details/:surveyId/:questionId')
	.get(answerReportCtrl.getAnsDetBySurvAndQuestion);

router.route('/ans-report/count-details-diff-values/:surveyId/:questionId')
	.get(answerReportCtrl.countDifferentAnsDetValues);

module.exports = router;