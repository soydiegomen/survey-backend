var companyCtrl = require('./company');
var router = require('express').Router();

router.route('/companys')
	.get(companyCtrl.getAllCompanys)
	.post(companyCtrl.addCompany);

router.route('/company/:id')
	.get(companyCtrl.getById)
	.put(companyCtrl.updateCompany)
	.delete(companyCtrl.deleteCompany);

module.exports = router  