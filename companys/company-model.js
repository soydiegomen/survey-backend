var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var companySchema = new Schema({  
  name:    { type: String },
  creationDate:     { type: Date }
});

module.exports = mongoose.model('Company', companySchema);