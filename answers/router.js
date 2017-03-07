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
	.get(answerReportCtrl.countAnswers);

module.exports = router;