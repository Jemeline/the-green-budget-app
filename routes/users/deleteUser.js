const db = require("../../database.js");
const sha256 = require('js-sha256');
const { request } = require("express");


module.exports = (req, res, next) => {
    let errors = [];
    if (!req.body.email){
        errors.push("You must supply the email of the account you wish to delete.");
    }
    if (req.body.email == "admin@email.com"){
        errors.push("You cannot delete the Admin account.");
    }
    // // Begin JWT Validation
    // if (!req.body.sessionUser){
    //     errors.push("You must supply a sessionUser");
    // }
    // if(!req.headers['authorization']){
    //     errors.push("Missing authorization header.");
    // } else{
    //     token = req.headers['authorization'].replace('Bearer ', '');
    //     verified = utils.verifyJWTToken(token)
    //     if(!verified) {
    //         errors.push("Invalid Token");
    //     }
    //     if (verified['user'] != req.body.email){
    //         errors.push("Invalid User-Token Combo");
    //     }
    // }
    // // END JWT Validation
    if (errors.length > 0){
        res.status(400).json({"errors":errors});
        return;
    }
    const request_data = {email:req.body.email};
    db.run(`DELETE FROM users_table WHERE email = ?`, [req.body.email], function(err) {
    if (err) {
        res.status(400).json({"error":err.message});
        return;
    }
    res.json({
        "message": "success",
        "data": request_data,
    })
    });    
       
};