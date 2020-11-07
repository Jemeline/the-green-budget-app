const db = require("../../database.js");
const sha256 = require('js-sha256');
const { request } = require("express");
const utils = require("../../utils/auth");
const jwt =require('jsonwebtoken');

module.exports = (req, res, next) => {
    let errors = [];
    if (!req.body.email){
        errors.push("You must supply your email.");
    }
    if (!req.body.password){
        errors.push("You must supply a password.");
    }
    if (req.body.password.length<8){
        errors.push("You must be at least 8 characters.");
    }
    if (!req.body.firstname){
        errors.push("You must supply your first name.");
    }
    if (!req.body.lastname){
        errors.push("You must supply your last name.");
    }
    // // Begin JWT Validation
    if (!req.body.sessionUser){
        errors.push("You must supply a sessionUser");
    }
    if(!req.headers['authorization']){
        errors.push("Missing authorization header.");
    } else{
        token = req.headers['authorization'].replace('Bearer ', '');
        verified = utils.verifyJWTToken(token)
        if(!verified) {
            errors.push("Invalid Token");
        }
        if (verified['user'] != req.body.sessionUser){
            errors.push("Invalid User-Token Combo");
        }
    }
    // // END JWT Validation
    if (errors.length > 0){
        res.status(400).json({"errors":errors});
        console.log(errors);
        return;
    }
    const request_data = {  email:req.body.email,
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            isAdmin:0
                            };
    // const token = utils.generateJWTToken(req.body.email);
    db.run(`INSERT INTO users_table (email, password, firstname, lastname, isAdmin) VALUES (?,?,?,?,?)`, [req.body.email,sha256((req.body.password).toString()),req.body.firstname,req.body.lastname, 0], function(err) {
    if (err) {
        res.status(400).json({"error":err.message});
        console.log(err);
        return;
    }
    res.json({
        "message": "success",
        "data": request_data,
        "id" : this.lastID
    })
    });    
};