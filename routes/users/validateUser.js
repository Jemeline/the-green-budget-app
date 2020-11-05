const db = require("../../database.js");
const sha256 = require('js-sha256');
const { request } = require("express");
const utils = require("../../utils/auth");



module.exports = (req, res, next) => {
    let errors = [];
    let verified;
    if (!req.body.email){
        errors.push("You must supply an email.");
    }
    if (!req.body.password){
        errors.push("You must supply a password.");
    }
    // Begin JWT Validation
    if (!req.body.sessionUser){
        errors.push("You must supply a sessionUser");
    }
    if(!req.headers['authorization']){
        errors.push("Missing authorization header.");
    } else{
        token = req.headers['authorization'].replace('Bearer ', '');
        verified = utils.verifyJWTToken(token);
        if(!verified) {
            errors.push("Invalid Token");
        }
        else if (verified['user'] != req.body.sessionUser){
            errors.push("Invalid User-Token Combo");
        } else {
        }
    }
    // END JWT Validation

    if (errors.length > 0){
        res.status(400).json({"errors":errors});
        return;
    }

    let sql = "select * from users_table where email=?"
    let params = [req.body.email]
    db.all(sql, params, (err, rows) => {
        // console.log(rows[0]['password']);
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (rows.length == 0){
            res.status(400).json({"error":"User Does Not Exist"});
            return;
        }
        if (sha256(req.body.password.toString())!=rows[0]['password']){
            res.status(400).json({"error":"Invalid Password"});
            return;
        }
        // const token = utils.generateJWTToken(req.body.email);
        delete rows[0]['password'];
        res.json({
            "message":"success",
            "data":rows[0]
        })
      });      
};