const jwt =require('jsonwebtoken');
const sha256 = require('js-sha256');
const { request } = require("express");

function generateJWTToken(data) {
    return jwt.sign(data, "vMJ1v1EoP4ohJEfLL75hpdX9K0TpSZJNy6Fh707c", { expiresIn: '5m' });
}
function verifyJWTToken(jwtToken) {
    let decoded = null
    try {
        decoded = jwt.verify(jwtToken, "vMJ1v1EoP4ohJEfLL75hpdX9K0TpSZJNy6Fh707c");
        return decoded;
    } catch(err) {
        return decoded
    }   
};

function processJWT(req) {
    let error=null
    //// Begin JWT Validation
    if(!req.headers['authorization']){
        return error = "Missing Authorization Header";
    }else{
        token = req.headers['authorization'].replace('Bearer ', '');
        verified = verifyJWTToken(token);
        if(!verified) {
            return error = "Invalid Token";
        }
        if (verified['user'] != req.body.sessionUser){
            return error = "Invalid User-Token Combo";
        }
        return error;
    }
    //// END JWT Validation
};

module.exports = {
    generateJWTToken,
    verifyJWTToken,
    processJWT
}