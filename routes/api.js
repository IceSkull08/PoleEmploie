var express = require('express');
const userModel = require('../model/user');
const posteModel = require('../model/poste');
var router = express.Router();

router.get('/users', function(req, res, next){
    userModel.readall(function(err, result){
        if (err) {
            console.log("debug : error in /users route");
            return res.status(500).json({ error: 'Internal Server Error' });
        }   
        res.status(200).json(result);
    });
});

router.get('/offres', function(req, res, next){
    posteModel.readAll(function(err, results){
        if(err){
            console.log("debug : error in /offres route");
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;