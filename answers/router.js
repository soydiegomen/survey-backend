var answerCtrl = require('./answer');
var router = require('express').Router();

router.route('/answers')
	.get(answerCtrl.getAnswer)
	.post(answerCtrl.addAnswer);

router.route('/answer/:id')
	.get(answerCtrl.getById)
	.put(answerCtrl.updateAnswer)
	.delete(answerCtrl.deleteAnswer);

module.exports = router;