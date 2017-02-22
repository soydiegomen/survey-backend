var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var surveySchema = new Schema({  
	companyId:    { type: String },
	surveyType:    { type: String, enum: ['test','customer-sat'] },
	description:    { type: String },
	isActive:    { type: Boolean },
	creationDate:     { type: Date },
	lastModification:     { type: Date },
	questions: [{
			questionType: { type: String, enum: ['text','options','yes-no'] },
			text:    { type: String },
			isActive:    { type: Boolean },
			creationDate:     { type: Date }
		}]
});

module.exports = mongoose.model('Survey', surveySchema);