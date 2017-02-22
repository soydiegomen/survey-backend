var mongoose = require('mongoose');  
var Company = require('./company-model');


//GET - Return all companys in the DB
exports.getAllCompanys = function(req, res) {  
    Company.find(function(err, companys) {
        if(err) 
            res.send(500, err.message);

        console.log('GET /companys')
        res.status(200).jsonp(companys);
    });
};

//GET - Return a company with specified ID
exports.getById = function(req, res) {  
    Company.findById(req.params.id, function(err, company) {
        if(err) 
            return res.send(500, err.message);

        console.log('GET /tvshow/' + req.params.id);
        res.status(200).jsonp(company);
    });
};

//POST - Insert a new companys in the DB
exports.addCompany = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var newCompany = new Company({
        name:    req.body.name,
        creationDate:     req.body.creationDate
    });

    newCompany.save(function(err, company) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(company);
    });
};

//PUT - Update a register already exists
exports.updateCompany = function(req, res) {  
    Company.findById(req.params.id, function(err, company) {
        company.name   = req.body.name;
        company.creationDate    = req.body.creationDate;

        company.save(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).jsonp(company);
        });
    });
};

//DELETE - Delete a company with specified ID
exports.deleteCompany = function(req, res) {  
    Company.findById(req.params.id, function(err, company) {
        company.remove(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};