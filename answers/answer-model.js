var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var answerSchema = new Schema({  
	surveyId:    { type: mongoose.Schema.Types.ObjectId },
	key:    { type: String },
	status:    { type: String, enum: ['new','accepted', 'rejected'], default: 'new' },
	creationDate:     { type: Date, default: Date.now },
	usedTime:     { type: Number },
	details: [{
			questionId: { type: mongoose.Schema.Types.ObjectId },
			value:    { type: String }
		}]
});

module.exports = mongoose.model('Answer', answerSchema);