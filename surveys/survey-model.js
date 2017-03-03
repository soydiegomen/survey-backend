var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var surveySchema = new Schema({  
	companyId:    { type: mongoose.Schema.Types.ObjectId },
	surveyType:    { type: String, enum: ['test','customer'] },
	description:    { type: String },
	isActive:    { type: Boolean },
	creationDate:     { type: Date, default: Date.now },
	lastModification:     { type: Date, default: Date.now },
	questions: [{
			questionType: { type: String, enum: ['text','options','yes-no'] },
			code:    { type: String },
			text:    { type: String },
			isActive:    { type: Boolean },
			creationDate:     { type: Date }
		}]
});

module.exports = mongoose.model('Survey', surveySchema);