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

router.route('/last-answer/:surveyId/:lastDate')
	.get(answerCtrl.getLastAnswer)

router.route('/ans-report/answers-by-month/:id/:months?')
	.get(answerReportCtrl.countAnswersLastMonths);

router.route('/ans-report/count-details/:surveyId/:questionId/:months?')
	.get(answerReportCtrl.countAnsDetBySurvAndQuestion);

router.route('/ans-report/get-details/:surveyId/:questionId/:months?')
	.get(answerReportCtrl.getAnsDetBySurvAndQuestion);

router.route('/ans-report/group-details-by-values/:surveyId/:questionId/:months?')
	.get(answerReportCtrl.countDifferentAnsDetValues);

module.exports = router;