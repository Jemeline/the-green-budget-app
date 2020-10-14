const { request } = require("express");
const utils = require("../utils/auth");

module.exports = (req, res, next) => {
    let errors = [];
    if (!req.body.user){
        errors.push("No user supplied");
    }
    if (errors.length > 0){
        res.status(400).json({"errors":errors});
        return;
    }
    const user = {"user":req.body.user};
    const token = utils.generateJWTToken(user);
    res.json({
        "message": "success",
        "token": token
    });    
};